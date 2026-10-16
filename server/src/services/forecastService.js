export function calculateForecast({ expenses, elapsedDays, daysInMonth, budgetLimit = null }) {
  const currentSpend = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
  const dailyPace = elapsedDays > 0 ? currentSpend / elapsedDays : 0;
  const projectedSpend = dailyPace * daysInMonth;
  return { currentSpend, dailyPace, projectedSpend, budgetLimit, projectedOverrun: budgetLimit === null ? null : Math.max(0, projectedSpend - budgetLimit), confidence: expenses.length >= 10 ? 'medium' : 'low' };
}

export function calculateSafeToSpend({ availableBalance, reservedBills = 0, savingsCommitment = 0, daysUntilPayday = 1 }) {
  const remaining = availableBalance - reservedBills - savingsCommitment;
  return { availableBalance, reservedBills, savingsCommitment, remainingSpendable: remaining, dailyAllowance: Math.max(0, remaining) / Math.max(1, daysUntilPayday), safeToday: Math.max(0, remaining) / Math.max(1, daysUntilPayday) };
}
