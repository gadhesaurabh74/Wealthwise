import mongoose from 'mongoose';
const importBatchSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, filename: String, status: { type: String, enum: ['previewed', 'imported'], default: 'previewed' }, rowCount: Number, acceptedCount: Number, rejectedCount: Number, duplicateCount: Number }, { timestamps: true });
export default mongoose.model('ImportBatch', importBatchSchema);
