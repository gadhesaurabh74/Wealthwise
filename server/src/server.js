import 'dotenv/config';
import { app } from './app.js';
import mongoose from 'mongoose';
import { processDueScheduledExpenses } from './services/scheduledExpenseService.js';

const port = Number(process.env.PORT || 4000);
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be set in server/.env before starting the API.');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spendsense')
  .then(async () => { await processDueScheduledExpenses(); setInterval(() => processDueScheduledExpenses().catch((error) => console.error('Scheduled expense processing failed:', error.message)), 60 * 60 * 1000); app.listen(port, () => console.log(`SpendSense API listening on port ${port}`)); })
  .catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
