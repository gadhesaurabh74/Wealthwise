import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, category: { type: String, required: true, trim: true },
  monthlyLimit: { type: Number, required: true, min: 1 }, month: { type: Number, min: 1, max: 12, required: true }, year: { type: Number, min: 2000, required: true }, rolloverEnabled: { type: Boolean, default: false },
}, { timestamps: true });
budgetSchema.index({ userId: 1, category: 1, month: 1, year: 1 }, { unique: true });
export default mongoose.model('Budget', budgetSchema);
