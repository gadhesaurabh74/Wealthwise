import { Router } from 'express';
import BankTransaction from '../models/BankTransaction.js';
import Transaction from '../models/Transaction.js';
import { requireAuth } from '../middleware/auth.js';
import { categorizeMerchant } from '../services/categoryService.js';

const router = Router(); router.use(requireAuth);
const demoRows = [
  { externalId: 'demo-swiggy-001', amount: 349, merchant: 'Swiggy', date: new Date(), description: 'Food delivery' },
  { externalId: 'demo-uber-001', amount: 220, merchant: 'Uber', date: new Date(), description: 'Cab ride' },
  { externalId: 'demo-netflix-001', amount: 649, merchant: 'Netflix', date: new Date(), description: 'Monthly subscription' },
  { externalId: 'demo-amazon-001', amount: 1299, merchant: 'Amazon', date: new Date(), description: 'Online purchase' },
];

router.get('/bank/details', async (_req, res, next) => { try { await BankTransaction.bulkWrite(demoRows.map((row) => ({ updateOne: { filter: { externalId: row.externalId }, update: { $setOnInsert: { ...row, currency: 'INR', isSynthetic: true } }, upsert: true } }))); return res.json({ source: 'synthetic-demo-bank', items: await BankTransaction.find({ isSynthetic: true }).sort({ date: -1 }).lean() }); } catch (error) { return next(error); } });
router.post('/bank/import', async (req, res, next) => { try { const rows = await BankTransaction.find({ isSynthetic: true }).lean(); const existing = await Transaction.find({ userId: req.user.id, source: 'bank' }).select('externalTransactionId').lean(); const importedIds = new Set(existing.map((item) => item.externalTransactionId)); const newRows = rows.filter((row) => !importedIds.has(row.externalId)).map((row) => ({ userId: req.user.id, type: row.type, amount: row.amount, currency: row.currency, category: categorizeMerchant(row.merchant, row.description), merchant: row.merchant, description: `${row.description} (synthetic bank demo)`, date: row.date, source: 'bank', externalTransactionId: row.externalId })); if (newRows.length) await Transaction.insertMany(newRows); return res.json({ importedCount: newRows.length, skippedCount: rows.length - newRows.length, items: newRows }); } catch (error) { return next(error); } });
export default router;
