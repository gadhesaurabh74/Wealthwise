# SpendSense Progress

## Current phase
Phase 3 - Core finance management (in progress).

## Completed
- Inspected the empty workspace and verified Node `v24.13.0` and npm `10.9.1`.
- Created npm workspaces for `client` and `server`.
- Added safe environment templates and gitignore rules.
- Added Vite React frontend with responsive marketing landing page.
- Added responsive application shell with sidebar navigation and clearly labeled future-feature placeholder state.
- Added Express API foundation with Helmet, explicit CORS origin, body-size limit, and health endpoint.
- Added reusable buttons, logo, feature cards, and responsive design tokens/components.
- Added README documentation.
- Added MongoDB-backed user model, bcrypt password hashing, JWT sessions in HTTP-only cookies, auth middleware, signup/login/logout/current-user, password change, and generic password-reset challenge creation.
- Connected signup and login forms to the real API with validation, loading, and error states.
- Added SMTP-gated OTP email delivery, five-minute hashed OTP challenges, attempt limits, OTP verification, password reset, auth rate limiting, and frontend `/app` session protection.
- Started core finance management with user-scoped transaction CRUD and filtering/pagination, budget CRUD, savings goal CRUD, validation, ownership checks, indexes, and Mongoose models.
- Added default category endpoint and authenticated overview analytics for monthly income, expenses, net cash flow, category breakdown, budget remaining, and transaction count.
- Added an authenticated frontend overview that loads live analytics with loading, error, empty, and metric states.
- Added a working transactions screen with authenticated list loading and transaction creation form.
- Refactored the frontend into modular files: shared UI, API client, overview, transactions, and route composition.
- Added modular budget and savings-goal screens with real authenticated create/list flows.
- Started Phase 4 with scheduled-expense model, monthly calendar API, and modular calendar frontend view.
- Started Phase 5 with pure deterministic forecast and safe-to-spend services plus authenticated analytics endpoints.
- Added modular forecast UI with explicit balance input, safe-to-spend result, reserved-bill explanation, month-end projection, and confidence label.
- Added deterministic repeated-spend detection, purchase simulation service/API, and modular money-leak and purchase-simulator screens.
- Added deterministic finance-coach recommendations with explainable rules and complete/dismiss actions.
- Added backend subscription entitlements with free/plus feature definitions and honest no-payment upgrade behavior.
- Added CSV preview/confirmation with row validation, import batches, ownership checks, and duplicate review, plus monthly report calculations.
- Added modular monthly report frontend with income, expense, net, and category totals.
- Added modular CSV import frontend with preview, rejected-row messaging, and explicit confirmation.
- Fixed local signup API routing by using a relative `/api` client base with Vite proxying to Express.
- Fixed server environment loading so `server/.env` is loaded by the npm start/dev scripts; signup sessions now have the required JWT secret, and API errors return JSON.
- Added Recharts to the client and responsive income-vs-expense and category-mix charts to `Overview.jsx`.
- Fixed overview response handling for empty/non-JSON API responses and replaced the hardcoded greeting with the authenticated user's name.
- Added frontend forgot-password flow for backend Nodemailer OTP request, verification, and password reset.
- Updated weekly trend mode to group the current month into Week 1 through Week 4/5 buckets.
- Added modular scheduled-expense management screen with create and deactivate actions.
- Added authenticated CSV transaction export endpoint and documented public privacy/terms work as the remaining final polish.

## Files created or modified
- `package.json`, `.gitignore`, `README.md`, `PROJECT_PROGRESS.md`
- `client/` frontend foundation and styles
- `server/` Express foundation and environment template

## Verification
- Toolchain inspection completed: Node `v24.13.0`, npm `10.9.1`.
- `npm install` was attempted in the sandbox and with escalation; the escalated install remained silent for about one minute and was stopped.
- `npm run build`, `npm run lint`, and `npm test` were attempted. They could not run because Vite, ESLint, and Vitest were unavailable after the incomplete install.
- Source files were created successfully; dependency-backed verification remains pending.

## Known limitations
- Automated API/frontend tests, full build/lint verification, and final security review remain pending; CSV transaction export and privacy/terms pages are implemented.
- SMTP delivery requires the server SMTP variables; without them reset requests remain generic and do not claim an email was sent.

## Environment variables needed later
`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT`, `NODE_ENV`, and SMTP variables listed in `requirements.md`.

## Exact next step
Complete `npm install` in an environment with npm registry access, add categories/dashboard analytics and frontend finance views, then run API and frontend tests before marking Phase 3 complete.
