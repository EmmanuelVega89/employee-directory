# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Employee Directory — a React 19 + TypeScript app built with Vite 7, Redux Toolkit, and Tailwind CSS v4.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run mock` — Start JSON Server mock API on port 3001 (uses `db.json`)
- `npm run build` — TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## Architecture

**Feature-based structure** under `src/`:

- `features/` — Feature modules (slices, components, hooks per feature)
- `shared/components/` — Reusable UI components
- `store/store.ts` — Redux Toolkit store config; exports `RootState` and `AppDispatch` types
- `main.tsx` — Entry point; wraps App with Redux Provider and StrictMode

## Tech Stack & Patterns

- **State management:** Redux Toolkit with `configureStore`
- **Forms:** React Hook Form + Zod validation (via `@hookform/resolvers`)
- **Data tables:** TanStack React Table v8
- **Styling:** Tailwind CSS v4 (integrated as Vite plugin, imported via `@import "tailwindcss"` in `index.css`)
- **Mock API:** JSON Server serving `db.json` on port 3001 — contains employees and departments collections
- **TypeScript:** Strict mode enabled, project references (`tsconfig.app.json` for app, `tsconfig.node.json` for tooling)
- **ESLint:** v9 flat config with TypeScript, React Hooks, and React Refresh plugins

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch)
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Documentation

- Always use context7 to check up-to-date docs when implementing or modifying code that uses RTK Query, React Hook Form, Zod, TanStack Table, or any third-party library.

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development