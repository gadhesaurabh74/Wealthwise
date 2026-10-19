import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import Transaction from '../src/models/Transaction.js';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spendsense';
const demoRows = [
  [-90, 'income', 85000, 'Salary', 'Employer', 'Monthly salary'], [-83, 'expense', 2200, 'Housing', 'Rent', 'Monthly rent'], [-78, 'expense', 650, 'Food', 'Swiggy', 'Food delivery'], [-72, 'expense', 1800, 'Utilities', 'Electricity', 'Electricity bill'],
  [-60, 'income', 85000, 'Salary', 'Employer', 'Monthly salary'], [-54, 'expense', 2200, 'Housing', 'Rent', 'Monthly rent'], [-49, 'expense', 1250, 'Shopping', 'Amazon', 'Household purchase'], [-43, 'expense', 480, 'Transport', 'Uber', 'Cab ride'],
  [-30, 'income', 85000, 'Salary', 'Employer', 'Monthly salary'], [-25, 'expense', 2200, 'Housing', 'Rent', 'Monthly rent'], [-21, 'expense', 750, 'Food', 'Zomato', 'Food delivery'], [-17, 'expense', 649, 'Subscriptions', 'Netflix', 'Monthly subscription'], [-12, 'expense', 3000, 'Travel', 'Flight booking', 'Weekend trip'], [-8, 'expense', 900, 'Health', 'Pharmacy', 'Medicine'], [-3, 'expense', 350, 'Food', 'Cafe', 'Coffee and snacks'],
];

const run = async () => {
  await mongoose.connect(uri);
  let user = await User.findOne({ name: /^saurabh gadhe$/i });
  if (!user) {
    user = await User.create({ name: 'saurabh gadhe', email: 'saurabh.gadhe.demo@example.com', passwordHash: await bcrypt.hash('DemoPass123!', 12), currency: 'INR', timezone: 'Asia/Calcutta' });
    console.log(`Created demo user: ${user.email} (password: DemoPass123!)`);
  }
  const rows = demoRows.map(([daysAgo, type, amount, category, merchant, description]) => { const date = new Date(); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() + daysAgo); return { userId: user._id, type, amount, currency: 'INR', category, merchant, description, date, source: 'manual', externalTransactionId: `demo:saurabh-gadhe:${date.toISOString().slice(0, 10)}:${merchant}` }; });
  const result = await Transaction.bulkWrite(rows.map((row) => ({ updateOne: { filter: { userId: row.userId, externalTransactionId: row.externalTransactionId }, update: { $setOnInsert: row }, upsert: true } })));
  console.log(`Demo data ready for ${user.name}: ${result.upsertedCount} new transactions added, ${rows.length - result.upsertedCount} already existed.`);
  await mongoose.disconnect();
};
run().catch(async (error) => { console.error('Demo seed failed:', error.message); await mongoose.disconnect(); process.exit(1); });
