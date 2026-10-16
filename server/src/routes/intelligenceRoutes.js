import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import ScheduledExpense from '../models/ScheduledExpense.js';
import { requireAuth } from '../middleware/auth.js';
import { calculateForecast, calculateSafeToSpend } from '../services/forecastService.js';

const router = Router(); router.use(requireAuth);
router.get('/analytics/forecast', async (req, res, next) => { try { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth(), 1); const end = new Date(now.getFullYear(), now.getMonth() + 1, 1); const [expenses, budget] = await Promise.all([Transaction.find({ userId: req.user.id, type: 'expense', date: { $gte: start, $lt: end } }).lean(), Budget.findOne({ userId: req.user.id, month: now.getMonth() + 1, year: now.getFullYear() }).lean()]); return res.json(calculateForecast({ expenses, elapsedDays: Math.max(1, now.getDate()), daysInMonth: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(), budgetLimit: budget?.monthlyLimit ?? null })); } catch (error) { return next(error); } });
router.post('/analytics/safe-to-spend', async (req, res, next) => { try { const availableBalance = Number(req.body.availableBalance); if (!Number.isFinite(availableBalance) || availableBalance < 0) return res.status(400).json({ error: 'A non-negative available balance is required.' }); const bills = await ScheduledExpense.find({ userId: req.user.id, active: true }).lean(); const reservedBills = bills.reduce((sum, bill) => sum + bill.expectedAmount, 0); const daysUntilPayday = Math.max(1, Number(req.body.daysUntilPayday) || 1); return res.json(calculateSafeToSpend({ availableBalance, reservedBills, savingsCommitment: Number(req.body.savingsCommitment) || 0, daysUntilPayday })); } catch (error) { return next(error); } });
export default router;
