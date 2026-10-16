const planFeatures = { free: new Set(['basicDashboard', 'transactions', 'budgets', 'calendar', 'goals']), plus: new Set(['basicDashboard', 'transactions', 'budgets', 'calendar', 'goals', 'forecast', 'moneyLeaks', 'purchaseSimulator', 'recommendations', 'advancedReports']) };
export function hasFeature(plan, feature) { return Boolean(planFeatures[plan]?.has(feature)); }
export function getEntitlements(plan = 'free') { return { plan, features: [...(planFeatures[plan] || planFeatures.free)] }; }
