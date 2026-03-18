<div align="center">
  <img src="./public/logos/logo.svg" alt="Nodebase Logo" width="180" />

  <h1>Nodebase</h1>

  <p>Open-source visual workflow automation platform — a self-hostable alternative to n8n.</p>

  <p>
    <a href="https://nodebase-rose.vercel.app">
      <img src="https://img.shields.io/badge/Live-nodebase--rose.vercel.app-16a34a?style=flat-square&logo=vercel&logoColor=white" alt="Live" />
    </a>
    <a href="https://github.com/ShakurUrRahman/nodebase">
      <img src="https://img.shields.io/badge/GitHub-ShakurUrRahman%2Fnodebase-181717?style=flat-square&logo=github" alt="GitHub" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-96.6%25-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel" alt="Vercel" />
  </p>

  <img src="./public/logos/logo.svg" alt="Nodebase preview" width="0" height="0" />
</div>

---

## Overview

Nodebase is a workflow automation SaaS that lets you build, execute, and monitor automated pipelines through a visual node-based interface. Create multi-step workflows, store encrypted credentials, track execution history, and integrate external services — all from a clean, fast web UI.

Built with a modern full-stack TypeScript architecture and deployed on Vercel with zero-config serverless scaling.

---

## Features

- **Visual Workflow Builder** — drag-and-drop node canvas to build automation pipelines
- **Multi-step Execution** — reliable background job processing via Inngest, decoupled from HTTP
- **Encrypted Credentials** — API keys and secrets encrypted at rest using Cryptr before being stored
- **Execution History** — full audit trail of every workflow run with status and output
- **Multi-provider Auth** — email/password, GitHub OAuth, and Google OAuth via better-auth
- **Subscription Billing** — Polar integration for plans, payments, and webhook events
- **End-to-end Type Safety** — tRPC across client and server
- **Error Monitoring** — Sentry on both server and edge runtimes

---

## Tech Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Language        | TypeScript              |
| Auth            | better-auth             |
| API             | tRPC v11                |
| Background Jobs | Inngest                 |
| Database        | Neon PostgreSQL         |
| ORM             | Prisma v6               |
| Payments        | Polar                   |
| Monitoring      | Sentry                  |
| Linter          | Biome                   |
| Deployment      | Vercel                  |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Accounts for: GitHub OAuth, Google OAuth, Inngest, Polar, Sentry

### Installation

```bash
# Clone the repository
git clone https://github.com/ShakurUrRahman/nodebase.git
cd nodebase

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Inngest locally

Inngest cannot reach localhost from the cloud, so run the dev server separately:

```bash
npx inngest-cli@latest dev
```

This starts the Inngest Dev Server at [http://localhost:8288](http://localhost:8288) and handles background job execution locally.

---

## Environment Variables

Create a `.env.local` file in the root of the project and populate the following:

```dotenv
# ── Database ──────────────────────────────────────────────────────────────────
# Neon PostgreSQL connection string (use the pooled URL for production)
# Append: ?sslmode=require&connect_timeout=30&pool_timeout=30
DATABASE_URL=

# ── Better Auth ───────────────────────────────────────────────────────────────
# Generate a strong random secret: openssl rand -base64 32
BETTER_AUTH_SECRET=
# Your app's public URL — must match deployment domain exactly
BETTER_AUTH_URL=

# ── GitHub OAuth ──────────────────────────────────────────────────────────────
# Create at: github.com → Settings → Developer Settings → OAuth Apps
# Callback URL: <BETTER_AUTH_URL>/api/auth/callback/github
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# ── Google OAuth ──────────────────────────────────────────────────────────────
# Create at: console.cloud.google.com → APIs & Services → Credentials
# Redirect URI: <BETTER_AUTH_URL>/api/auth/callback/google
GOOGLE_CLIENT_ID=

# ── Polar (Payments) ──────────────────────────────────────────────────────────
# Found at: polar.sh → Settings → Access Tokens
POLAR_ACCESS_TOKEN=
# Redirect URL after successful checkout
POLAR_SUCCESS_URL=

# ── App ───────────────────────────────────────────────────────────────────────
# Must be the full public URL of your deployment (same as BETTER_AUTH_URL)
NEXT_PUBLIC_APP_URL=

# ── Sentry (Error Monitoring) ─────────────────────────────────────────────────
# Found at: sentry.io → Settings → Auth Tokens
SENTRY_AUTH_TOKEN=

# ── Inngest (Background Jobs) ─────────────────────────────────────────────────
# Found at: app.inngest.com → Settings → Event Keys / Signing Key
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

---

## Project Structure

```
nodebase/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...all]/ # better-auth route handler
│   │   │   ├── inngest/       # Inngest serve endpoint
│   │   │   └── trpc/[trpc]/   # tRPC route handler
│   │   ├── (dashboard)/
│   │   │   ├── workflows/     # Workflow list + canvas
│   │   │   ├── credentials/   # Encrypted credential management
│   │   │   └── executions/    # Execution history + detail
│   │   └── (auth)/
│   │       ├── login/
│   │       └── signup/
│   ├── generated/prisma/      # Prisma client (custom output path)
│   ├── inngest/
│   │   ├── client.ts          # Inngest client
│   │   └── functions.ts       # Background job definitions
│   ├── lib/
│   │   ├── auth.ts            # better-auth server config
│   │   ├── auth-client.ts     # better-auth client config
│   │   └── db.ts              # Prisma client singleton
│   └── server/
│       └── routers/           # tRPC routers
├── public/
│   └── logos/
│       └── logo.svg
├── next.config.ts
├── prisma.config.ts
└── package.json
```

---

## Deployment

The project is deployed on Vercel. After deploying:

1. **Set all environment variables** in Vercel → Settings → Environment Variables
2. **Update GitHub OAuth callback URL** to `https://<your-domain>/api/auth/callback/github`
3. **Update Google OAuth redirect URI** to `https://<your-domain>/api/auth/callback/google`
4. **Sync Inngest** at app.inngest.com → Apps → Sync: `https://<your-domain>/api/inngest`
5. **Add Polar webhook** pointing to `https://<your-domain>/api/auth/polar/webhook`

### Build command

```bash
prisma generate && next build
```

---

## Scripts

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Generate Prisma client + production build
npm run start      # Start production server
npm run lint       # Run Biome linter
```

---

## License

MIT © [Shakur Ur Rahman](https://github.com/ShakurUrRahman)
