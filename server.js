const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Database = require("better-sqlite3");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);
const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const DB_PATH = path.join(DATA_DIR, "app.db");

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

const CHAIN_CONFIG = {
  ethereum: {
    rpc: process.env.ETH_RPC_URL || "",
    usdt: (process.env.ETH_USDT || "0xdAC17F958D2ee523a2206206994597C13D831ec7").toLowerCase()
  },
  arbitrum: {
    rpc: process.env.ARB_RPC_URL || "",
    usdt: (process.env.ARB_USDT || "0xFd086bC7CD5C481DCC9C85ebe478A1C0b69FCbb9").toLowerCase()
  },
  bsc: {
    rpc: process.env.BSC_RPC_URL || "",
    usdt: (process.env.BSC_USDT || "0x55d398326f99059fF775485246999027B3197955").toLowerCase()
  }
};

const TREASURY_WALLET = (process.env.TREASURY_WALLET || "").toLowerCase();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync(process.env.ADMIN_PASSWORD || "admin123", 10);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const safeName = `${Date.now()}-${Math.random().toString(16).slice(2)}-${file.originalname}`.replace(
        /\s+/g,
        "_"
      );
      cb(null, safeName);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));
app.use(express.static(__dirname));

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      wallet TEXT PRIMARY KEY,
      vote_count INTEGER DEFAULT 0,
      reputation_weight REAL DEFAULT 1.0,
      is_blacklisted INTEGER DEFAULT 0,
      last_vote_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS kols (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      handle TEXT UNIQUE NOT NULL,
      twitter_uid TEXT,
      avatar_url TEXT DEFAULT '',
      followers INTEGER DEFAULT 0,
      tags TEXT DEFAULT '',
      intro TEXT DEFAULT '',
      is_lead_trade INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      avg_score REAL DEFAULT 0,
      vote_count INTEGER DEFAULT 0,
      risk_index REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wallet TEXT NOT NULL,
      chain TEXT NOT NULL,
      tx_hash TEXT UNIQUE NOT NULL,
      amount_usdt REAL DEFAULT 0,
      verified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wallet TEXT NOT NULL,
      kol_id INTEGER NOT NULL,
      biz INTEGER NOT NULL,
      research INTEGER NOT NULL,
      ethics INTEGER NOT NULL,
      reputation INTEGER NOT NULL,
      safety INTEGER NOT NULL,
      comment TEXT DEFAULT '',
      total_score REAL NOT NULL,
      weight REAL NOT NULL DEFAULT 1.0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(wallet, kol_id)
    );

    CREATE TABLE IF NOT EXISTS vote_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vote_id INTEGER NOT NULL,
      wallet TEXT NOT NULL,
      kol_id INTEGER NOT NULL,
      biz INTEGER NOT NULL,
      research INTEGER NOT NULL,
      ethics INTEGER NOT NULL,
      reputation INTEGER NOT NULL,
      safety INTEGER NOT NULL,
      comment TEXT DEFAULT '',
      total_score REAL NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS exposes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      twitter_id TEXT NOT NULL,
      event_text TEXT NOT NULL,
      credibility TEXT NOT NULL,
      evidence_json TEXT DEFAULT '[]',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS kol_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      twitter_link TEXT NOT NULL,
      intro TEXT DEFAULT '',
      tag TEXT DEFAULT '',
      is_lead_trade INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pending',
      review_note TEXT DEFAULT '',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      reviewed_at TEXT
    );
  `);
  try {
    db.exec("ALTER TABLE kols ADD COLUMN avatar_url TEXT DEFAULT ''");
  } catch (_e) {
    // column may already exist
  }
}

function seedKols() {
  const seedPath = path.join(__dirname, "kol-seed.json");
  if (!fs.existsSync(seedPath)) return;
  const rows = JSON.parse(fs.readFileSync(seedPath, "utf8"));
  const insert = db.prepare(
    "INSERT OR IGNORE INTO kols (handle, twitter_uid, followers, tags, intro, is_lead_trade) VALUES (@handle, @uid, @followers, @tags, @intro, 0)"
  );
  const updateFollowers = db.prepare("UPDATE kols SET followers = ? WHERE handle = ?");
  const tx = db.transaction((items) => {
    items.forEach((i) => {
      const followers = Number(i.followers) || 0;
      insert.run({ ...i, followers });
      if (followers > 0) updateFollowers.run(followers, i.handle);
    });
  });
  tx(rows);
}

function authAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (_e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function getUserWeight(voteCount) {
  if (voteCount >= 20) return 1.5;
  if (voteCount >= 5) return 1.2;
  return 1.0;
}

function computeRiskIndex(kolId) {
  const stat = db
    .prepare("SELECT AVG(safety) AS safety_avg, AVG(ethics) AS ethics_avg, COUNT(*) AS c FROM votes WHERE kol_id = ?")
    .get(kolId);
  const exposeCount = db
    .prepare("SELECT COUNT(*) AS c FROM exposes WHERE lower(twitter_id) LIKE '%' || lower((SELECT twitter_uid FROM kols WHERE id = ?)) || '%'")
    .get(kolId).c;
  const safetyPenalty = (6 - (stat.safety_avg || 3)) * 0.6;
  const ethicsPenalty = (6 - (stat.ethics_avg || 3)) * 0.3;
  const exposePenalty = Math.min(exposeCount, 10) * 0.2;
  return Number((safetyPenalty + ethicsPenalty + exposePenalty).toFixed(2));
}

function refreshKolStats(kolId) {
  const agg = db
    .prepare("SELECT SUM(total_score * weight) AS ws, SUM(weight) AS w, COUNT(*) AS c FROM votes WHERE kol_id = ?")
    .get(kolId);
  const avg = agg.w > 0 ? Number((agg.ws / agg.w).toFixed(2)) : 0;
  const risk = computeRiskIndex(kolId);
  db.prepare("UPDATE kols SET avg_score = ?, vote_count = ?, risk_index = ? WHERE id = ?").run(avg, agg.c || 0, risk, kolId);
}

async function verifyDonationTx({ wallet, chain, txHash }) {
  const config = CHAIN_CONFIG[chain];
  if (!config || !config.rpc || !config.usdt || !TREASURY_WALLET) {
    throw new Error("Donation verification config missing");
  }
  const provider = new ethers.JsonRpcProvider(config.rpc);
  const receipt = await provider.getTransactionReceipt(txHash);
  if (!receipt || receipt.status !== 1) throw new Error("Transaction not found or failed");
  const iface = new ethers.Interface(["event Transfer(address indexed from,address indexed to,uint256 value)"]);
  let amount = 0;
  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== config.usdt) continue;
    try {
      const parsed = iface.parseLog(log);
      const from = String(parsed.args.from).toLowerCase();
      const to = String(parsed.args.to).toLowerCase();
      if (from === wallet.toLowerCase() && to === TREASURY_WALLET) {
        amount += Number(parsed.args.value) / 1e6;
      }
    } catch (_e) {
      // ignore unrelated logs
    }
  }
  if (amount < 1) throw new Error("USDT transfer to treasury below 1U");
  return Number(amount.toFixed(4));
}

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const RAPIDAPI_TWITTER_HOST = process.env.RAPIDAPI_TWITTER_HOST || "twittr-v2-fastest-twitter-x-api-150k-requests-for-15.p.rapidapi.com";

async function syncTwitterFollowers() {
  if (!RAPIDAPI_KEY) return;
  const kols = db.prepare("SELECT id, handle FROM kols").all();
  const updateFollowers = db.prepare("UPDATE kols SET followers = ? WHERE id = ?");
  const updateAvatar = db.prepare("UPDATE kols SET avatar_url = ? WHERE id = ?");
  for (const kol of kols) {
    try {
      const res = await fetch(
        `https://${RAPIDAPI_TWITTER_HOST}/user/by/username/${encodeURIComponent(kol.handle)}`,
        {
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_TWITTER_HOST
          }
        }
      );
      const data = await res.json();
      const u = data?.data?.user?.result;
      const count =
        u?.legacy?.followers_count ??
        data?.data?.public_metrics?.followers_count ??
        data?.data?.followers_count ??
        data?.followers_count;
      const avatar =
        u?.avatar?.image_url ||
        u?.legacy?.profile_image_url_https ||
        "";
      const avatarUrl = avatar ? String(avatar).replace("_normal", "_400x400") : "";
      if (Number(count) > 0) updateFollowers.run(Number(count), kol.id);
      if (avatarUrl) updateAvatar.run(avatarUrl, kol.id);
    } catch (e) {
      // skip on error
    }
    await new Promise((r) => setTimeout(r, 300));
  }
}

initDb();
seedKols();
if (RAPIDAPI_KEY) setTimeout(() => syncTwitterFollowers().catch(() => {}), 3000);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/avatar/:handle", async (req, res) => {
  const handle = req.params.handle;
  const kol = db.prepare("SELECT avatar_url FROM kols WHERE handle = ?").get(handle);
  let imageUrl = kol?.avatar_url;
  if (!imageUrl && RAPIDAPI_KEY) {
    try {
      const r = await fetch(
        `https://${RAPIDAPI_TWITTER_HOST}/user/by/username/${encodeURIComponent(handle)}`,
        { headers: { "x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_TWITTER_HOST } }
      );
      const d = await r.json();
      const av = d?.data?.user?.result?.avatar?.image_url || d?.data?.user?.result?.legacy?.profile_image_url_https;
      imageUrl = av ? String(av).replace("_normal", "_400x400") : "";
      if (imageUrl) {
        db.prepare("UPDATE kols SET avatar_url = ? WHERE handle = ?").run(imageUrl, handle);
      }
    } catch (_e) {}
  }
  if (!imageUrl) {
    return res.redirect(302, `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(handle)}`);
  }
  try {
    const imgRes = await fetch(imageUrl);
    const buf = await imgRes.arrayBuffer();
    res.set("Cache-Control", "public, max-age=86400");
    res.set("Content-Type", imgRes.headers.get("content-type") || "image/jpeg");
    res.send(Buffer.from(buf));
  } catch (e) {
    res.redirect(302, `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(handle)}`);
  }
});

app.get("/api/kols", (req, res) => {
  const rank = req.query.rank || "top";
  const q = (req.query.q || "").toString().trim().toLowerCase();
  const qLike = `%${q}%`;
  const base = `
    SELECT id, handle, twitter_uid, avatar_url, followers, tags, intro, is_lead_trade, avg_score, vote_count, risk_index, created_at
    FROM kols
    WHERE (lower(handle) LIKE ? OR lower(twitter_uid) LIKE ?)
  `;
  let orderBy = "ORDER BY avg_score DESC, vote_count DESC";
  if (rank === "black") orderBy = "ORDER BY risk_index DESC, avg_score ASC";
  if (rank === "new") orderBy = "ORDER BY datetime(created_at) DESC";
  if (rank === "all") orderBy = "ORDER BY datetime(created_at) DESC";
  let rows = db.prepare(`${base} ${orderBy}`).all(qLike, qLike);
  const pinned = rows.find((r) => r.handle === "xlink_lab");
  if (pinned) {
    rows = [pinned, ...rows.filter((r) => r.handle !== "xlink_lab")];
  }
  res.json(rows);
});

app.post("/api/donations/verify", async (req, res) => {
  try {
    const { wallet, chain, txHash } = req.body || {};
    if (!wallet || !chain || !txHash) return res.status(400).json({ error: "wallet, chain, txHash are required" });
    const existed = db.prepare("SELECT * FROM donations WHERE tx_hash = ?").get(txHash);
    if (existed?.verified) return res.json({ ok: true, reused: true, amount: existed.amount_usdt });
    const amount = await verifyDonationTx({ wallet, chain, txHash });
    db.prepare("INSERT OR REPLACE INTO donations (wallet, chain, tx_hash, amount_usdt, verified) VALUES (?, ?, ?, ?, 1)").run(
      wallet.toLowerCase(),
      chain,
      txHash,
      amount
    );
    res.json({ ok: true, amount });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/users/:wallet/eligibility", (req, res) => {
  const wallet = req.params.wallet.toLowerCase();
  const donation = db
    .prepare("SELECT id, amount_usdt, created_at FROM donations WHERE wallet = ? AND verified = 1 ORDER BY id DESC LIMIT 1")
    .get(wallet);
  const user = db.prepare("SELECT * FROM users WHERE wallet = ?").get(wallet);
  res.json({
    wallet,
    donated: Boolean(donation),
    donation: donation || null,
    blacklisted: Boolean(user?.is_blacklisted)
  });
});

app.post("/api/votes", (req, res) => {
  const { wallet, kolHandle, comment = "", scores = {} } = req.body || {};
  if (!wallet || !kolHandle) return res.status(400).json({ error: "wallet and kolHandle are required" });
  const walletLc = wallet.toLowerCase();
  const kol = db.prepare("SELECT * FROM kols WHERE handle = ?").get(kolHandle);
  if (!kol) return res.status(404).json({ error: "KOL not found" });
  const donation = db.prepare("SELECT id FROM donations WHERE wallet = ? AND verified = 1 LIMIT 1").get(walletLc);
  if (!donation) return res.status(403).json({ error: "Need verified 1U donation first" });

  const biz = Number(scores.biz ?? scores.trust);
  const research = Number(scores.research ?? scores.alpha);
  const ethics = Number(scores.ethics ?? scores.winRate);
  const reputation = Number(scores.reputation ?? scores.trust ?? 3);
  const safety = Number(scores.safety ?? scores.risk);
  const arr = [biz, research, ethics, reputation, safety];
  if (arr.some((n) => Number.isNaN(n) || n < 1 || n > 5)) {
    return res.status(400).json({ error: "scores must be 1..5" });
  }
  if (arr.every((n) => n === 1) || arr.every((n) => n === 5)) {
    return res.status(400).json({ error: "all 1-star/all 5-star are blocked" });
  }

  const user = db.prepare("SELECT * FROM users WHERE wallet = ?").get(walletLc);
  if (user?.is_blacklisted) return res.status(403).json({ error: "wallet is blacklisted" });
  const now = new Date().toISOString();
  if (user?.last_vote_at && Date.now() - new Date(user.last_vote_at).getTime() < 15000) {
    return res.status(429).json({ error: "voting too frequently, slow down" });
  }

  const voteCount = user?.vote_count || 0;
  const weight = getUserWeight(voteCount);
  const totalScore = Number((arr.reduce((a, b) => a + b, 0) * 0.2).toFixed(2));

  db.prepare(
    "INSERT OR IGNORE INTO users (wallet, vote_count, reputation_weight, last_vote_at) VALUES (?, 0, ?, ?)"
  ).run(walletLc, weight, now);

  const existing = db.prepare("SELECT * FROM votes WHERE wallet = ? AND kol_id = ?").get(walletLc, kol.id);
  if (existing) {
    db.prepare(
      "INSERT INTO vote_history (vote_id, wallet, kol_id, biz, research, ethics, reputation, safety, comment, total_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(existing.id, walletLc, kol.id, existing.biz, existing.research, existing.ethics, existing.reputation, existing.safety, existing.comment, existing.total_score);

    db.prepare(
      "UPDATE votes SET biz = ?, research = ?, ethics = ?, reputation = ?, safety = ?, comment = ?, total_score = ?, weight = ?, updated_at = ? WHERE id = ?"
    ).run(biz, research, ethics, reputation, safety, comment, totalScore, weight, now, existing.id);
  } else {
    db.prepare(
      "INSERT INTO votes (wallet, kol_id, biz, research, ethics, reputation, safety, comment, total_score, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(walletLc, kol.id, biz, research, ethics, reputation, safety, comment, totalScore, weight);

    const newCount = voteCount + 1;
    db.prepare("UPDATE users SET vote_count = ?, reputation_weight = ?, last_vote_at = ? WHERE wallet = ?").run(
      newCount,
      getUserWeight(newCount),
      now,
      walletLc
    );
  }

  refreshKolStats(kol.id);
  res.json({ ok: true, totalScore });
});

app.post("/api/exposes", upload.array("evidence", 6), (req, res) => {
  const { twitterId, event, credibility } = req.body || {};
  if (!twitterId || !event || !credibility) return res.status(400).json({ error: "twitterId, event, credibility are required" });
  const files = (req.files || []).map((f) => `/uploads/${f.filename}`);
  db.prepare("INSERT INTO exposes (twitter_id, event_text, credibility, evidence_json) VALUES (?, ?, ?, ?)").run(
    twitterId,
    event,
    credibility,
    JSON.stringify(files)
  );
  res.json({ ok: true, files });
});

app.get("/api/exposes", (_req, res) => {
  const rows = db
    .prepare("SELECT id, twitter_id, event_text, credibility, evidence_json, created_at FROM exposes ORDER BY id DESC LIMIT 100")
    .all()
    .map((r) => ({ ...r, evidence: JSON.parse(r.evidence_json || "[]") }));
  res.json(rows);
});

app.post("/api/kol-submissions", (req, res) => {
  const { twitterLink, intro, tag, isLeadTrade } = req.body || {};
  if (!twitterLink) return res.status(400).json({ error: "twitterLink is required" });
  db.prepare(
    "INSERT INTO kol_submissions (twitter_link, intro, tag, is_lead_trade, status) VALUES (?, ?, ?, ?, 'pending')"
  ).run(twitterLink, intro || "", tag || "", isLeadTrade ? 1 : 0);
  res.json({ ok: true });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username !== ADMIN_USER || !bcrypt.compareSync(password || "", ADMIN_PASSWORD_HASH)) {
    return res.status(401).json({ error: "invalid credentials" });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "8h" });
  return res.json({ token });
});

app.get("/api/admin/submissions", authAdmin, (_req, res) => {
  const rows = db.prepare("SELECT * FROM kol_submissions ORDER BY id DESC").all();
  res.json(rows);
});

app.post("/api/admin/submissions/:id/review", authAdmin, (req, res) => {
  const id = Number(req.params.id);
  const { action, note = "" } = req.body || {};
  const row = db.prepare("SELECT * FROM kol_submissions WHERE id = ?").get(id);
  if (!row) return res.status(404).json({ error: "submission not found" });
  if (!["approve", "reject"].includes(action)) return res.status(400).json({ error: "action must be approve/reject" });

  if (action === "approve") {
    const handle = row.twitter_link.split("/").pop()?.replace("@", "") || `kol_${id}`;
    db.prepare(
      "INSERT OR IGNORE INTO kols (handle, twitter_uid, tags, intro, is_lead_trade) VALUES (?, ?, ?, ?, ?)"
    ).run(handle, `@${handle}`, row.tag || "", row.intro || "", row.is_lead_trade || 0);
  }
  db.prepare("UPDATE kol_submissions SET status = ?, review_note = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?").run(
    action,
    note,
    id
  );
  res.json({ ok: true });
});

app.post("/api/admin/sync-followers", authAdmin, async (_req, res) => {
  if (!RAPIDAPI_KEY) return res.status(400).json({ error: "RAPIDAPI_KEY not configured" });
  try {
    await syncTwitterFollowers();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/blacklist", authAdmin, (req, res) => {
  const { wallet, blocked } = req.body || {};
  if (!wallet) return res.status(400).json({ error: "wallet required" });
  const lc = wallet.toLowerCase();
  db.prepare("INSERT OR IGNORE INTO users (wallet, vote_count, reputation_weight) VALUES (?, 0, 1.0)").run(lc);
  db.prepare("UPDATE users SET is_blacklisted = ? WHERE wallet = ?").run(blocked ? 1 : 0, lc);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API + Web running on http://localhost:${PORT}`);
});
