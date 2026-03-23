const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "..", "data", "app.db"));
db.exec(`CREATE TABLE IF NOT EXISTS kol_api_cache (
  handle TEXT PRIMARY KEY,
  followers INTEGER DEFAULT 0,
  display_name TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  twitter_uid TEXT DEFAULT '',
  raw_json TEXT DEFAULT '{}',
  fetched_at TEXT DEFAULT CURRENT_TIMESTAMP
)`);
console.log("kol_api_cache ready");
db.close();
