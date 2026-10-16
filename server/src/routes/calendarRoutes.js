import { Router } from 'express';
import ScheduledExpense from '../models/ScheduledExpense.js';
import Transaction from '../models/Transaction.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router(); router.use(requireAuth);
const validDate = (value) => !Number.isNaN(new Date(value).getTime());

router.get('/calendar', async (req, res, next) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear(); const month = Number(req.query.month) || new Date().getMonth() + 1;
    const start = new Date(year, month - 1, 1); const end = new Date(year, month, 1);
    const [transactions, scheduled] = await Promise.all([
      Transaction.find({ userId: req.user.id, date: { $gte: start, $lt: end } }).sort({ date: 1 }).lean(),
      ScheduledExpense.find({ userId: req.user.id, active: true, nextDueDate: { $lt: end } }).sort({ nextDueDate: 1 }).lean(),
    ]);
    return res.json({ year, month, transactions, scheduled });
  } catch (error) { return next(error); }
});

router.get('/scheduled-expenses', async (req, res, next) => { try { return res.json({ items: await ScheduledExpense.find({ userId: req.user.id, active: true }).sort({ nextDueDate: 1 }).lean() }); } catch (error) { return next(error); } });
router.post('/scheduled-expenses', async (req, res, next) => { try { const { name, category, expectedAmount, frequency, nextDueDate } = req.body; if (!name || !category || !Number.isFinite(Number(expectedAmount)) || Number(expectedAmount) <= 0 || !validDate(nextDueDate)) return res.status(400).json({ error: 'Invalid scheduled expense details.' }); const item = await ScheduledExpense.create({ userId: req.user.id, name, category, expectedAmount, frequency, nextDueDate }); return res.status(201).json({ item }); } catch (error) { return next(error); } });
router.delete('/scheduled-expenses/:id', async (req, res, next) => { try { const item = await ScheduledExpense.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { active: false }, { new: true }); if (!item) return res.status(404).json({ error: 'Scheduled expense not found.' }); return res.json({ item }); } catch (error) { return next(error); } });

export default router;
