import ScheduledExpense from '../models/ScheduledExpense.js';
import Transaction from '../models/Transaction.js';

const nextDate = (date, frequency) => {
  const result = new Date(date);
  if (frequency === 'weekly') result.setDate(result.getDate() + 7);
  if (frequency === 'monthly') result.setMonth(result.getMonth() + 1);
  if (frequency === 'quarterly') result.setMonth(result.getMonth() + 3);
  if (frequency === 'yearly') result.setFullYear(result.getFullYear() + 1);
  return result;
};

export async function processDueScheduledExpenses(now = new Date()) {
  const due = await ScheduledExpense.find({ active: true, nextDueDate: { $lte: now } }).lean();
  let processed = 0;
  for (const expense of due) {
    let dueDate = new Date(expense.nextDueDate);
    while (dueDate <= now) {
      const externalTransactionId = `scheduled:${expense._id}:${dueDate.toISOString().slice(0, 10)}`;
      await Transaction.updateOne(
        { userId: expense.userId, externalTransactionId },
        { $setOnInsert: { userId: expense.userId, type: 'expense', amount: expense.expectedAmount, currency: 'INR', category: expense.category, merchant: expense.name, date: dueDate, source: 'scheduled', externalTransactionId } },
        { upsert: true },
      );
      processed += 1;
      if (expense.frequency === 'once') break;
      dueDate = nextDate(dueDate, expense.frequency);
    }
    await ScheduledExpense.updateOne({ _id: expense._id }, expense.frequency === 'once' ? { active: false, lastProcessedAt: now } : { nextDueDate: dueDate, lastProcessedAt: now });
  }
  return processed;
}
