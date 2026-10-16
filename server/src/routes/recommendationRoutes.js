import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import Recommendation from '../models/Recommendation.js';
import { requireAuth } from '../middleware/auth.js';
import { buildRecommendations } from '../services/recommendationService.js';

const router = Router(); router.use(requireAuth);
router.get('/recommendations', async (req, res, next) => { try { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth(), 1); const [transactions, budgets] = await Promise.all([Transaction.find({ userId: req.user.id, date: { $gte: start } }).lean(), Budget.find({ userId: req.user.id, month: now.getMonth() + 1, year: now.getFullYear() }).lean()]); const totals = transactions.reduce((result, item) => { result[item.type] += item.amount; if (item.type === 'expense') result.byCategory[item.category] = (result.byCategory[item.category] || 0) + item.amount; return result; }, { income: 0, expense: 0, byCategory: {} }); const candidates = buildRecommendations({ totals, budgets }); const periodKey = `${now.getFullYear()}-${now.getMonth() + 1}`; for (const candidate of candidates) await Recommendation.findOneAndUpdate({ userId: req.user.id, ruleId: candidate.ruleId, periodKey }, { ...candidate, userId: req.user.id, periodKey }, { upsert: true, new: true, setDefaultsOnInsert: true }); return res.json({ items: await Recommendation.find({ userId: req.user.id, status: 'new' }).sort({ priority: -1, createdAt: -1 }).lean() }); } catch (error) { return next(error); } });
router.patch('/recommendations/:id', async (req, res, next) => { try { if (!['completed', 'dismissed'].includes(req.body.status)) return res.status(400).json({ error: 'Invalid recommendation status.' }); const item = await Recommendation.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { status: req.body.status }, { new: true }); if (!item) return res.status(404).json({ error: 'Recommendation not found.' }); return res.json({ item }); } catch (error) { return next(error); } });
export default router;
