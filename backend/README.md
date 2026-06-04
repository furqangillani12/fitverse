# Fitverse Backend

Node.js + Express REST API for the Fitverse platform.

## Setup

```bash
cd backend
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, etc.
npm install
npm run dev               # starts on http://localhost:5000 with nodemon
```

## Structure

```
backend/
├── config/         Database connection (db.js)
├── models/         Mongoose schemas (User.js, ...)
├── routes/         Express route definitions
├── controllers/    Request handlers / business logic
├── middleware/     Auth (JWT), validation
├── services/       AI engine, 3rd-party API wrappers
├── server.js       App entry point
└── .env            Secrets (gitignored — copy from .env.example)
```

## Available Endpoints

| Method | Route | Description | Test Case |
|--------|-------|-------------|-----------|
| GET  | `/` | Health check | — |
| POST | `/api/auth/register` | Create account | TC-2 |
| POST | `/api/auth/login` | Log in, returns JWT | TC-1 |

Protected routes use the `protect` middleware (returns **401** when unauthorized — TC-10).

## Next Modules to Build

- [ ] Workouts (AI plan generation — TC-3, gender-based — TC-11)
- [ ] Meals (recognition + nutrition — TC-4)
- [ ] Mood tracking (TC-5)
- [ ] Social feed (TC-6)
- [ ] Gamification / leaderboard (TC-7)
- [ ] SOS alerts (TC-8)
