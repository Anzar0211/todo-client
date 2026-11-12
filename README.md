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
