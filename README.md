# GoTicket

A full-stack QR-based public transport ticketing platform built as a monorepo. Passengers book rides and get QR tickets instantly. Drivers scan QR codes to validate them.

**Live:** [go-ticket-web.vercel.app](https://go-ticket-web.vercel.app) · **API:** [go-ticket.up.railway.app](https://go-ticket.up.railway.app)

---

## Features

- **Dual roles** — Passenger and Driver with separate dashboards
- **Ticket booking** — Bus (AC/Non-AC), Cab, Bike with dynamic pricing
- **QR tickets** — generated instantly after booking
- **QR scanner** — drivers scan to verify tickets
- **Live map** — Leaflet with geolocation and OSM autocomplete
- **Ride stats** — total rides, distance, spend with time filters
- **Profile picture** — upload or paste URL
- **Dark mode** — system-aware theme toggle

---

## Test Credentials

All accounts use password: `password123`

| Role | Email |
|------|-------|
| Passenger | aryan@goticket.com |
| Passenger | priya@goticket.com |
| Passenger | rahul@goticket.com |
| Driver | suresh@goticket.com |
| Driver | vikram@goticket.com |
| Driver | neha@goticket.com |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15, React 19, TypeScript |
| UI | Material UI 7, Emotion |
| Maps | React Leaflet, OpenStreetMap |
| QR | react-qr-code, @yudiel/react-qr-scanner |
| Backend | Hono, Node.js |
| Database | PostgreSQL (Neon) via Prisma |
| Auth | bcrypt |
| Monorepo | npm workspaces + Turborepo |
| Frontend Deploy | Vercel |
| Backend Deploy | Railway |

---

## Monorepo Structure

```
Go-Ticket/
├── apps/
│   ├── web/          # Next.js frontend → Vercel
│   └── api/          # Hono API → Railway
├── packages/
│   └── types/        # Shared TypeScript types
├── turbo.json
└── package.json
```

---

## Local Development

### Prerequisites
- Node.js 20+
- A [Neon](https://neon.tech) PostgreSQL database

### Setup

```bash
git clone https://github.com/l9vanya/Go-Ticket.git
cd Go-Ticket
npm install
```

**`apps/api/.env`**
```env
DATABASE_URL=your_neon_connection_string
PORT=8787
CORS_ORIGIN=http://localhost:3000
API_URL=http://localhost:8787
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### Push schema & seed

```bash
npm run db:push
cd apps/api && npm run db:seed
```

### Run everything

```bash
npm run dev
```

- Frontend → http://localhost:3000
- API → http://localhost:8787

---

## Deployment

### Vercel (Frontend)
1. Import repo → set **Root Directory** to `apps/web`
2. Add env var: `NEXT_PUBLIC_API_URL=https://your-api.railway.app`

### Railway (Backend)
1. Import repo → set **Root Directory** to `apps/api`
2. Set env vars: `DATABASE_URL`, `PORT`, `CORS_ORIGIN`, `API_URL`
3. Build Command: `npm install && npx prisma generate --schema=apps/api/prisma/schema.prisma && cd apps/api && npx tsc`
4. Start Command: `node apps/api/dist/index.js`

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| PUT | `/api/auth/:id` | Update profile |
| POST | `/api/tickets` | Book ticket |
| GET | `/api/tickets/:userId` | Get user tickets |
| DELETE | `/api/tickets/:id` | Cancel ticket |
| POST | `/api/upload` | Upload profile picture |
| GET | `/health` | Health check |

---

## License

MIT
