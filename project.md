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
