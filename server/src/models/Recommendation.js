import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, ruleId: { type: String, required: true }, title: String, explanation: String, priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }, status: { type: String, enum: ['new', 'completed', 'dismissed'], default: 'new' }, estimatedImpact: Number, periodKey: String }, { timestamps: true });
recommendationSchema.index({ userId: 1, ruleId: 1, periodKey: 1 }, { unique: true });
export default mongoose.model('Recommendation', recommendationSchema);
