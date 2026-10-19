import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import { requireAuth } from '../middleware/auth.js';
import { expenseCategories } from '../services/categoryService.js';

const router = Router();
router.use(requireAuth);
const defaultCategories = ['Housing', 'Food', 'Transport', 'Health', 'Shopping', 'Entertainment', 'Education', 'Utilities', 'Other'];

router.get('/categories', (_req, res) => res.json({ items: expenseCategories }));

router.get('/analytics/overview', async (req, res, next) => {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const transactions = await Transaction.find({ userId: req.user.id, date: { $gte: start, $lt: end } }).lean();
    const budgets = await Budget.find({ userId: req.user.id, month: now.getMonth() + 1, year: now.getFullYear() }).lean();
    const totals = transactions.reduce((result, item) => { result[item.type] += item.amount; if (item.type === 'expense') result.byCategory[item.category] = (result.byCategory[item.category] || 0) + item.amount; return result; }, { income: 0, expense: 0, byCategory: {} });
    const budgetTotal = budgets.reduce((sum, budget) => sum + budget.monthlyLimit, 0);
    return res.json({ period: { month: now.getMonth() + 1, year: now.getFullYear() }, totals: { income: totals.income, expense: totals.expense, net: totals.income - totals.expense }, byCategory: Object.entries(totals.byCategory).map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount), budget: { limit: budgetTotal, remaining: budgetTotal ? budgetTotal - totals.expense : null }, transactionCount: transactions.length });
  } catch (error) { return next(error); }
});

router.get('/analytics/trend', async (req, res, next) => {
  try {
    const range = ['month', 'week', 'day'].includes(req.query.range) ? req.query.range : 'month';
    const now = new Date(); const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); const bucketCount = range === 'month' ? 6 : range === 'week' ? Math.ceil(daysInCurrentMonth / 7) : 7;
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
    const start = range === 'month' ? new Date(now.getFullYear(), now.getMonth() - 5, 1) : range === 'week' ? new Date(now.getFullYear(), now.getMonth(), 1) : weekStart;
    const transactions = await Transaction.find({ userId: req.user.id, date: { $gte: start, $lte: now } }).lean();
    const buckets = Array.from({ length: bucketCount }, (_, index) => ({ label: range === 'month' ? new Date(now.getFullYear(), now.getMonth() - (bucketCount - 1 - index), 1).toLocaleString('en-US', { month: 'short' }) : range === 'week' ? `Week ${index + 1}` : new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + index).toLocaleString('en-US', { weekday: 'short' }), income: 0, expenses: 0 }));
    for (const item of transactions) { const date = new Date(item.date); const index = range === 'month' ? (date.getFullYear() - now.getFullYear()) * 12 + date.getMonth() - now.getMonth() + bucketCount - 1 : range === 'week' ? Math.floor((date.getDate() - 1) / 7) : Math.floor((new Date(date.getFullYear(), date.getMonth(), date.getDate()) - weekStart) / 86400000); if (buckets[index]) buckets[index][item.type === 'income' ? 'income' : 'expenses'] += item.amount; }
    return res.json({ range, items: buckets });
  } catch (error) { return next(error); }
});

router.get('/analytics/category-breakdown', async (req, res, next) => { try { const range = ['month', 'week', 'day'].includes(req.query.range) ? req.query.range : 'month'; const now = new Date(); const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7)); const start = range === 'month' ? new Date(now.getFullYear(), now.getMonth(), 1) : range === 'week' ? weekStart : new Date(now.getFullYear(), now.getMonth(), now.getDate()); const transactions = await Transaction.find({ userId: req.user.id, type: 'expense', date: { $gte: start, $lte: now } }).lean(); const totals = {}; for (const item of transactions) totals[item.category] = (totals[item.category] || 0) + item.amount; return res.json({ range, items: Object.entries(totals).map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount) }); } catch (error) { return next(error); } });

export default router;
