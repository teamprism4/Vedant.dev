import "dotenv/config";
import express from "express";
import cors from "cors";
import statsRouter from "./routes/stats.js";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/+$/, "");

const staticAllowedOrigins = new Set([
  "http://localhost:3000",
  "http://localhost:3001",
  "https://vedant-dev-nine.vercel.app",
  FRONTEND_URL,
].filter(Boolean));

function isOriginAllowed(origin) {
  if (!origin) return true;
  const normalized = origin.replace(/\/+$/, "");
  if (staticAllowedOrigins.has(normalized)) return true;
  // Allow Vercel preview and production subdomains
  if (/^https:\/\/([a-zA-Z0-9_-]+\.)?vercel\.app$/.test(normalized)) return true;
  return false;
}

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (curl, Postman, server-to-server)
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/stats", statsRouter);
app.use("/api/contact", contactRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  vedant.dev backend running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Stats:  http://localhost:${PORT}/api/stats/all\n`);
});
