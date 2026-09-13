import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const rawUrl = process.env.DATABASE_URL?.trim() ?? "";

let cleanUrl = "";
let isLocal = true;

if (rawUrl) {
  try {
    const dbUrl = new URL(rawUrl);
    dbUrl.searchParams.delete("channel_binding");
    cleanUrl = dbUrl.toString();
    isLocal = rawUrl.includes("localhost") || rawUrl.includes("127.0.0.1");
  } catch (err) {
    console.warn("[DB] Warning: Malformed DATABASE_URL:", err.message);
  }
} else {
  console.warn("[DB] Notice: DATABASE_URL is not set. Cache will operate with graceful live fallback.");
}

const pool = new Pool(
  cleanUrl
    ? {
        connectionString: cleanUrl,
        ssl: isLocal ? false : { rejectUnauthorized: false },
      }
    : {}
);

pool.on("error", (err) => {
  console.error("[DB] Unexpected client error:", err.message);
});

export default pool;
