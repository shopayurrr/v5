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
