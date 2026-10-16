import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router(); router.use(requireAuth);
const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
router.get('/transactions/export', async (req, res, next) => { try { const items = await Transaction.find({ userId: req.user.id }).sort({ date: -1 }).lean(); const header = 'type,amount,currency,category,merchant,description,date'; const rows = items.map((item) => [item.type, item.amount, item.currency, item.category, item.merchant, item.description, new Date(item.date).toISOString()].map(csvCell).join(',')); res.setHeader('Content-Type', 'text/csv; charset=utf-8'); res.setHeader('Content-Disposition', 'attachment; filename="spendsense-transactions.csv"'); return res.send([header, ...rows].join('\n')); } catch (error) { return next(error); } });
export default router;
