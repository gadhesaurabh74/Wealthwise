# SpendSense

SpendSense is a MERN personal finance workspace focused on explainable financial clarity. Phase 1 establishes the React/Vite frontend, Express backend, responsive marketing page, and protected application shell. Financial data and authentication are intentionally not simulated; they are scheduled for later phases.

## Run locally

Prerequisites: Node.js 20+ and npm 10+.

```bash
npm install
copy server\.env.example server\.env
npm run dev
```

The frontend runs at `http://localhost:5173`; the API health check is `http://localhost:4000/api/health`. MongoDB is not required for Phase 1.

## Checks

```bash
npm run build
npm run lint
npm test
```

## Roadmap

Phase 1 is the current foundation. Phase 2 adds real authentication and account security, followed by transaction management, analytics, calendar, financial intelligence, imports, reports, challenges, and entitlements. See `requirements.md` and `PROJECT_PROGRESS.md` for the complete specification.
