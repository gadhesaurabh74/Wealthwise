import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import { requireAuth } from '../middleware/auth.js';
import { detectMoneyLeaks, simulatePurchase } from '../services/insightService.js';

const router = Router(); router.use(requireAuth);
router.get('/insights/money-leaks', async (req, res, next) => { try { const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 }).lean(); return res.json({ items: detectMoneyLeaks(transactions) }); } catch (error) { return next(error); } });
router.post('/purchases/simulate', async (req, res, next) => { try { const amount = Number(req.body.purchaseAmount); if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ error: 'A positive purchase amount is required.' }); const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth(), 1); const [transactions, budget] = await Promise.all([Transaction.find({ userId: req.user.id, type: 'expense', date: { $gte: start } }).lean(), Budget.findOne({ userId: req.user.id, month: now.getMonth() + 1, year: now.getFullYear() }).lean()]); return res.json(simulatePurchase({ purchaseAmount: amount, currentSpend: transactions.reduce((sum, item) => sum + item.amount, 0), budgetLimit: budget?.monthlyLimit ?? null })); } catch (error) { return next(error); } });
export default router;
