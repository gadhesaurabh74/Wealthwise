export const expenseCategories = ['Food', 'Housing', 'Transport', 'Health', 'Shopping', 'Entertainment', 'Education', 'Utilities', 'Subscriptions', 'Travel', 'Personal Care', 'Other'];

const categoryRules = [
  [/swiggy|zomato|restaurant|cafe|food|domino|pizza/i, 'Food'],
  [/rent|housing|airbnb/i, 'Housing'],
  [/uber|ola|metro|petrol|fuel|rapido/i, 'Transport'],
  [/pharmacy|hospital|clinic|health/i, 'Health'],
  [/amazon|flipkart|myntra|shopping/i, 'Shopping'],
  [/netflix|spotify|movie|bookmyshow/i, 'Entertainment'],
  [/udemy|course|school|education/i, 'Education'],
  [/electricity|water|internet|mobile|utility/i, 'Utilities'],
  [/subscription|prime|hotstar|membership/i, 'Subscriptions'],
  [/hotel|flight|travel|makemytrip|airline/i, 'Travel'],
  [/salon|spa|barber/i, 'Personal Care'],
];

export function categorizeMerchant(merchant = '', description = '') { const text = `${merchant} ${description}`; return categoryRules.find(([pattern]) => pattern.test(text))?.[1] || 'Other'; }
