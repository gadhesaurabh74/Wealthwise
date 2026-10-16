import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router(); router.use(requireAuth);
router.get('/reports/monthly', async (req, res, next) => { try { const year = Number(req.query.year) || new Date().getFullYear(); const month = Number(req.query.month) || new Date().getMonth() + 1; const transactions = await Transaction.find({ userId: req.user.id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } }).lean(); const report = transactions.reduce((result, item) => { result[item.type] += item.amount; if (item.type === 'expense') result.categories[item.category] = (result.categories[item.category] || 0) + item.amount; return result; }, { income: 0, expense: 0, categories: {} }); return res.json({ year, month, ...report, net: report.income - report.expense }); } catch (error) { return next(error); } });
export default router;
