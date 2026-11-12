# Todo Client

React frontend for the todo app. Built with Vite, Tailwind CSS, Redux Toolkit, and React Router.

API requests to `/api` are proxied to `http://localhost:5000` (see `vite.config.js`). Run the [server](../server) alongside the client.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev      # development (Vite)
npm run build    # production build
npm run preview  # preview production build
```

App listens on `http://localhost:5173` by default.

## Features

- **Onboarding** — Welcome screen at `/welcome` with a Get Started CTA; completion is stored in `localStorage`.
- **Authentication** — Login and register forms at `/login` and `/register`, JWT stored in `localStorage`, and session restore via `/api/auth/me`.

## Project structure

```
src/
  api/                        # HTTP client, token storage, auth API
  components/Onboarding.jsx
  components/AuthForm.jsx
  hooks/useAuth.js
  hooks/useUi.js
  storage/onboardingStorage.js
  store/                      # auth + UI slices and auth thunks
```
