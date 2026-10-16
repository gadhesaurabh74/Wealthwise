export function detectMoneyLeaks(transactions) {
  const byMerchant = new Map();
  for (const transaction of transactions.filter((item) => item.type === 'expense')) { const key = (transaction.merchant || transaction.category || 'unknown').trim().toLowerCase(); const group = byMerchant.get(key) || []; group.push(transaction); byMerchant.set(key, group); }
  return [...byMerchant.entries()].filter(([, items]) => items.length >= 3).map(([merchant, items]) => ({ type: 'repeated-spend', merchant, occurrences: items.length, estimatedImpact: items.reduce((sum, item) => sum + item.amount, 0), explanation: `${items.length} expenses were recorded for ${merchant}. Review whether this pattern is intentional.` })).sort((a, b) => b.estimatedImpact - a.estimatedImpact).slice(0, 20);
}

export function simulatePurchase({ purchaseAmount, currentSpend, budgetLimit = null, remainingGoalAmount = null }) { const projectedSpend = currentSpend + purchaseAmount; return { purchaseAmount, projectedSpend, budgetRemaining: budgetLimit === null ? null : budgetLimit - projectedSpend, goalImpact: remainingGoalAmount === null ? null : Math.min(purchaseAmount, remainingGoalAmount), explanation: 'This scenario changes recorded spending only for the estimate. It does not create a transaction.' }; }
