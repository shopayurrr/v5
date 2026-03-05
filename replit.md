# Project PRD: Wells Fargo Clone

## Overview
The Wells Fargo Clone is a full-stack banking simulation designed to replicate the core experience of online banking. It features a secure user interface for account management and a robust administrative panel for data manipulation.

## Core Features
### 1. Authentication System
- **User Login**: Standard banking sign-on for customers.
- **Admin Login**: Secure portal for administrators with fixed credentials.
- **Session Management**: Persistent sessions with automatic redirection to a sign-out page upon logout.
- **Fixed Admin Access**:
  - **Username**: OPPATHEBEAR
  - **Password**: 55Fp4MUtd22MRFr

### 2. Banking Dashboard (Customer)
- **Account Summary**: View multiple accounts (Checking, Savings, Brokerage) with real-time balances.
- **Profile Management**: View personal information, address, and contact details.
- **Standalone Pages**: Integrated legacy HTML pages for various banking functions (Transfer & Pay, Security, etc.).

### 3. Administrative Panel
- **User Management**: 
  - List all registered users.
  - Edit user profiles (Names, Email, Address, DOB).
  - Manage administrative privileges.
- **Account Control**:
  - View all accounts associated with a user.
  - Real-time balance adjustment (indepth editing capability).
  - Direct manipulation of financial data for simulation purposes.

## Technical Architecture
### Frontend
- **Framework**: React 18 (TypeScript)
- **Styling**: Tailwind CSS + Shadcn UI
- **Routing**: Wouter
- **Data Fetching**: TanStack Query (React Query)

### Backend
- **Server**: Express.js (Node.js)
- **Auth**: express-session with PostgreSQL store
- **Validation**: Zod (shared schemas)
- **Static Assets**: Serving legacy `.html` pages alongside the React application.

### Database
- **Provider**: PostgreSQL (managed via Replit)
- **ORM**: Drizzle ORM
- **Storage Layer**: Interface-based storage pattern for easy extension.

## Deployment & Configuration
- **Port**: 5000 (standard for Replit web applications)
- **Environment**: Optimized for Replit with automatic database provisioning and schema syncing.
- **Production**: Configured for autoscale deployment.

## Future Enhancements
- Transaction history simulation.
- Real-time notifications for balance changes.
- Multi-factor authentication simulation.

# Wells Fargo Clone

A full-stack banking web application that simulates a Wells Fargo online banking interface.

## Architecture

- **Frontend**: React 18 with TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js with TypeScript, served via `tsx` in development
- **Database**: PostgreSQL via Replit's built-in database, accessed with Drizzle ORM
- **Sessions**: PostgreSQL-backed sessions via `connect-pg-simple`
- **Routing**: Wouter for client-side routing
- **State**: TanStack React Query for server state

## Project Structure

```
client/          React frontend (Vite)
server/          Express backend
  index.ts       Entry point, session middleware
  routes.ts      API routes + static file serving
  storage.ts     DatabaseStorage class (Drizzle ORM)
  db.ts          Drizzle/pg pool setup
  vite.ts        Vite dev middleware setup
shared/
  schema.ts      Drizzle/Zod schemas and types
public/          Static HTML pages
```

## Running

- Development: `npm run dev` — starts Express on port 5000, serves React via Vite middleware
- Build: `npm run build` — builds client to `dist/public`, bundles server to `dist/index.js`
- Production: `npm start` — runs built server
- Schema: `npm run db:push` — push schema changes to the database

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (set by Replit)

## Deployment

Configured for autoscale deployment with:
- Build: `npm run build`
- Run: `node dist/index.js`
