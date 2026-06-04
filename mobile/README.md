# Fitverse Mobile

React Native + Expo app for the Fitverse platform.

## Setup

```bash
cd mobile
npm install
npx expo start            # scan the QR code with the Expo Go app on your phone
```

> No Apple/Google developer account needed — run it through **Expo Go**.

## Structure

```
mobile/
├── App.js                  App entry + navigation
├── app.json                Expo config
└── src/
    ├── screens/            One file per screen (LoginScreen, Dashboard, ...)
    ├── components/         Reusable UI components
    ├── navigation/         Navigators (stack/tab)
    ├── services/           API calls to the backend (api.js)
    └── assets/             Images, icons, fonts
```

## Connecting to the backend

In `src/services/api.js`, set `BASE_URL` to your machine's **LAN IP** (e.g.
`http://192.168.1.5:5000/api`) when testing on a physical phone — `localhost`
only works inside an emulator.

## Screens to Build

Login (done) · Register · Dashboard · Workout Plan · Workout Timer · Live
Tracking · Video Guidance · Meal Tracking · Mood Tracker · Social Feed ·
Leaderboard · SOS · Settings.
