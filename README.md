# Sprint Planner (Local-Only, React + Vite)

Single-user sprint planning and daily tracking app. No backend, no auth. All data is stored in the browser via localStorage.

Tech stack:

- React 18 + Vite
- React Router v6
- MUI v5 (custom dark theme)
- Recharts (dashboard charts)
- Drag & Drop: @hello-pangea/dnd (Sprint Setup Kanban)
- localStorage persistence

## Quick start

```powershell
# install deps
npm install

# run dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

Open http://localhost:5173 after running the dev server.

## Core features

- Floating bottom Navbar (responsive, centered)
- Pages
	- Dashboard: progress ring, planned vs. actual hours bar chart, Kanban (read-only), productivity line
	- Sprint Setup: create sprint, goals with hours/priority, drag-and-drop Kanban columns; saves to localStorage
	- Daily Update: mark goal done, enter hours/remarks, pick up to 3 focus items, write a daily plan; saves by date
	- Sprint Review: set status and actual hours per goal, add reflections, rate sprint, archive to history
	- History: list of past sprints with basic stats
- Global Toasts: non-intrusive alerts at bottom-right
- Premium dark theme with a small styling helper (folder-per-component with `style.js`)

## How to use

1) If no active sprint:
	 - Dashboard shows “New Sprint”. Click to open Sprint Setup.
	 - Enter name, start date, duration, and goals. Drag items between To Do / In Progress / Done. Save/Start.

2) With an active sprint:
	 - Dashboard shows “Daily Check-in” and “Review”.
	 - Daily Update: check goals done, log hours, set focus (max 3), add remarks/plan, then Save.
	 - Review: at sprint end, set final status and actual hours, write reflections, give a rating, and “Complete Sprint” (archives & clears current sprint).

3) History:
	 - View archived sprints and summary metrics.

## Data model (localStorage)

- `currentSprint`: current active sprint
	- `{ name, start, days, goals: [{ id, title, hours, priority }], order: { todo: string[], inprogress: string[], done: string[] } }`
- `dailyUpdates`: map of date (YYYY-MM-DD) to daily check-in
	- `{ [date]: { date, sprintName, sprintDay, plan, perGoal: { [goalId]: { done, hours, note, focus } } } }`
- `sprintHistory`: array of completed sprint reviews
	- `[{ date, name, goals: [{ id, title, estHours, actualHours, status }], reflections: { wentWell, challenging, different }, rating }]`

Notes:
- Single-user, local-only. Clearing site data will erase all info.
- Dates use the native `<input type="date">` for broad compatibility.

## Project structure (high level)

- `src/main.jsx` – Router + MUI theme + Toast provider
- `src/App/` – Layout shell and Navbar placement
- `src/components/` – UI primitives, charts, and Navbar
- `src/pages/` – Dashboard, Sprint Setup, Daily Update, Sprint Review, History
- `src/styles/` – styling helper and design tokens

## Troubleshooting

- If you see a runtime error like “createTheme_default is not a function”, ensure theme imports come from `@mui/material/styles` and `CssBaseline` from `@mui/material/CssBaseline` (already configured in `src/main.jsx`).
- Vite HMR may fully reload after editing the Toast provider (expected due to hook export). Functionality is unaffected.

## License

Private educational project. Adjust as needed for your use.
