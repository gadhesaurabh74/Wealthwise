import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  currency: { type: String, default: 'USD', maxlength: 3 },
  timezone: { type: String, default: 'UTC' },
  subscriptionPlan: { type: String, enum: ['free', 'plus'], default: 'free' },
  resetChallenge: { type: mongoose.Schema.Types.Mixed, select: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
