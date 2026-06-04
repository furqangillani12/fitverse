# Fitverse

**AI-Powered Fitness, Nutrition & Social Wellness Platform**

A cross-platform mobile wellness app integrating fitness, nutrition, mental health, social interaction, and emergency safety — built as a monorepo.

> University of Central Punjab — SDP Final Project (Group F25CS163)

---

## Monorepo Structure

```
fitverse/
├── mobile/          React Native + Expo app (Android & iOS)
└── backend/         Node.js + Express REST API
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native + Expo |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose) |
| Auth / Push | Firebase + JWT |
| Hosting | Render (free tier) |
| AI — Meal Recognition | Self-hosted CV model (MobileNet/YOLOv8, Food-101) |
| AI — Recommendations | Rule-based engine |

## Features

AI workout coaching · gender-based plans · real-time workout tracking · exercise timers · video guidance · AI meal recognition · nutrition/diet planning · mood tracking · social feed · gamification (points/leaderboards) · SOS emergency alert.

---

## Getting Started

### Backend
```bash
cd backend
cp .env.example .env      # fill in your keys
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start            # scan QR with Expo Go app
```

See [`backend/README.md`](backend/README.md) and [`mobile/README.md`](mobile/README.md) for details.
