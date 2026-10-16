import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true, min: 1 }, currency: { type: String, default: 'USD', maxlength: 3 },
  category: { type: String, required: true, trim: true, maxlength: 50 }, merchant: { type: String, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 500 }, date: { type: Date, required: true }, paymentMethod: { type: String, maxlength: 40 },
  source: { type: String, enum: ['manual', 'csv'], default: 'manual' }, tags: [{ type: String, maxlength: 30 }],
}, { timestamps: true });
transactionSchema.index({ userId: 1, date: -1 });
export default mongoose.model('Transaction', transactionSchema);
