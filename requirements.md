# MASTER PROMPT — SPENDSENSE
## Build a Premium, Intelligent Personal Finance Management Platform Using MERN

You are Codex, acting as a senior full-stack software engineer, product architect, UI/UX designer, security engineer, and test engineer.

Your task is to build **SpendSense**, a polished, production-minded personal finance management platform using the MERN stack.

Do not create just a basic expense tracker. Build a financial intelligence system that helps users understand their spending, anticipate financial problems, make better purchase decisions, and achieve savings goals.

Follow the instructions carefully. Work incrementally, implement genuine functionality, verify your work, and document progress. Do not attempt to build the entire application in a single unverified pass.

---

# 1. PRODUCT VISION

**Product:** SpendSense

**Tagline:** Understand your money. Control your spending. Reach your goals.

**Primary audience:**
- College students and young adults.
- Young professionals and first-job earners.
- People trying to control unnecessary spending.
- Users who want to build savings and improve financial discipline.

**Core problem:**

Most expense trackers show users where their money went. SpendSense should also help them understand what they can safely spend, what may happen to their finances next, and what they should change.

The application must answer questions such as:

1. How much money can I safely spend today?
2. Am I spending too quickly this month?
3. Will I exceed my budget before the month ends?
4. Which recurring expenses and small purchases are draining my money?
5. Can I afford a particular purchase without harming my goals?
6. What practical action should I take to improve my finances?
7. How are my spending patterns changing over time?

**Product philosophy:** Every major feature should convert financial data into an understandable insight or useful action.

Do not make the interface unnecessarily complicated. Prioritize clarity, trust, explainability, and a premium user experience.

---

# 2. NON-NEGOTIABLE CONSTRAINTS

## 2.1 Technology restrictions

Use the MERN stack:

- MongoDB
- Express.js
- React
- Node.js

Use JavaScript and JSX unless an existing project has a well-established alternative that should be preserved.

Do not introduce TypeScript without a strong reason.

## 2.2 No external AI or financial APIs

Do not use:
- OpenAI APIs or other LLM APIs.
- External AI services.
- Bank account aggregation APIs.
- Third-party financial data APIs.
- External stock market or investment APIs.
- External recommendation engines.
- Paid financial intelligence APIs.

All finance calculations, spending forecasts, recurring payment detection, anomaly detection, and personalized recommendations must be implemented locally using deterministic JavaScript algorithms.

You may use npm packages for implementation, charting, date handling, validation, CSV parsing, testing, and UI components.

Do not pretend that deterministic rules are machine learning.

## 2.3 Email restrictions

Password-reset email delivery is allowed through Nodemailer and SMTP configured using environment variables.

Never hardcode SMTP credentials or expose them to the frontend.

If SMTP is not configured, the reset flow must fail safely with an appropriate generic message. Do not pretend an email was sent.

Do not implement a development OTP bypass, expose OTPs in API responses, or log plaintext OTPs.

## 2.4 Payments and subscriptions

Implement subscription plans and backend entitlement checks, but do not integrate a payment gateway.

Never display a fake payment success or claim that a subscription was purchased.

Development-only plan testing may use clearly documented local seed configuration. It must not create a production bypass.

## 2.5 Engineering integrity

- Inspect the existing workspace before changing files.
- Preserve existing useful work.
- Do not overwrite existing environment files or secrets.
- Do not use destructive commands unnecessarily.
- Do not create buttons that do nothing.
- Do not hardcode financial analytics as if they were calculated.
- Do not claim tests pass unless you ran them.
- Do not leave unfinished core flows disguised as complete features.
- Do not expose private user data or secrets in logs.
- Keep the project runnable after each implementation phase.

---

# 3. REQUIRED TECHNOLOGY STACK

## Frontend

- React with Vite
- React Router
- Tailwind CSS
- Recharts
- Axios
- React Hook Form
- Zod
- date-fns
- Lucide React
- Framer Motion or Motion for subtle animations
- A suitable toast notification library
- Vitest
- React Testing Library

Use a consistent dependency set compatible with the existing project. Verify package versions and setup instead of assuming every package is already installed.

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT-based authentication
- bcrypt or bcryptjs for password hashing
- Nodemailer
- Node.js crypto for secure OTP generation and hashing
- Zod for request validation
- Helmet
- CORS with an explicit allowlist
- Rate limiting
- cookie-parser if using cookie-based authentication
- A maintained CSV parsing library
- Jest or Vitest
- Supertest
- MongoDB Memory Server where practical

Use node-cron only if a real scheduled job is necessary. Prefer on-demand deterministic calculations when they meet the requirement.

## Development tools

Include:
- ESLint
- `.env.example`
- `.gitignore`
- Meaningful npm scripts
- Automated tests
- README documentation
- `PROJECT_PROGRESS.md`

Avoid unnecessary dependencies and duplicated libraries.

---

# 4. VISUAL DESIGN SYSTEM

The application must feel like a premium modern fintech product.

## 4.1 Color palette

Use these design tokens consistently:

- Main background: `#08111F`
- Sidebar: `#0B1627`
- Card background: `#111F32`
- Secondary surface: `#17263A`
- Primary accent: `#10B981`
- Accent hover: `#059669`
- Primary text: `#F8FAFC`
- Secondary text: `#94A3B8`
- Borders: `#26364A`
- Warning: `#F59E0B`
- Error: `#F87171`
- Informational accent: `#60A5FA`

Create reusable design tokens instead of repeating arbitrary colors across components.

## 4.2 Design characteristics

The interface should have:
- A sophisticated dark fintech theme.
- Strong typography hierarchy.
- Generous but efficient spacing.
- Rounded cards with subtle borders.
- Restrained shadows and gradients.
- Clear financial number formatting.
- Consistent icons and button sizes.
- Polished forms and validation messages.
- Responsive desktop, tablet, and mobile layouts.
- Subtle transitions and loading animations.
- Helpful empty states.
- Skeleton loaders for important data views.
- Clear error, success, and confirmation states.
- Accessible color contrast and keyboard navigation.
- Reduced-motion support.

Avoid excessive gradients, excessive glassmorphism, random colors, oversized empty cards, and cluttered dashboards.

Use a consistent layout system and reusable components. Avoid duplicated UI implementations for the same pattern.

## 4.3 Responsive behavior

Desktop:
- Persistent sidebar.
- Main content area with a clear hierarchy.
- Optional compact header with search, date context, and profile actions.

Mobile:
- Collapsible navigation or an appropriate mobile navigation pattern.
- Stacked analytics cards.
- Responsive charts.
- Accessible tables or card-based transaction lists.
- Properly sized buttons and touch targets.
- No horizontal overflow.

## 4.4 Landing page

Create a polished marketing landing page with:

Hero headline: **Your money, under control.**

Supporting message: Understand your spending, anticipate upcoming expenses, and make smarter financial decisions with a personal finance workspace designed around your real habits.

Include:
- Navbar and authentication actions.
- Hero section with primary and secondary CTAs.
- A realistic product preview.
- Feature sections explaining the core USPs.
- How-it-works section.
- Pricing section.
- Privacy and security section.
- FAQ.
- Footer with relevant links.

Public pages:
- `/`
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/pricing`
- `/privacy`
- `/terms`

Do not invent customer testimonials, customer counts, performance statistics, certifications, or financial outcomes.

All claims must be honest and consistent with implemented functionality.

---

# 5. APPLICATION ROUTES

## Protected application routes

- `/app` — Overview dashboard
- `/app/transactions` — Transaction management
- `/app/calendar` — Financial calendar
- `/app/budgets` — Budget management
- `/app/forecast` — Month-end forecast
- `/app/money-leaks` — Recurring expenses and anomaly insights
- `/app/purchase-simulator` — Purchase impact simulator
- `/app/goals` — Savings goals
- `/app/challenges` — Financial challenges
- `/app/recommendations` — Personal finance coach
- `/app/reports` — Financial reports
- `/app/import` — CSV import
- `/app/settings/profile` — Profile settings
- `/app/settings/security` — Password and security
- `/app/settings/preferences` — Currency, timezone, and preferences
- `/app/settings/subscription` — Plan and entitlement details

Use route guards for protected routes. A user must not be able to access another user's data by manipulating URLs or API requests.

Include proper loading, error, empty, and not-found states.

---

# 6. THE FIVE CORE UNIQUE SELLING PROPOSITIONS

These five systems are the main differentiators of SpendSense. Implement their actual logic and make them visible in the UI.

## USP 1: Payday Survival System

### Objective

Answer: **How much can I safely spend today without jeopardizing my upcoming commitments?**

### Required inputs

- Available balance explicitly entered by the user or derived from a clearly defined transaction ledger.
- Monthly income, if provided.
- Payday day or next payday date.
- Confirmed upcoming bills.
- Budget commitments.
- Savings commitments.
- Existing spending and current date.

Never silently assume the ledger is a complete representation of the user's real bank balance.

Clearly distinguish between a manually entered balance, a ledger-derived estimate, and unverified future expenses.

### Calculation

Calculate spendable funds using a documented, consistent financial model.

For example:

`Spendable funds = available balance - reserved upcoming bills - reserved savings commitments`

Then calculate a safe daily allowance using the number of days until the next payday.

The calculation must:
- Avoid reserving the same commitment twice.
- Handle the final day before payday.
- Handle past-due bills appropriately.
- Handle month lengths and leap years.
- Handle a payday on the 29th, 30th, or 31st.
- Handle negative or insufficient funds.
- Handle missing income or balance information.
- Respect the user's timezone.
- Explain all amounts deducted from the available balance.

Do not assume that monthly income is received on a fixed date unless the user configures it.

### UI

Show:
- Safe-to-spend today.
- Remaining spendable funds.
- Next payday countdown.
- Reserved bills.
- Savings commitments.
- Spending pace.
- Daily allowance.
- Warnings when spending exceeds the recommended pace.
- An explanation of the calculation and its inputs.

Every value must come from backend-calculated data.

## USP 2: Future Expense Radar

### Objective

Answer: **Am I likely to exceed my budget this month?**

### Required features

Forecast expenses for the remainder of the month and estimate month-end spending.

A simple baseline can use:

`Projected monthly spend = current expense spend / elapsed days × total days in month`

Improve this using historical spending patterns when sufficient reliable data exists.

Potential inputs:
- Current month's actual expenses.
- Elapsed days.
- Days remaining.
- Historical spending.
- Category budgets.
- Confirmed upcoming bills.
- Confirmed recurring expenses.
- Known irregular expenses.

Avoid double-counting future bills that are already reflected in the actual spending total.

### UI

Show:
- Current actual spend.
- Projected month-end spend.
- Budget limit.
- Projected budget overrun.
- Remaining budget.
- Daily spending pace.
- Main contributing categories.
- Historical comparison.
- Forecast explanation.
- Data quality and confidence label.

When history is insufficient, explicitly mark the forecast as low confidence. Do not invent statistical confidence intervals or claim that a heuristic is a validated probability model.

Allow the user to explore simple scenarios, such as reducing category spending by a specified amount.

## USP 3: Money Leak Detective

### Objective

Identify patterns that users may overlook.

Implement deterministic detectors for:

1. Potential recurring payments.
2. Subscription price increases.
3. Unusual transaction amounts.
4. Repeated small purchases.
5. Duplicate-looking transactions.
6. Categories with increasing spending.
7. Spending spikes compared with an appropriate historical baseline.

### Recurring expense detection

Use merchant normalization, category, approximate amount, and date intervals to identify candidates.

Possible frequencies:
- Weekly.
- Monthly.
- Quarterly.
- Yearly.

Account for date variation, missed payments, and incomplete history.

Return a confidence or evidence score with a plain-language explanation.

Allow users to:
- Confirm a recurring expense.
- Edit its details.
- Dismiss the candidate.
- Review its transaction history.

### Anomaly detection

Use robust techniques such as:
- Median.
- Rolling median.
- Median absolute deviation.
- Historical category baselines.
- Merchant-level amount changes.

Do not flag every high-value transaction as suspicious.

Call these items unusual spending or anomalies, not confirmed fraud.

### Duplicate detection

Use external transaction IDs where available. For transactions without reliable IDs, use careful fingerprints involving relevant fields.

If two transactions merely look similar, flag them for review rather than automatically deleting or discarding them.

For CSV imports, fuzzy duplicate matching must never silently destroy potentially legitimate transactions.

### UI

Each insight must include:
- What was detected.
- Why it was detected.
- Relevant transactions.
- Estimated financial impact when defensible.
- Confidence or evidence.
- Recommended action.
- Confirm, dismiss, or review controls.

## USP 4: Purchase Impact Simulator

### Objective

Answer: **Can I afford this purchase without harming my budget or savings goals?**

### Inputs

- Purchase amount.
- Proposed purchase date.
- Category.
- Optional description.
- Optional savings goal.
- Optional alternative purchase amount.
- Optional alternative purchase date.

### Required scenarios

Compare:
- Buy now.
- Buy later.
- Buy a cheaper alternative.
- Wait until the next payday.

Show the estimated effect on:
- Safe-to-spend amount.
- Category budget.
- Month-end forecast.
- Remaining spendable funds.
- Savings goal progress.
- Estimated goal completion date when enough information exists.

Do not persist hypothetical transactions.

Make it explicit that the result is a scenario based on current recorded information, not a guarantee of affordability.

Include a comparison view and a clear explanation of which assumptions change each result.

## USP 5: Personal Finance Coach

### Objective

Turn recorded financial patterns into explainable, practical recommendations.

Use a deterministic rule engine rather than an external AI service.

Example recommendation rules:
- A category is projected to exceed its budget.
- Spending is increasing compared with a comparable historical period.
- A recurring payment has increased.
- Many small purchases have accumulated.
- A savings goal is falling behind its expected pace.
- A no-spend challenge could be useful based on observed discretionary spending.
- An adjustable category budget may not reflect the user's spending history.
- An upcoming commitment may leave insufficient spendable funds.

Each recommendation must contain:
- Stable rule identifier.
- Title.
- Explanation.
- Evidence and relevant period.
- Priority.
- Estimated impact, only when reasonably calculable.
- Confidence or data-quality indication.
- Suggested action.
- Status: new, completed, dismissed, or expired.

Allow users to inspect, complete, dismiss, or provide feedback on a recommendation.

Deduplicate recommendations for the same rule and period.

Never present generic advice as if it were personalized. Never promise a guaranteed saving amount.

---

# 7. CORE FINANCIAL FEATURES

## 7.1 Authentication

Implement:
- Signup.
- Login.
- Logout.
- Current-user endpoint.
- Forgot-password flow.
- OTP verification.
- Password reset.
- Change password.
- Session invalidation where applicable.
- Profile updates.
- Account deletion.

Use bcrypt or bcryptjs for passwords.

Prefer HTTP-only, Secure cookies with an appropriate SameSite policy and CSRF protection where needed. If bearer tokens are used instead, document the threat model and avoid storing long-lived authentication tokens in localStorage.

Ensure authentication works after a page refresh and that logout actually invalidates the session according to the selected design.

### OTP security

Generate a cryptographically secure six-digit OTP.

Requirements:
- Store only a hash of the OTP.
- Five-minute expiry.
- Maximum of five incorrect attempts per challenge.
- Single-use OTP.
- Resending invalidates the previous challenge.
- Rate limits for requesting and verifying OTPs.
- Protect against account enumeration with generic responses.
- Do not expose OTPs in API responses or logs.
- Invalidate expired or exhausted challenges.
- Make verification and consumption atomic where practical.
- Send a notification after a successful password reset.
- Do not claim an email was sent unless the mail operation succeeded.

Use these environment variables:

`SMTP_HOST`
`SMTP_PORT`
`SMTP_SECURE`
`SMTP_USER`
`SMTP_PASS`
`EMAIL_FROM`

Other environment variables:

`MONGODB_URI`
`JWT_SECRET`
`CLIENT_URL`
`PORT`
`NODE_ENV`

Add safe placeholders to `.env.example`. Never place real secrets in source control.

## 7.2 Transaction management

Support:
- Create transaction.
- Read transaction.
- Update transaction.
- Delete transaction.
- Search.
- Filter by date range.
- Filter by income or expense.
- Filter by category.
- Filter by merchant.
- Filter by payment method where available.
- Sort.
- Pagination.
- Transaction details.
- CSV export.

Transactions should include:
- Type: income or expense.
- Amount.
- Currency.
- Category.
- Merchant.
- Description.
- Date.
- Optional payment method.
- Source: manual or CSV.
- Optional import batch identifier.
- Optional external transaction identifier.
- Tags and notes when useful.

Use a consistent financial representation. Prefer integer minor units for supported currencies, such as paise for INR, and centralize parsing and formatting. Do not assume all currencies have two decimal places if multiple currencies are supported.

Prevent invalid, zero, negative, or non-finite transaction amounts unless a clearly defined business rule explicitly permits them.

## 7.3 Categories

Support default income and expense categories.

Allow user-defined categories if feasible.

Validate category ownership and type. Do not allow arbitrary category IDs to bypass validation.

Provide useful icons and consistent category colors.

## 7.4 Budget management

Support:
- Monthly budgets.
- Category-specific limits.
- Actual spending.
- Remaining amount.
- Percentage consumed.
- Budget status.
- Historical comparisons.
- Overspending indicators.
- Optional rollover, if implemented with clear accounting rules.

Use a unique constraint appropriate to the budget model, such as user, category, month, and year.

Prevent duplicate budgets and inconsistent date handling.

## 7.5 Savings goals

Support:
- Goal name.
- Description.
- Target amount.
- Target date.
- Contributions.
- Contribution history.
- Remaining amount.
- Progress percentage.
- Estimated completion date when defensible.
- Goal status.

Avoid double-counting savings contributions as expenses if the accounting model treats them as transfers or allocations.

Use a clear source of truth for goal balances. If a contribution ledger is used, derive or reconcile the displayed balance from that ledger.

## 7.6 Challenges

Support practical challenges such as:
- No-spend days.
- Category spending limits.
- Small-purchase reduction.
- Weekly savings goals.

Allow users to create, update, pause, complete, and review challenges where applicable.

Track progress using actual recorded transactions. Make limitations clear when transaction records may be incomplete.

## 7.7 Life-event planner

Allow users to plan for expenses such as:
- Buying a laptop.
- Moving to a new city.
- A vacation.
- An emergency fund.
- A course or certification.

Show the estimated target amount, current savings, remaining requirement, timeline, and contribution needed per period.

Clearly distinguish user-entered assumptions from observed financial data.

---

# 8. INTERACTIVE FINANCIAL CALENDAR

The calendar is a major feature and must not be implemented as a static monthly grid.

## Required features

1. Monthly calendar navigation.
2. Daily expense totals.
3. Daily income totals.
4. Transaction counts.
5. Category indicators.
6. Spending heatmap.
7. Budget-aware color or intensity.
8. Comparison with historical spending when adequate data exists.
9. Upcoming confirmed payments.
10. Predicted recurring expenses shown separately from confirmed payments.
11. Clickable days.
12. A selected-day details panel.
13. Add, edit, and delete transactions from the relevant day.
14. Quick navigation to a transaction's detail or edit view.

Use an appropriate custom React calendar or a maintained calendar package such as react-big-calendar. Choose one approach and implement it consistently.

### Calendar interaction

When a user clicks a date:
- Display all recorded transactions for that date.
- Display income and expense totals.
- Show category breakdowns.
- Show confirmed upcoming payments relevant to that date.
- Distinguish predicted recurring expenses from confirmed obligations.
- Allow the user to add a transaction for that date.

When the user adds or edits a transaction, refresh the affected date and summary values.

### Heatmap rules

A date's color intensity must be based on a documented metric, such as:
- Absolute spending.
- Spending relative to the applicable budget.
- Historical median comparison.

Do not imply that a day with no recorded transactions had zero real-world spending.

### API endpoints

Implement equivalents of:

- `GET /api/calendar?month=YYYY-MM`
- `GET /api/calendar/day?date=YYYY-MM-DD`
- `GET /api/calendar/upcoming`

Use timezone-safe date boundaries. Test month transitions, leap years, daylight-saving changes where relevant, and the user's configured timezone.

---

# 9. DASHBOARD AND ANALYTICS

Build a useful overview dashboard that shows actual data, not static mock values.

Include:
- Available balance or clearly labeled balance estimate.
- Income and expenses for the selected period.
- Net cash flow.
- Safe-to-spend today.
- Budget progress.
- Month-end spending forecast.
- Upcoming commitments.
- Recent transactions.
- Category breakdown.
- Spending trends.
- Savings goal progress.
- Important money-leak alerts.
- Recommended next action.

Use Recharts for:
- Monthly income versus expenses.
- Spending by category.
- Daily or weekly spending trends.
- Budget versus actual.
- Historical and projected spending.
- Goal progress where appropriate.

Charts must have:
- Responsive layouts.
- Useful tooltips.
- Accessible labels.
- Clear legends.
- Correct number formatting.
- Meaningful empty states.
- Proper loading and error states.

Every chart must use real backend data or explicitly labeled synthetic demo data.

Do not add a chart merely to fill space.

---

# 10. CSV STATEMENT IMPORT

Implement a safe, multi-step import workflow.

## Step 1: Upload

Accept supported CSV files only.

Enforce reasonable file-size and row-count limits. Validate the file structure and reject unsupported formats.

## Step 2: Preview and map columns

Allow users to map fields such as:
- Date.
- Description or merchant.
- Amount.
- Transaction type, if present.
- Category, if present.
- External transaction identifier, if present.

Handle common amount formats and distinguish debit/credit conventions where possible.

If the file format is ambiguous, ask the user to choose the interpretation rather than guessing silently.

## Step 3: Normalize and validate

- Parse dates safely.
- Normalize merchant text.
- Validate amounts.
- Normalize categories.
- Detect missing required fields.
- Identify likely duplicates.
- Show rejected rows with reasons.

## Step 4: Confirm

Show a preview with:
- Valid rows.
- Rejected rows.
- Potential duplicates.
- Expected imported total.
- Any detected format assumptions.

## Step 5: Import

Import only after user confirmation.

Use a transaction or documented partial-import strategy so failures are understandable and recoverable.

Prevent duplicate import batches where practical. Do not silently discard legitimate transactions based only on fuzzy similarity.

## Step 6: Summary

Show:
- Imported rows.
- Rejected rows.
- Duplicate rows skipped or flagged.
- Total imported income and expenses.
- Import batch history.

Store appropriate import metadata.

---

# 11. REPORTS AND EXPORTS

Support:
- Monthly summaries.
- Annual summaries.
- Category spending reports.
- Income-versus-expense reports.
- Budget performance.
- Savings goal progress.
- Recurring expense reports.
- CSV export.
- PDF export if a suitable local package can be implemented reliably.

Ensure report calculations match dashboard and transaction calculations.

Do not generate reports with fabricated values.

If PDF generation is too costly for an early phase, complete CSV export and report data calculations first, then document PDF export as pending rather than presenting a nonfunctional button.

---

# 12. DATA MODELS

Design appropriate Mongoose schemas with validation, indexes, timestamps, and clear ownership rules.

The following are suggested starting models. Adjust them where necessary, but document significant design decisions.

## User

Fields may include:
- `name`
- `email`
- `passwordHash`
- `currency`
- `timezone`
- `paydayDay`
- `monthlyIncome`
- `onboardingCompleted`
- `emailVerified`
- `subscriptionPlan`
- `subscriptionStatus`
- `preferences`
- `timestamps`

Never return `passwordHash` or other private authentication fields in API responses.

## Transaction

- `userId`
- `type`
- `amount`
- `currency`
- `category`
- `merchant`
- `description`
- `date`
- `paymentMethod`
- `source`
- `importBatchId`
- `externalTransactionId`
- `tags`
- `notes`
- `timestamps`

## Budget

- `userId`
- `category`
- `monthlyLimit`
- `month`
- `year`
- `rolloverEnabled`
- `timestamps`

## SavingsGoal

- `userId`
- `name`
- `description`
- `targetAmount`
- `targetDate`
- `status`
- Contribution ledger or a clearly defined contribution model
- `timestamps`

## ScheduledExpense

- `userId`
- `name`
- `category`
- `expectedAmount`
- `frequency`
- `nextDueDate`
- `active`
- `source`

## RecurringExpense

- `userId`
- `merchantKey`
- `category`
- `frequency`
- `expectedAmount`
- `lastOccurrence`
- `nextExpectedDate`
- `confidence`
- `status`

## Recommendation

- `userId`
- `ruleId`
- `type`
- `title`
- `explanation`
- `reason`
- `estimatedImpact`
- `impactType`
- `priority`
- `status`
- `generatedAt`
- `expiresAt`

## Challenge

- `userId`
- `name`
- `challengeType`
- `startDate`
- `endDate`
- `targetAmount`
- `category`
- `status`

## ImportBatch

- `userId`
- `filename`
- `status`
- `rowCount`
- `acceptedCount`
- `rejectedCount`
- `duplicateCount`
- `createdAt`

## OTP challenge

- Account reference.
- Purpose.
- OTP hash.
- Expiry time.
- Attempt count.
- Consumption timestamp.
- Creation timestamp.

## Subscription

- `userId`
- `plan`
- `status`
- `startedAt`
- `expiresAt`
- `source`
- `timestamps`

Use appropriate indexes for user-scoped queries, date filtering, recurring expense lookups, and uniqueness constraints.

Avoid embedding unbounded transaction history inside a single user document.

---

# 13. BACKEND API STRUCTURE

Use a modular Express architecture.

Organize code into appropriate folders, for example:

- `routes`
- `controllers`
- `services`
- `models`
- `middleware`
- `validators`
- `utils`
- `config`
- `jobs`
- `tests`

Keep business logic out of route definitions.

Use centralized error handling, consistent response structures, validation, and correct HTTP status codes.

Implement API groups covering the following.

## Authentication

`/api/auth`
- Signup.
- Login.
- Logout.
- Current user.
- Forgot password.
- Verify reset OTP.
- Reset password.
- Change password.

## Transactions

`/api/transactions`
- CRUD.
- Filtering and pagination.
- Export.

## Categories

`/api/categories`

## Budgets

`/api/budgets`

## Savings goals

`/api/goals`
- CRUD.
- Contributions.
- Contribution history.

## Challenges

`/api/challenges`

## Calendar

`/api/calendar`
- Monthly view.
- Daily details.
- Upcoming payments.

## Analytics

`/api/analytics`
- Overview.
- Monthly trends.
- Category breakdown.
- Safe-to-spend.
- Forecast.
- Forecast history where useful.

## Forecasts

`/api/forecasts`

## Recurring expenses

`/api/recurring-expenses`
- List.
- Confirm.
- Edit.
- Dismiss.

## Anomalies

`/api/anomalies`
- List.
- Review.
- Dismiss.

## Purchase simulator

`/api/purchases/simulate`

This endpoint should calculate scenarios without creating transactions.

## Recommendations

`/api/recommendations`
- List.
- Complete.
- Dismiss.
- Feedback.

## Import

`/api/import`
- Preview.
- Confirm.
- History.

## Reports

`/api/reports`

## Subscription and entitlements

`/api/subscription`

Use consistent response formats. Validate every incoming request and scope every database query to the authenticated user.

---

# 14. FINANCIAL SERVICE LAYER

Implement reusable service modules, including:

- `safeToSpendService`
- `forecastService`
- `recurringExpenseService`
- `anomalyDetectionService`
- `purchaseSimulationService`
- `recommendationService`
- `calendarService`
- `reportService`
- `entitlementService`
- `csvImportService`

These services must be independently testable.

Keep calculation functions pure wherever practical. Pass dates, settings, transactions, and commitments explicitly instead of reading hidden global state.

Document assumptions, input requirements, output structure, and known limitations for financial calculations.

Centralize:
- Currency conversions and formatting.
- Date range calculations.
- Timezone-aware boundaries.
- Category normalization.
- Merchant normalization.
- Financial amount validation.
- Error handling.

Do not duplicate the same financial calculation in the frontend and backend. The backend should be the source of truth.

---

# 15. FREEMIUM AND ENTITLEMENT ARCHITECTURE

Implement two plans.

## Free plan

Include:
- Account management.
- Manual transactions.
- Transaction filtering.
- Basic dashboard.
- Core charts.
- Basic budgets.
- Basic calendar.
- Basic financial summaries.
- Limited CSV import.

## Plus plan

Include:
- Advanced forecasts.
- Money Leak Detective.
- Recurring expense analysis.
- Calendar comparisons.
- Purchase Impact Simulator.
- Payday Survival System.
- Advanced personalized recommendations.
- Multiple life-event plans.
- Advanced challenges.
- Extended reports.
- PDF export where implemented.
- Additional scenario analysis.

Enforce entitlements in the backend, not only by hiding frontend elements.

Create a reusable entitlement service that defines features, limits, and access rules.

When a feature is unavailable under the current plan, show an honest upgrade explanation.

Do not integrate payments or falsely claim a payment was processed.

---

# 16. SECURITY AND PRIVACY

Implement and test the following:

1. Password hashing.
2. Secure authentication.
3. Appropriate session expiration and logout behavior.
4. HTTP security headers.
5. Explicit CORS allowlist.
6. Rate limits on login, signup, and OTP routes.
7. Request validation.
8. Request body size limits.
9. Secure error responses.
10. Protection against unauthorized object access.
11. Ownership checks for every user-owned resource.
12. Protection against mass assignment.
13. Safe file upload and CSV parsing.
14. No secrets committed to source control.
15. No passwords, OTPs, or tokens logged.
16. Safe handling of MongoDB errors.
17. Account deletion that handles related records according to a documented policy.
18. Appropriate CSRF protection if cookie-based authentication is used.
19. No unsafe HTML rendering.
20. No financial information sent to external AI services.
21. No production-only security bypasses.

Never trust the frontend for:
- User ID.
- Subscription plan.
- Entitlements.
- Financial calculations.
- Transaction ownership.
- Administrative privileges.

Do not return database internals, stack traces, or sensitive fields in production API responses.

Create a concise privacy policy describing the data the application stores and its actual behavior. Do not claim compliance certifications or security guarantees that have not been established.

---

# 17. SYNTHETIC DEMO DATA

Create a development seed script that generates realistic but clearly synthetic data across multiple months.

Include:
- Income.
- Daily transactions.
- Multiple spending categories.
- Several budgets.
- Savings goals.
- Confirmed upcoming bills.
- Recurring expenses.
- A few unusual transactions.
- Several recommendations.
- Examples of spending increases and reductions.

The data should demonstrate the actual capabilities of SpendSense.

Requirements:
- Clearly label seeded data as synthetic.
- Do not fabricate testimonials or user statistics.
- Do not insert demo data into real user accounts automatically.
- Make the seed script safe and repeatable.
- Avoid accidental duplication when seeding repeatedly.

Use demo data for local development and screenshots, but all normal authenticated user views must be driven by the authenticated user's own records.

---

# 18. TESTING REQUIREMENTS

Write meaningful unit and integration tests.

## Authentication tests

- Signup validation.
- Duplicate email behavior.
- Login success and failure.
- Logout behavior.
- OTP expiry.
- OTP wrong-attempt limit.
- OTP resend invalidation.
- OTP single-use behavior.
- Password reset success.
- Password reset failure.
- Rate limiting where practical.

## Transaction tests

- Create, read, update, and delete.
- Invalid amounts.
- Invalid dates.
- Pagination.
- Filtering.
- Ownership isolation.
- Attempts to access another user's records.

## Financial calculation tests

- Safe-to-spend calculation.
- Insufficient funds.
- No double reservation.
- Payday calculations.
- Month-end boundaries.
- Leap years.
- Missing income.
- Missing balance.
- Forecasts with little or no history.
- Forecasts with sufficient history.
- Future bills and double-counting protection.
- Recurring payment detection.
- Price increase detection.
- Outlier detection.
- Duplicate transaction handling.
- Purchase simulation does not persist a transaction.
- Savings goal calculations.
- Calendar timezone boundaries.
- CSV import validation and duplicate handling.

## Frontend tests

Test important flows:
- Signup and login.
- Protected navigation.
- Transaction creation and editing.
- Budget management.
- Calendar interactions.
- Purchase simulation.
- Recommendation actions.
- CSV preview and confirmation.
- Loading and error states.

Run tests after implementing each relevant phase. Fix failures rather than ignoring them.

If a test cannot run because a service or environment variable is unavailable, report the exact limitation. Do not claim that unexecuted tests passed.

---

# 19. PROJECT DOCUMENTATION

Create a useful `README.md` containing:

- Product overview.
- Feature list.
- Architecture.
- Tech stack.
- Prerequisites.
- Installation.
- Environment setup.
- Frontend startup.
- Backend startup.
- MongoDB setup.
- SMTP configuration.
- Seed data instructions.
- Test commands.
- Lint and build commands.
- API overview.
- Financial algorithm explanations.
- Security decisions.
- Known limitations.
- Deployment guidance.

Create `.env.example` with placeholder values only.

Create `PROJECT_PROGRESS.md` to track implementation and verification.

Maintain a checklist with:
- Completed phases.
- Current phase.
- Files created or modified.
- Tests executed.
- Actual test results.
- Build results.
- Known bugs.
- Outstanding requirements.
- Required environment variables.
- Next implementation steps.

Update this file after each phase.

---

# 20. IMPLEMENTATION PLAN

Build the application in the following phases. Do not skip ahead or mark a phase complete until its acceptance criteria are met.

## Phase 1 — Foundation and design system

Tasks:
- Inspect the workspace.
- Inspect the installed Node.js and npm versions.
- Review existing project files.
- Initialize the frontend and backend if needed.
- Establish the folder structure.
- Configure environment handling.
- Add `.env.example` and `.gitignore`.
- Set up frontend routing.
- Set up the Express application.
- Set up reusable design tokens and UI components.
- Build the landing page.
- Build the protected application shell and sidebar.
- Build responsive layouts.
- Create reusable buttons, inputs, cards, badges, modals, and loading states.
- Establish linting and basic testing.
- Create `PROJECT_PROGRESS.md`.

Acceptance criteria:
- The frontend starts.
- The backend starts.
- Environment variables are handled safely.
- Landing page renders correctly.
- Application shell is responsive.
- Navigation works.
- No secrets are exposed.
- Build and available checks run successfully.

**Important: On the first run, implement Phase 1 only. Do not build all remaining phases in the same initial pass.**

## Phase 2 — Authentication and account security

Implement signup, login, logout, current-user retrieval, password reset via OTP, password changes, and protected routes.

Add authentication tests and security checks.

## Phase 3 — Core finance management

Implement:
- Transactions.
- Categories.
- Budgets.
- Savings goals.
- Dashboard.
- Charts.
- Basic analytics.

All views must use actual authenticated user data.

## Phase 4 — Financial calendar

Implement monthly navigation, daily summaries, transaction details, heatmaps, date-specific CRUD, and upcoming commitments.

## Phase 5 — Payday Survival System and Future Expense Radar

Implement safe-to-spend calculations, month-end forecasting, budget overruns, confidence/data-quality labels, and explanations.

## Phase 6 — Money Leak Detective

Implement recurring expense detection, anomaly detection, price creep detection, repeated small-purchase analysis, and review workflows.

## Phase 7 — Purchase Impact Simulator and Personal Finance Coach

Implement scenario calculations, deterministic recommendation rules, recommendation management, and actionable explanations.

## Phase 8 — CSV import and reports

Implement CSV preview, field mapping, validation, duplicate review, confirmed import, export, and reporting.

## Phase 9 — Challenges, life-event planning, and subscriptions

Implement challenges, life-event plans, freemium entitlements, upgrade messaging, and subscription settings.

## Phase 10 — Quality assurance and release preparation

Complete:
- Cross-feature integration.
- Security review.
- Responsive testing.
- Error handling.
- Empty states.
- Automated tests.
- Build verification.
- Documentation.
- Known limitations.
- Deployment configuration.

Do not declare the project production-ready merely because it builds. Report what was verified and what remains.

---

# 21. CODEx EXECUTION RULES

Follow these rules throughout implementation.

## Rule 1: Inspect before editing

Before making changes:
- Inspect the working directory.
- Identify existing applications and dependencies.
- Inspect package scripts and environment files.
- Identify existing code that should be preserved.
- Determine whether the project is empty or partially implemented.

Never blindly overwrite the project.

## Rule 2: Work incrementally

Implement only the current phase.

For each phase:
1. Review the relevant requirements.
2. Identify the files and dependencies needed.
3. Implement the smallest coherent working set.
4. Run relevant tests.
5. Run build and lint checks where available.
6. Inspect and fix errors.
7. Review security-sensitive changes.
8. Update `PROJECT_PROGRESS.md`.
9. Summarize verified results and remaining work.

## Rule 3: Use real functionality

Every interactive control must perform its advertised action.

Forms must validate input. Buttons must invoke real handlers. Charts must use actual calculated data. Tables must support their advertised filters and actions.

Do not create decorative controls that imply functionality that does not exist.

## Rule 4: Maintain code quality

Use clear naming, modular services, reusable components, and centralized validation.

Avoid giant components, duplicated business logic, deeply coupled modules, unnecessary abstractions, and excessive dependencies.

## Rule 5: Handle financial logic carefully

Use consistent amount representation, timezone-safe dates, and documented assumptions.

Add tests for boundary cases before trusting financial calculations.

Never silently fabricate missing information or claim that a forecast is guaranteed.

## Rule 6: Respect the environment

- Do not expose secrets.
- Do not overwrite an existing `.env` file.
- Do not run destructive commands without a genuine need and authorization.
- Do not disable security checks to make tests pass.
- Do not introduce fake OTP or authentication bypasses.
- Do not falsely report successful email delivery.
- Do not claim tests or builds succeeded without running them.

## Rule 7: Report honestly

At the end of each phase, report:
- What was implemented.
- Important files created or changed.
- Commands executed.
- Actual test results.
- Actual build results.
- Known issues.
- Remaining requirements.
- Exact next step.

Distinguish implemented, tested, partially implemented, and not implemented functionality.

---

# 22. YOUR FIRST TASK

Start now with **Phase 1 only**.

First inspect the current workspace and identify the existing project state. Then initialize or adapt the project without overwriting useful work.

Build:
- Frontend foundation.
- Backend foundation.
- Environment configuration.
- Shared design system.
- Landing page.
- Responsive application shell.
- Sidebar navigation.
- Reusable UI components.
- Basic routing.
- Initial testing and linting setup.
- `PROJECT_PROGRESS.md`.

Do not implement authentication, transaction CRUD, forecasting, recurring expense detection, purchase simulation, or other later-phase functionality yet.

It is acceptable to use clearly labeled placeholders for features that belong to future phases, but do not make them appear functional. Avoid fake analytics or fabricated financial results.

Once Phase 1 is complete:
1. Run the relevant checks.
2. Fix the errors you can resolve.
3. Update `PROJECT_PROGRESS.md`.
4. Summarize the implementation.
5. List any blockers and the next phase.

Then stop and wait for my review before beginning Phase 2.

**Final objective:** Build SpendSense into a reliable, premium, explainable personal finance application in which every major feature works, every financial calculation has a documented basis, user data is protected, and progress is verified phase by phase.