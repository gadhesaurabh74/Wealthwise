import mongoose from 'mongoose';

const savingsGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, name: { type: String, required: true, trim: true, maxlength: 80 }, description: { type: String, maxlength: 500 },
  targetAmount: { type: Number, required: true, min: 1 }, currentAmount: { type: Number, default: 0, min: 0 }, targetDate: Date, status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
}, { timestamps: true });
export default mongoose.model('SavingsGoal', savingsGoalSchema);
