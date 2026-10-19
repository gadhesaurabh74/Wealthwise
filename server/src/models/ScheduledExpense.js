import mongoose from 'mongoose';

const scheduledExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  category: { type: String, required: true, trim: true, maxlength: 50 },
  expectedAmount: { type: Number, required: true, min: 1 },
  frequency: { type: String, enum: ['once', 'weekly', 'monthly', 'quarterly', 'yearly'], default: 'once' },
  nextDueDate: { type: Date, required: true, index: true },
  active: { type: Boolean, default: true },
  lastProcessedAt: { type: Date },
}, { timestamps: true });

scheduledExpenseSchema.index({ userId: 1, nextDueDate: 1 });
export default mongoose.model('ScheduledExpense', scheduledExpenseSchema);
