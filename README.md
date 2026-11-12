# Todo Client

React frontend for the todo app. Built with Vite, Tailwind CSS, Redux Toolkit, and React Router.

In development, API requests to `/api` are proxied to the local server (see `vite.config.js` and `VITE_DEV_PROXY_TARGET`). Run the [server](../server) alongside the client.

## Setup

```bash
npm install
cp .env.development.example .env.development
cp .env.production.example .env.production
```

Edit `.env.production` and set `VITE_API_URL` to your deployed API before building.

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for API calls (default `/api`) |
| `VITE_DEV_PROXY_TARGET` | Dev-only proxy target for `/api` (default `http://localhost:5000`) |

Files:

- `.env.development` — used by `npm run dev`
- `.env.production` — used by `npm run build` / `npm run preview`
- `*.example` — tracked templates (copy and fill in)

## Run

```bash
npm run dev      # development (Vite, `.env.development`)
npm run build    # production build (`.env.production`)
npm run preview  # preview production build
```

App listens on `http://localhost:5173` by default.

## Features

- **Onboarding** — Welcome screen at `/welcome` with a Get Started CTA; completion is stored in `localStorage`.
- **Authentication** — Login and register forms at `/login` and `/register`, JWT stored in `localStorage`, and session restore via `/api/auth/me`.
- **Home dashboard** — Protected app shell with week strip, completion stats, and the day's task list (toggle complete / delete / open for edit).
- **Task sheet** — Bottom/centered sheet to create or edit tasks (title, date, start/end time, description).
- **Search** — `/search` with a debounced query in the nav bar; filters tasks by title and description.

## Routes

| Path | Auth | Screen |
|------|------|--------|
| `/welcome` | No | Onboarding |
| `/login` | No | Sign in |
| `/register` | No | Create account |
| `/` | Yes | Home (week view) |
| `/search` | Yes | Task search |

## Project structure

```
src/
  api/           # HTTP client, auth + task APIs, token storage
  components/    # Screens and UI (Onboarding, AuthForm, Home, Search, sheets, nav)
  hooks/         # useAuth, useTasks, useUi, useDebouncedValue
  services/      # date, week, task form, and search helpers
  storage/       # onboarding localStorage
  store/         # Redux slices (auth, tasks, ui) and async thunks
  App.jsx        # Router and protected routes
  main.jsx       # Redux Provider entry
```
