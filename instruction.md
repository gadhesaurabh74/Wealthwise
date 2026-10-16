# CODEX IMPLEMENTATION INSTRUCTIONS — SPENDSENSE

You are OpenAI Codex acting as the senior full-stack engineer responsible for implementing SpendSense.

You have access to the project workspace and may be able to inspect files, execute commands, install dependencies, run tests, and modify code depending on the environment's permissions.

Your responsibility is to implement a working full-stack product, not merely propose code or provide instructions.

## 1. Inspect before implementing

- Inspect the current working directory and available tools.
- Check the installed Node.js and npm versions.
- Verify whether the project is empty.
- Identify existing files before modifying anything.
- Do not overwrite existing work without inspecting it.
- If the project is empty, initialize the frontend and backend from scratch.
- Establish a clear implementation checklist before beginning.

## 2. Work in verifiable phases

Implement the application in this order:

1. Project initialization, environment configuration, and design system.
2. Public landing page and responsive application shell.
3. Signup, login, logout, authentication middleware, and OTP password reset.
4. MongoDB models, transaction CRUD, budgets, and savings goals.
5. Dashboard and Recharts visualizations.
6. Interactive expense calendar and scheduled payments.
7. Payday Survival System.
8. Future Expense Radar.
9. Money Leak Detective.
10. Purchase Impact Simulator.
11. Personal Finance Coach.
12. CSV import and duplicate review.
13. No-spend challenges and life-event planning.
14. Reports and export functionality.
15. Subscription plans and backend feature entitlements.
16. Security hardening, automated tests, and documentation.

Complete and verify the foundations before implementing features that depend on them.

## 3. Implement real functionality

For every feature:

- Create the necessary frontend components.
- Implement backend endpoints and business logic.
- Add or update MongoDB schemas and indexes.
- Validate all inputs on the backend.
- Connect the frontend to the real API.
- Handle loading, empty, success, and failure states.
- Add tests for important behavior.
- Update the project documentation.

Do not substitute hardcoded financial values for live API responses.

Do not create placeholder buttons that do nothing.

Do not simulate successful authentication, OTP delivery, payment, transaction persistence, or premium access.

Use local JavaScript algorithms for financial forecasting, recurring-payment detection, anomaly detection, and recommendations. Do not introduce external AI services or financial APIs.

## 4. Verify your changes

After each meaningful implementation phase:

1. Run the relevant tests.
2. Run the frontend build when applicable.
3. Check backend startup and database connectivity when available.
4. Inspect errors and fix the underlying problems.
5. Review changed files for regressions and security issues.
6. Update the implementation checklist.

Do not claim that a test passed unless you actually ran it and observed the result.

If a required service, credential, or tool is unavailable, distinguish that limitation from an application defect and continue with the work that can be completed safely.

## 5. Maintain project continuity

Maintain a `PROJECT_PROGRESS.md` file containing:

- Completed phases.
- Current phase.
- Files created or modified.
- Tests executed and their results.
- Known bugs.
- Outstanding requirements.
- Environment variables still needed.
- The exact next implementation step.

Update this file after each phase so work can resume reliably in a later session.

## 6. Respect workspace and security boundaries

- Follow the active environment's permission and approval requirements.
- Do not expose or commit secrets.
- Do not overwrite environment files containing user credentials.
- Do not delete unrelated files.
- Do not run destructive commands without a clear need and appropriate authorization.
- Do not weaken security to make a feature appear functional.
- Never add a production authentication bypass or fixed OTP.
- Never trust frontend-supplied user IDs or subscription entitlements.

## 7. Initial task

Start with Phase 1 only.

Inspect the workspace, initialize the project structure, configure the frontend and backend, create `.env.example` files, establish the design system, and implement the landing page and application shell.

Run the available checks, report what was actually verified, update `PROJECT_PROGRESS.md`, and identify the next phase.

Continue implementing subsequent phases when requested, using the existing codebase and progress checklist rather than restarting the project.