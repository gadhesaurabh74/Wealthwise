import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = Router();
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};
const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  currency: user.currency,
  timezone: user.timezone,
  subscriptionPlan: user.subscriptionPlan,
});
const validEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const issueSession = (res, user) =>
  res.cookie(
    "spendsense_session",
    jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" }),
    cookieOptions,
  );
const otpHash = (otp) => crypto.createHash("sha256").update(otp).digest("hex");
const mailer = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      !validEmail(email) ||
      typeof password !== "string" ||
      password.length < 8
    )
      return res
        .status(400)
        .json({
          error:
            "Enter a valid name, email, and password of at least 8 characters.",
        });
    if (await User.exists({ email: email.toLowerCase() }))
      return res
        .status(409)
        .json({ error: "An account with that email already exists." });
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash: await bcrypt.hash(password, 12),
    });
    issueSession(res, user);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email =
      typeof req.body.email === "string" ? req.body.email.toLowerCase() : "";
    const user = await User.findOne({ email }).select("+passwordHash");
    if (
      !user ||
      !(await bcrypt.compare(req.body.password || "", user.passwordHash))
    )
      return res.status(401).json({ error: "Invalid email or password." });
    issueSession(res, user);
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", (_req, res) =>
  res.clearCookie("spendsense_session", cookieOptions).json({ success: true }),
);
router.get("/me", requireAuth, (req, res) =>
  res.json({ user: publicUser(req.user) }),
);
router.patch('/profile', requireAuth, async (req, res, next) => {
  try {
    const updates = {};
    if (typeof req.body.name === 'string' && req.body.name.trim().length >= 2) updates.name = req.body.name.trim();
    if (typeof req.body.currency === 'string' && /^[A-Z]{3}$/.test(req.body.currency)) updates.currency = req.body.currency;
    if (typeof req.body.timezone === 'string' && req.body.timezone.length <= 80) updates.timezone = req.body.timezone;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
    return res.json({ user: publicUser(user) });
  } catch (error) { return next(error); }
});
router.post("/change-password", requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+passwordHash");
    if (
      !newPassword ||
      newPassword.length < 8 ||
      !(await bcrypt.compare(currentPassword || "", user.passwordHash))
    )
      return res
        .status(400)
        .json({ error: "Current password or new password is invalid." });
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    if (!mailer || !process.env.EMAIL_FROM) return res.status(503).json({ error: "Password reset email delivery is currently unavailable." });
    const email =
      typeof req.body.email === "string" ? req.body.email.toLowerCase() : "";
    const user = await User.findOne({ email }).select("+resetChallenge");
    if (user && mailer && process.env.EMAIL_FROM) {
      const otp = crypto.randomInt(100000, 1000000).toString();
      user.resetChallenge = {
        hash: otpHash(otp),
        expiresAt: new Date(Date.now() + 300000),
        attempts: 0,
      };
      await user.save();
      await mailer.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Your SpendSense password reset code",
        text: `Your one-time code is ${otp}. It expires in five minutes.`,
        html: `<div style="font-family:Arial,sans-serif;max-width:520px;color:#102033"><h2>Reset your SpendSense password</h2><p>Use this one-time verification code to continue:</p><p style="font-size:30px;font-weight:700;letter-spacing:8px;color:#059669">${otp}</p><p>This code expires in five minutes. If you did not request this, you can ignore this email.</p></div>`,
      });
    }
    return res.json({
      message:
        "If an account exists and email delivery is configured, reset instructions will be sent.",
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/verify-reset-otp", async (req, res) => {
  const email =
    typeof req.body.email === "string" ? req.body.email.toLowerCase() : "";
  const user = await User.findOne({ email }).select("+resetChallenge");
  const challenge = user?.resetChallenge;
  if (!challenge || challenge.expiresAt < new Date() || challenge.attempts >= 5)
    return res.status(400).json({ error: "Invalid or expired reset code." });
  if (
    typeof req.body.otp !== "string" ||
    !crypto.timingSafeEqual(
      Buffer.from(otpHash(req.body.otp)),
      Buffer.from(challenge.hash),
    )
  ) {
    challenge.attempts += 1;
    await user.save();
    return res.status(400).json({ error: "Invalid or expired reset code." });
  }
  return res.json({ verified: true });
});

router.post("/reset-password", async (req, res) => {
  const email =
    typeof req.body.email === "string" ? req.body.email.toLowerCase() : "";
  const user = await User.findOne({ email }).select(
    "+passwordHash +resetChallenge",
  );
  const challenge = user?.resetChallenge;
  if (
    !user ||
    !challenge ||
    challenge.expiresAt < new Date() ||
    challenge.attempts >= 5 ||
    typeof req.body.password !== "string" ||
    req.body.password.length < 8 ||
    typeof req.body.otp !== "string" ||
    !crypto.timingSafeEqual(
      Buffer.from(otpHash(req.body.otp)),
      Buffer.from(challenge.hash),
    )
  )
    return res
      .status(400)
      .json({ error: "Unable to reset password with those details." });
  user.passwordHash = await bcrypt.hash(req.body.password, 12);
  user.resetChallenge = undefined;
  await user.save();
  return res.json({ success: true });
});

export default router;
