import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { getEntitlements } from '../services/entitlementService.js';

const router = Router(); router.use(requireAuth);
router.get('/subscription', (req, res) => res.json({ plan: req.user.subscriptionPlan, status: 'active', entitlements: getEntitlements(req.user.subscriptionPlan) }));
router.post('/subscription/request-upgrade', (_req, res) => res.status(501).json({ error: 'Payments are not configured. No upgrade was processed.' }));
router.patch('/subscription/local-plan', async (req, res, next) => { try { if (process.env.NODE_ENV === 'production' || !['free', 'plus'].includes(req.body.plan)) return res.status(403).json({ error: 'Plan changes are unavailable.' }); const user = await User.findByIdAndUpdate(req.user.id, { subscriptionPlan: req.body.plan }, { new: true }); return res.json({ plan: user.subscriptionPlan, entitlements: getEntitlements(user.subscriptionPlan) }); } catch (error) { return next(error); } });
export default router;
