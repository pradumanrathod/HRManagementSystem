# HRMS (MERN)

This workspace contains:

- `client/` - Vite + React client
- `server/` - Express + Mongoose server

Quick start

1. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` to your MongoDB Atlas connection string.
2. From repo root run:

```bash
npm install
npm run dev
```

This will start the server (port 5000) and the client (Vite default port).

Client fetches `/api/hello` to verify the server. Replace/extend with your own routes and models.
