import mongoose from 'mongoose';

const bankTransactionSchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true },
  type: { type: String, enum: ['income', 'expense'], default: 'expense' },
  amount: { type: Number, required: true, min: 0.01 },
  currency: { type: String, default: 'INR' },
  merchant: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  isSynthetic: { type: Boolean, default: true },
}, { timestamps: true, collection: 'bank' });

export default mongoose.model('BankTransaction', bankTransactionSchema);
