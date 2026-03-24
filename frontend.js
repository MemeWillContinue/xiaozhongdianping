const API_BASE = "/api";

const state = {
  lang: "zh",
  theme: "day",
  currentRank: "top",
  wallet: null,
  kols: [],
  exposes: []
};

const i18n = {
  zh: {
    brandName: "小众点评",
    pageTitle: "小众点评 - 链上真实投票的KOL照妖镜",
    searchPlaceholder: "搜索KOL名称或推特ID",
    tabTop: "粉丝榜",
    tabBlack: "低分榜",
    tabNew: "高分榜",
    voteSystemTitle: "投票系统（1U门槛）",
    voteSystemDesc: "捐赠1 USDT后解锁1次投票权。投票属于用户观点，平台不做官方定性。",
    walletAddress: "钱包地址",
    walletPlaceholder: "0x...",
    targetKOL: "目标KOL",
    dimTrust: "可信度",
    dimInfoValue: "信息价值",
    dimWinRate: "胜率",
    dimSafety: "安全可靠",
    submitScore: "提交评分（Hash存证示意）",
    donateTitle: "捐赠与权益",
    donateRights1U: "解锁基础投票权（永久）",
    donateRights10U: "预留：高级评论权",
    donateRights50U: "预留：举报权 / 仲裁权",
    donateWallet: "钱包",
    donateChain: "链",
    donateVerify: "验证1U捐赠",
    donateSupport: "支持USDT链路：ERC20 / Arbitrum / BSC，验证成功后才能真实投票。",
    submitTitle: "KOL提交系统（UGC）",
    submitTwitter: "推特链接",
    submitIntro: "简介",
    submitIntroPlaceholder: "写一下该KOL风格",
    submitTag: "标签",
    tagContract: "合约",
    tagLead: "带单",
    tagProject: "项目方",
    submitLeadTrade: "是否带单",
    submitQueue: "提交到审核队列",
    commentTitle: "评论 & 爆料系统",
    commentPerson: "人物（推特ID）",
    commentEvent: "事件",
    commentEventPlaceholder: "描述事件经过、时间线和争议点",
    commentEvidence: "证据（图片/视频/文件）",
    commentCredibility: "可信度",
    credibilityTrust: "完全可信",
    credibilityDoubt: "存疑",
    credibilityFalse: "不可信",
    credibilityPending: "待审核",
    submitExpose: "提交爆料",
    noticeTitle: "说明",
    repTitle: "信誉系统",
    repNew: "新用户",
    repVoted: "已投票用户",
    repHigh: "高信誉用户",
    repWeight: "评分权重随信誉等级提升，降低女巫攻击影响。",
    riskModelTitle: "风险评分模型",
    riskFormula: "风险指数 = (低可信评分 × 权重) + (爆料数量 × 权重) + (Rug记录 × 权重) - (历史命中率 × 权重)",
    riskSafe: "安全",
    riskMid: "中风险",
    riskHigh: "高风险",
    antiCheatTitle: "反作弊系统",
    antiCheat1: "地址唯一投票限制",
    antiCheat2: "短时间高频行为预警",
    antiCheat3: "黑名单地址拦截",
    antiCheat4: "多签地址识别（预留）",
    riskTipTitle: "风险提示",
    riskTip1: "所有评分、评论与爆料均为用户观点，不构成投资建议。",
    riskTip2: "平台不对KOL进行官方定性，不鼓励网暴与诽谤。",
    riskTip3: "恶意提交与伪造证据将被封禁并进入黑名单。",
    modalVoteTitle: "KOL投票",
    modalClose: "关闭",
    modalCommentPlaceholder: "请输入你的评价观点",
    starBiz: "业务能力",
    starResearch: "投研水平",
    starEthics: "道德操守",
    starReputation: "圈内风评",
    starSafety: "安全可靠",
    bottomRank: "KOL榜单",
    pinnedBadge: "置顶",
    bottomDonate: "捐赠",
    bottomSubmit: "收录",
    bottomExpose: "爆料",
    bottomNotice: "说明",
    themeToggleAria: "切换黑白主题",
    day: "DAY",
    night: "NIGHT",
    xLogin: "X 登录",
    xLogout: "退出",
    xLoggedIn: "@{handle} · {followers} 粉丝",
    loginRequired: "请先登录 X（推特）",
    followersTooLow: "粉丝数至少 10 才能投票",
    adminPanel: "管理",
    donationNeedWallet: "请先连接钱包。",
    donationOk: "捐赠验证成功，金额 {amount} USDT。你现在可以真实投票。",
    donationErr: "捐赠验证失败：{error}",
    voteBtn: "点评",
    goExposeBtn: "去吃瓜",
    viewReviews: "查看评价",
    labelTwitterId: "推特ID",
    labelFollowers: "粉丝",
    labelRiskLevel: "风险等级",
    ratingLine: "{score}分，{votes}人点评",
    noMatch: "当前条件下没有匹配KOL。",
    apiConnErr: "无法连接服务器。请直接在浏览器地址栏打开 http://localhost:3001（不要通过编辑器预览）",
    currentVoteTarget: "当前投票对象：{kol}",
    scoreRangeErr: "评分范围必须是1-5。",
    toastAllOneOrFive: "为防止恶意好评/差评，所有维度不能全部为1星或5星。",
    voteSuccess: "投票成功（真实入库），综合得分 {score} / 5.0",
    voteErr: "投票失败：{error}",
    inputComment: "请填写评论。",
    inputWallet: "请输入钱包地址。",
    submitReviewDone: "已提交审核，等待管理员处理。",
    submitReviewFail: "提交失败：{error}",
    reportSubmitted: "爆料提交成功（真实入库）。",
    reportNeedFields: "请填写人物和事件内容。",
    reportFail: "爆料提交失败：{error}",
    evidence: "证据",
    noEvidence: "无",
    latestExpose: "最新爆料",
    collectKolsTitle: "收录博主",
    blackFeedTitle: "黑料榜",
    alphaFeedTitle: "神单榜",
    totalScore: "总分：{score} / 5.0",
    modalNote:
      "安全可靠指存在诈骗、割韭菜等过往史，一星为最高风险。<br />请理性投票，恶意评价将会导致封号。",
    submitScoreSimple: "提交评分",
    reviewsTitle: "评价",
    reviewsCount: "{n} 条",
    like: "赞",
    dislike: "踩",
    reply: "回复",
    replyPlaceholder: "写下你的回复…",
    noReviews: "暂无评价",
    replySuccess: "回复成功",
    replyFail: "回复失败：{error}",
    replySubmit: "发送",
    reviewBadgeMain: "点评",
    reviewRepliesBlock: "回复",
    reviewSamePerson: "同一人"
  },
  en: {
    brandName: "Niche Review",
    pageTitle: "Niche Review - On-chain KOL Voting",
    searchPlaceholder: "Search KOL name or Twitter ID",
    tabTop: "Followers",
    tabBlack: "Low Score",
    tabNew: "High scores",
    voteSystemTitle: "Vote System (1U gate)",
    voteSystemDesc: "Donate 1 USDT to unlock 1 vote. Votes are user opinions, not official ratings.",
    walletAddress: "Wallet",
    walletPlaceholder: "0x...",
    targetKOL: "Target KOL",
    dimTrust: "Trust",
    dimInfoValue: "Alpha",
    dimWinRate: "Win Rate",
    dimSafety: "Safety",
    submitScore: "Submit Score (Hash proof)",
    donateTitle: "Donation & Benefits",
    donateRights1U: "Unlock voting (permanent)",
    donateRights10U: "Reserved: Advanced comments",
    donateRights50U: "Reserved: Report / Arbitration",
    donateWallet: "Wallet",
    donateChain: "Chain",
    donateVerify: "Verify 1U Donation",
    donateSupport: "USDT on ERC20 / Arbitrum / BSC. Vote after verification.",
    submitTitle: "KOL Submission (UGC)",
    submitTwitter: "Twitter Link",
    submitIntro: "Intro",
    submitIntroPlaceholder: "Describe this KOL style",
    submitTag: "Tag",
    tagContract: "Contract",
    tagLead: "Lead",
    tagProject: "Project",
    submitLeadTrade: "Lead Trade?",
    submitQueue: "Submit for Review",
    commentTitle: "Comment & Expose",
    commentPerson: "Person (Twitter ID)",
    commentEvent: "Event",
    commentEventPlaceholder: "Describe timeline and controversy",
    commentEvidence: "Evidence (image/video/file)",
    commentCredibility: "Credibility",
    credibilityTrust: "Trustworthy",
    credibilityDoubt: "Uncertain",
    credibilityFalse: "Untrusted",
    credibilityPending: "Pending review",
    submitExpose: "Submit Expose",
    noticeTitle: "Notice",
    repTitle: "Reputation System",
    repNew: "New User",
    repVoted: "Voted User",
    repHigh: "High Rep User",
    repWeight: "Score weight increases with reputation to reduce sybil attacks.",
    riskModelTitle: "Risk Model",
    riskFormula: "Risk = (Low trust × w) + (Exposes × w) + (Rug × w) - (Win rate × w)",
    riskSafe: "Safe",
    riskMid: "Medium",
    riskHigh: "High",
    antiCheatTitle: "Anti-Cheat",
    antiCheat1: "One vote per address",
    antiCheat2: "High-frequency alerts",
    antiCheat3: "Blacklist blocking",
    antiCheat4: "Multisig detection (reserved)",
    riskTipTitle: "Risk Notice",
    riskTip1: "All ratings and exposes are user opinions, not investment advice.",
    riskTip2: "No official KOL rating. No doxxing or libel.",
    riskTip3: "Malicious submissions and fake evidence lead to bans.",
    modalVoteTitle: "KOL Vote",
    modalClose: "Close",
    modalCommentPlaceholder: "Enter your review",
    starBiz: "Business",
    starResearch: "Research",
    starEthics: "Ethics",
    starReputation: "Reputation",
    starSafety: "Safety",
    bottomRank: "KOL List",
    pinnedBadge: "Pinned",
    bottomDonate: "Donate",
    bottomSubmit: "Collect",
    bottomExpose: "Expose",
    bottomNotice: "Notice",
    themeToggleAria: "Toggle day/night theme",
    day: "DAY",
    night: "NIGHT",
    xLogin: "X Login",
    xLogout: "Logout",
    xLoggedIn: "@{handle} · {followers} followers",
    loginRequired: "Please login with X (Twitter) first",
    followersTooLow: "At least 10 followers required to vote",
    adminPanel: "Admin",
    donationNeedWallet: "Connect wallet first.",
    donationOk: "Donation verified: {amount} USDT. Real voting is unlocked.",
    donationErr: "Donation verification failed: {error}",
    voteBtn: "Review",
    goExposeBtn: "Go Gossip",
    viewReviews: "View Reviews",
    labelTwitterId: "Twitter ID",
    labelFollowers: "Followers",
    labelRiskLevel: "Risk",
    ratingLine: "{score}, {votes} ratings",
    noMatch: "No KOL matches current filter.",
    apiConnErr: "Cannot connect. Run: node server.js and open http://localhost:3001",
    currentVoteTarget: "Current target: {kol}",
    scoreRangeErr: "Score must be 1-5.",
    toastAllOneOrFive: "All dimensions cannot be all 1-star or all 5-star.",
    voteSuccess: "Vote saved (real), total {score} / 5.0",
    voteErr: "Vote failed: {error}",
    inputComment: "Please enter your comment.",
    inputWallet: "Please input wallet address.",
    submitReviewDone: "Submission sent for admin review.",
    submitReviewFail: "Submission failed: {error}",
    reportSubmitted: "Expose submitted (real).",
    reportNeedFields: "Please fill in person and event.",
    reportFail: "Expose failed: {error}",
    evidence: "Evidence",
    noEvidence: "None",
    latestExpose: "Latest Exposes",
    collectKolsTitle: "Collect KOLs",
    blackFeedTitle: "Blacklist Feed",
    alphaFeedTitle: "Alpha Feed",
    totalScore: "Total: {score} / 5.0",
    modalNote:
      "Safety indicates possible scam/rug history; 1-star means highest risk.<br />Vote rationally. Malicious ratings may lead to bans.",
    submitScoreSimple: "Submit",
    reviewsTitle: "Reviews",
    reviewsCount: "{n}",
    like: "Like",
    dislike: "Dislike",
    reply: "Reply",
    replyPlaceholder: "Write a reply…",
    noReviews: "No reviews yet",
    replySuccess: "Reply sent",
    replyFail: "Reply failed: {error}",
    replySubmit: "Send",
    reviewBadgeMain: "Review",
    reviewRepliesBlock: "Replies",
    reviewSamePerson: "Same user"
  }
};

function t(key, vars = {}) {
  const dict = i18n[state.lang] || i18n.zh;
  let text = dict[key] ?? i18n.zh[key] ?? key;
  Object.keys(vars).forEach((k) => {
    text = text.replace(`{${k}}`, String(vars[k]));
  });
  return text;
}

/** 已登录且为管理员或粉丝数达标时可投票（与 /api/auth/me 一致） */
function twitterVoteAllowed() {
  const u = state.twitterUser;
  if (!u?.loggedIn) return false;
  return Boolean(u.isAdmin || u.canVote);
}

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.headers || {}),
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" })
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "request failed");
    err.data = data;
    err.status = res.status;
    throw err;
  }
  return data;
}

const searchInput = document.getElementById("searchInput");
const tabs = document.querySelectorAll(".tab");
const kolList = document.getElementById("kolList");
const moduleLinks = document.querySelectorAll(".module-link");
const moduleCards = document.querySelectorAll(".module-card");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const xLoginBtn = document.getElementById("xLoginBtn");
const xUserInfo = document.getElementById("xUserInfo");
const adminPanelLink = document.getElementById("adminPanelLink");
const voteForm = document.getElementById("voteForm");
const voteTips = document.getElementById("voteTips");
const kolSelect = document.getElementById("kolSelect");
const submitForm = document.getElementById("submitForm");
const submitMsg = document.getElementById("submitMsg");
const reportForm = document.getElementById("reportForm");
const reportMsg = document.getElementById("reportMsg");
const reportList = document.getElementById("reportList");
const blackFeed = document.getElementById("blackFeed");
const alphaFeed = document.getElementById("alphaFeed");
const openExposeModalBtn = document.getElementById("openExposeModalBtn");
const exposeModal = document.getElementById("exposeModal");
const exposeModalClose = document.getElementById("exposeModalClose");
const discussModal = document.getElementById("discussModal");
const discussModalClose = document.getElementById("discussModalClose");
const discussModalTitle = document.getElementById("discussModalTitle");
const discussList = document.getElementById("discussList");
const discussInput = document.getElementById("discussInput");
const discussSubmit = document.getElementById("discussSubmit");
const reviewsModal = document.getElementById("reviewsModal");
const reviewsModalClose = document.getElementById("reviewsModalClose");
const reviewsModalTitle = document.getElementById("reviewsModalTitle");
const reviewsCountLine = document.getElementById("reviewsCountLine");
const reviewsList = document.getElementById("reviewsList");
const voteModal = document.getElementById("voteModal");
const voteModalClose = document.getElementById("voteModalClose");
const voteModalForm = document.getElementById("voteModalForm");
const modalKolName = document.getElementById("modalKolName");
const modalKolInput = document.getElementById("modalKolInput");
const modalCommentInput = document.getElementById("modalCommentInput");
const modalTotalScore = document.getElementById("modalTotalScore");
const modalVoteTips = document.getElementById("modalVoteTips");
const modalStarRows = document.querySelectorAll(".star-row");
const globalToast = document.getElementById("globalToast");
const donateAddressInput = document.getElementById("donateAddressInput");
const copyDonateAddressBtn = document.getElementById("copyDonateAddressBtn");

let toastTimer = null;
let exposeTickerTimer = null;
let currentDiscussExposeId = null;

function showToast(text, ms = 10000) {
  globalToast.textContent = text;
  globalToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => globalToast.classList.remove("show"), ms);
}

globalToast.addEventListener("click", () => globalToast.classList.remove("show"));

function setActiveModule(moduleId) {
  moduleCards.forEach((c) => c.classList.toggle("active", c.id === moduleId));
  moduleLinks.forEach((l) => l.classList.toggle("active", l.dataset.target === moduleId));
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function getHashModule() {
  const m = window.location.hash.replace("#", "");
  const exists = Array.from(moduleCards).some((c) => c.id === m);
  return exists ? m : "comment";
}

function updateThemeButton() {
  const dark = document.body.classList.contains("dark");
  state.theme = dark ? "night" : "day";
  themeToggle.classList.toggle("day", !dark);
  themeToggle.classList.toggle("night", dark);
  themeToggle.textContent = dark ? t("night") : t("day");
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.dataset.i18n;
    el.textContent = t(k);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const k = el.dataset.i18nPlaceholder;
    el.placeholder = t(k);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const k = el.dataset.i18nHtml;
    el.innerHTML = t(k);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const k = el.dataset.i18nAriaLabel;
    el.setAttribute("aria-label", t(k));
  });
  langToggle.textContent = state.lang === "zh" ? "中文/EN" : "EN/中文";
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  updateThemeButton();
  updateModalTotalScore();
}

function getRiskText(kol) {
  const risk = Number(kol.risk_index || 0);
  if (risk >= 3) return t("riskHigh");
  if (risk >= 1.7) return t("riskMid");
  return t("riskSafe");
}

function formatReviewDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const now = new Date();
    const today = now.toDateString();
    const dayStr = d.toDateString();
    if (dayStr === today) {
      return d.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    }
    return d.toLocaleDateString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

function formatFollowers(n) {
  const num = Number(n) || 0;
  if (num >= 10000) {
    const w = Math.floor(num / 1000) / 10; // 截断保留1位小数，如 299652 -> 29.9
    const s = w % 1 === 0 ? String(Math.floor(w)) : w.toFixed(1);
    return state.lang === "zh" ? `${s}万` : `${(num / 1000).toFixed(0)}K`;
  }
  return String(num);
}

function getCredibilityText(val) {
  if (val === "完全可信") return t("credibilityTrust");
  if (val === "存疑") return t("credibilityDoubt");
  if (val === "不可信") return t("credibilityFalse");
  if (val === "待审核") return t("credibilityPending");
  return val || "";
}

function escapeHtml(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** 与服务器一致：从粘贴文案里抠出 X handle（全角符号、URL+中文混写等） */
function clientExtractTwitterHandle(raw) {
  let s = String(raw || "").trim();
  if (!s) return "";
  try {
    s = s.normalize("NFKC");
  } catch (_e) {}
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, "");
  s = s.replace(/\uFF1A/g, ":").replace(/\uFF0F/g, "/");
  const hostPath = /(?:https?:\/\/)?(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/([A-Za-z0-9_]{1,30})(?=[^A-Za-z0-9_]|$)/i;
  let m = s.match(hostPath);
  if (m) return m[1].toLowerCase();
  m = s.match(/(?:^|[^\w])(?:x\.com|twitter\.com)\/([A-Za-z0-9_]{1,30})(?=[^A-Za-z0-9_]|$)/i);
  if (m) return m[1].toLowerCase();
  const cleaned = s.replace(/^@/, "").trim();
  const tail = cleaned.split("/").filter(Boolean).pop() || cleaned;
  const handleOnly = tail.split("?")[0].split("#")[0].split(":")[0];
  if (/^[A-Za-z0-9_]{1,30}$/.test(handleOnly)) return handleOnly.toLowerCase();
  return "";
}

/** 爆料 / 黑料榜：主角头像 + 昵称 + @handle（数据来自 /api/exposes 的 subject_*） */
function renderExposeSubjectBlock(r) {
  const h = (r.subject_handle || clientExtractTwitterHandle(r.twitter_id) || "").trim();
  const name = (r.subject_name || "").trim();
  const profileUrl = h ? `https://x.com/${encodeURIComponent(h)}` : "";
  const directAvatar = (r.subject_avatar_url || "").trim();
  const avatarUrl = directAvatar || (h ? `/api/avatar/${encodeURIComponent(h)}` : "");
  const dicebear = h ? `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(h)}` : "";
  const letterFallback = h ? h.charAt(0).toUpperCase() : (r.twitter_id || "?").trim().charAt(0).toUpperCase();
  const avatarHtml = h
    ? `<img class="expose-avatar" src="${escapeHtml(avatarUrl)}" alt="" width="40" height="40" loading="lazy" data-fallback="${escapeHtml(dicebear)}" onerror="this.onerror=null;this.src=this.dataset.fallback" />`
    : `<div class="expose-avatar expose-avatar-letter" aria-hidden="true">${escapeHtml(letterFallback)}</div>`;
  let nameLine = "";
  if (h) {
    if (name) {
      nameLine = `<div class="expose-name-stack"><span class="expose-display-name">${escapeHtml(name)}</span><a class="expose-handle" href="${profileUrl}" target="_blank" rel="noopener">@${escapeHtml(h)}</a></div>`;
    } else {
      nameLine = `<a class="expose-profile-link" href="${profileUrl}" target="_blank" rel="noopener">@${escapeHtml(h)}</a>`;
    }
  } else {
    nameLine = `<span class="expose-raw-link">${escapeHtml(r.twitter_id || "")}</span>`;
  }
  return `<div class="expose-subject">${avatarHtml}<div class="expose-subject-body">${nameLine}</div></div>`;
}

async function loadKols() {
  try {
    const q = encodeURIComponent(searchInput.value.trim());
    const rank = encodeURIComponent(state.currentRank);
    const data = await api(`/kols?rank=${rank}&q=${q}`);
    state.kols = Array.isArray(data) ? data : [];
    const allData = await api("/kols?rank=all&q=");
    const all = Array.isArray(allData) ? allData : [];
    kolSelect.innerHTML = all.map((k) => {
    const display = k.display_name || k.handle || (k.twitter_uid || "").replace(/^@/, "") || "-";
    const uid = k.handle ? `@${k.handle}` : (k.twitter_uid || "");
    return `<option value="${k.handle || ""}">${display}${uid ? ` (${uid})` : ""}</option>`;
  }).join("");
  } catch (e) {
    state.kols = [];
    if (kolList) kolList.innerHTML = `<p class="muted">${t("apiConnErr")}</p><p class="muted" style="font-size:0.85em;margin-top:8px">${e.message}</p>`;
    return;
  }
  renderKols();
}

function summarizeIntro(intro) {
  if (!intro || !String(intro).trim()) return "";
  let s = String(intro)
    .replace(/https?:\/\/[^\s]+/g, "")
    .replace(/\n/g, " ")
    .trim();
  const firstSentence = s.match(/^[^。.!?！？\n]+/)?.[0] || s.slice(0, 60);
  const out = (firstSentence.length > 50 ? firstSentence.slice(0, 50) + "…" : firstSentence).trim();
  return out.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderKols() {
  if (!state.kols.length) {
    kolList.innerHTML = `<p class="muted">${t("noMatch")}</p>`;
    return;
  }
  const pinned = state.kols.find((k) => k.handle === "xlink_lab");
  const sorted = pinned ? [pinned, ...state.kols.filter((k) => k.handle !== "xlink_lab")] : state.kols;
  const sep = state.lang === "zh" ? "：" : ": ";
  kolList.innerHTML = sorted
    .map((k) => {
      try {
      const isPinned = k.handle === "xlink_lab";
      const handleKey = String(k.handle || (k.twitter_uid || "").replace(/^@/, "") || "")
        .replace(/^@/, "")
        .trim();
      const displayNameRaw = String(k.display_name || "").trim();
      // Keep it browser-safe: only remove zero-width joiners here.
      const displayTitle = displayNameRaw.replace(/[\u200D\uFE0F]/g, "").trim();
      /** 用户名 = 推特昵称（何币）；ID = @handle，只在「直达链接」那一行出现，避免和标题重复 */
      const hasUserDisplayName = Boolean(displayTitle);
      const headingAlt = handleKey ? `@${handleKey}` : "-";
      const introSummary = summarizeIntro(k.intro);
      const avatarUrl = handleKey ? `/api/avatar/${encodeURIComponent(handleKey)}` : "";
      const dicebearUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(handleKey || "kol")}`;
      const twitterHandle = handleKey;
      const twitterLink = twitterHandle
        ? `https://x.com/${encodeURIComponent(twitterHandle)}`
        : "";
      const twitterDisplay = twitterHandle ? `@${twitterHandle}` : (k.twitter_uid || "-");
      const isAdmin = Boolean(state.twitterUser?.isAdmin);
      const actionHtml =
        isPinned
          ? `<div class="kol-actions"><button class="yellow-btn kol-vote-btn" type="button" data-go-expose>${t("goExposeBtn")}</button></div>`
          : isAdmin
            ? `<div class="kol-actions">
                <button class="yellow-btn kol-reviews-btn" type="button" data-kol-reviews="${k.handle}">${t("viewReviews")}</button>
                <button class="yellow-btn kol-vote-btn" type="button" data-kol-vote="${k.handle}">${t("voteBtn")}</button>
              </div>`
            : `<div class="kol-actions">
                <button class="yellow-btn kol-reviews-btn" type="button" data-kol-reviews="${k.handle}">${t("viewReviews")}</button>
                <button class="yellow-btn kol-vote-btn" type="button" data-kol-vote="${k.handle}">${t("voteBtn")}</button>
              </div>`;
      const h3Block = hasUserDisplayName
        ? `<h3><span class="kol-user-display-name">${escapeHtml(displayTitle)}</span> <span class="kol-verified" aria-label="已认证">✓</span></h3>`
        : twitterLink
          ? `<h3><a href="${twitterLink}" target="_blank" rel="noopener" class="kol-twitter-link kol-title-as-handle">${twitterDisplay}</a> <span class="kol-verified" aria-label="已认证">✓</span></h3>`
          : `<h3><span class="kol-user-display-name">${escapeHtml(headingAlt)}</span> <span class="kol-verified" aria-label="已认证">✓</span></h3>`;
      const twitterIdRow =
        hasUserDisplayName && twitterLink
          ? `<p class="kol-twitter-id-row">${t("labelTwitterId")}${sep}<a href="${twitterLink}" target="_blank" rel="noopener" class="kol-twitter-link">${twitterDisplay}</a></p>`
          : "";
      const imgAlt = hasUserDisplayName ? displayTitle : headingAlt;
      const pinnedExposeHtml = isPinned
        ? `<div class="kol-pinned-exposes">${(state.exposes || []).slice(0, 2).map((x) => {
            const media = (x.evidence || [])[0] || "";
            const img = media ? `<img src="${escapeHtml(media)}" alt="${escapeHtml(x.title || "爆料")}" loading="lazy" />` : `<div class="kol-pinned-expose-empty">暂无封面</div>`;
            return `<div class="kol-pinned-expose-item">${img}<p>${escapeHtml(x.title || x.event_text || "未命名爆料")}</p></div>`;
          }).join("") || `<div class="kol-pinned-expose-item"><div class="kol-pinned-expose-empty">暂无爆料</div><p>-</p></div>`}</div>`
        : "";
      if (isPinned) {
        return `<article class="kol-item kol-item-pinned">
          <span class="kol-pinned-badge">${t("latestExpose")}</span>
          ${pinnedExposeHtml}
          ${actionHtml}
        </article>`;
      }
      return `<article class="kol-item ${isPinned ? "kol-item-pinned" : ""}">
        ${isPinned ? `<span class="kol-pinned-badge">${t("pinnedBadge")}</span>` : ""}
        <div class="kol-head">
          <img class="kol-avatar" src="${avatarUrl || dicebearUrl}" alt="${escapeHtml(imgAlt)}" data-fallback="${dicebearUrl}" onerror="this.onerror=null;this.src=this.dataset.fallback" />
          <div>
            ${h3Block}${introSummary ? `<p class="kol-intro-summary">${introSummary}</p>` : ""}
            <p class="kol-rating">${t("ratingLine", { score: Number(k.avg_score || 0).toFixed(1), votes: k.vote_count || 0 })}</p>
          </div>
        </div>
        ${twitterIdRow}
        <p>${t("labelFollowers")}${sep}${formatFollowers(k.followers)}</p>
        ${pinnedExposeHtml}
        ${actionHtml}
      </article>`;
      } catch (_e) {
        const h = String(k?.handle || "").replace(/^@/, "").trim();
        const link = h ? `https://x.com/${encodeURIComponent(h)}` : "";
        return `<article class="kol-item"><div class="kol-head"><div><h3>${escapeHtml(String(k?.display_name || h || "-"))}</h3><p class="muted">${link ? `<a href="${link}" target="_blank" rel="noopener" class="kol-twitter-link">@${escapeHtml(h)}</a>` : "-"}</p></div></div></article>`;
      }
    })
    .join("");
}

function updateModalTotalScore() {
  const fd = new FormData(voteModalForm);
  const totalRaw = ["biz", "research", "ethics", "reputation", "risk"]
    .map((k) => Number(fd.get(k)))
    .reduce((a, b) => a + (Number.isNaN(b) ? 0 : b), 0);
  const score = (totalRaw * 0.2).toFixed(1);
  modalTotalScore.textContent = t("totalScore", { score });
}

function paintStarRow(row, value) {
  row.querySelectorAll(".star-btn").forEach((star) => {
    star.classList.toggle("active", Number(star.dataset.value) <= value);
  });
}

function initStars() {
  modalStarRows.forEach((row) => {
    if (!row.children.length) {
      for (let i = 1; i <= 5; i += 1) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "star-btn";
        b.dataset.value = String(i);
        b.textContent = "★";
        row.appendChild(b);
      }
    }
    const group = row.dataset.starGroup;
    const hidden = voteModalForm.querySelector(`input[name="${group}"]`);
    paintStarRow(row, Number(hidden.value));
    row.addEventListener("click", (e) => {
      const star = e.target.closest(".star-btn");
      if (!star) return;
      hidden.value = star.dataset.value;
      paintStarRow(row, Number(star.dataset.value));
      updateModalTotalScore();
    });
  });
  updateModalTotalScore();
}

function openVoteModal(handle) {
  voteModalForm.reset();
  modalKolInput.value = handle;
  modalKolName.textContent = t("currentVoteTarget", { kol: handle });
  if (!state.twitterUser?.loggedIn) {
    modalVoteTips.textContent = t("loginRequired");
  } else if (!twitterVoteAllowed()) {
    modalVoteTips.textContent = t("followersTooLow");
  } else {
    modalVoteTips.textContent = "";
  }
  modalStarRows.forEach((row) => {
    const group = row.dataset.starGroup;
    const hidden = voteModalForm.querySelector(`input[name="${group}"]`);
    hidden.value = "3";
    paintStarRow(row, 3);
  });
  updateModalTotalScore();
  voteModal.classList.add("open");
  voteModal.setAttribute("aria-hidden", "false");
  modalCommentInput.focus();
}

function closeVoteModal() {
  voteModal.classList.remove("open");
  voteModal.setAttribute("aria-hidden", "true");
}

let currentReviewsHandle = null;

function closeReviewsModal() {
  reviewsModal.classList.remove("open");
  reviewsModal.setAttribute("aria-hidden", "true");
  currentReviewsHandle = null;
}

function openReviewsModal(handle) {
  currentReviewsHandle = handle;
  const kol = state.kols.find((k) => k.handle === handle);
  const kolName = kol ? (kol.display_name || kol.handle || kol.twitter_uid || handle) : handle;
  reviewsModalTitle.textContent = `${kolName} · ${t("reviewsTitle")}`;
  if (reviewsCountLine) reviewsCountLine.textContent = "…";
  reviewsList.innerHTML = '<p class="muted">加载中…</p>';
  reviewsModal.classList.add("open");
  reviewsModal.setAttribute("aria-hidden", "false");
  loadReviews(handle);
}

async function loadReviews(handle) {
  if (!reviewsList || currentReviewsHandle !== handle) return;
  try {
    const data = await api(`/kols/${encodeURIComponent(handle)}/votes`);
    if (currentReviewsHandle !== handle) return;
    if (reviewsCountLine) reviewsCountLine.textContent = t("reviewsCount", { n: data.total });
    renderReviews(data.list, handle);
  } catch (e) {
    if (currentReviewsHandle === handle) {
      reviewsList.innerHTML = `<p class="muted">${t("apiConnErr")}</p>`;
    }
  }
}

function reviewNormHandle(authorOrWallet) {
  return String(authorOrWallet || "")
    .replace(/^twitter:/i, "")
    .replace(/^@/, "")
    .trim()
    .toLowerCase();
}

function reviewAvatarLetter(display) {
  const h = String(display || "").replace(/^@/, "").trim();
  const ch = h.match(/[a-zA-Z0-9\u4e00-\u9fff]/)?.[0] || h.charAt(0) || "?";
  return ch.toUpperCase();
}

function renderReviews(list, handle) {
  if (!list || !list.length) {
    reviewsList.innerHTML = `<p class="muted">${t("noReviews")}</p>`;
    return;
  }
  reviewsList.innerHTML = list
    .map(
      (v) => {
        const likeActive = v.myReaction === 1 ? " active" : "";
        const dislikeActive = v.myReaction === -1 ? " active" : "";
        const parentKey = reviewNormHandle(v.wallet);
        const authorDisp = escapeHtml(v.author_name || v.author);
        const mainHandleDisp = String(v.wallet || "").replace(/^twitter:/i, "@");
        const letterMain = escapeHtml(reviewAvatarLetter(v.author_name || mainHandleDisp));
        const voteTime = formatReviewDate(v.createdAt || v.created_at);
        const replies = v.replies || [];
        const repliesHtml = replies
          .map((r) => {
            const replyHandleDisp = r.wallet.replace(/^twitter:/i, "@");
            const replyNameDisp = r.author_name || replyHandleDisp;
            const replyKey = reviewNormHandle(r.wallet);
            const sameAsReviewer = Boolean(parentKey && replyKey === parentKey);
            const sameClass = sameAsReviewer ? " review-reply-same" : "";
            const sameTag = sameAsReviewer
              ? `<span class="review-same-tag">${t("reviewSamePerson")}</span>`
              : "";
            const letterR = escapeHtml(reviewAvatarLetter(replyNameDisp));
            return `<div class="review-reply${sameClass}">
                <div class="review-reply-top">
                  <span class="review-avatar review-avatar-sm" aria-hidden="true">${letterR}</span>
                  <div class="review-reply-top-meta">
                    <span class="review-reply-author">${escapeHtml(replyNameDisp)}</span>
                    ${sameTag}
                    <span class="review-reply-date">${formatReviewDate(r.createdAt || r.created_at)}</span>
                  </div>
                </div>
                <p class="review-reply-content">${escapeHtml(r.content)}</p>
              </div>`;
          })
          .join("");
        const repliesBlock =
          replies.length > 0
            ? `<div class="review-replies-block">
            <div class="review-replies-header">${t("reviewRepliesBlock")} · ${replies.length}</div>
            <div class="review-replies-wrap">${repliesHtml}</div>
          </div>`
            : "";
        return `
        <article class="review-item" data-vote-id="${v.id}">
          <div class="review-card">
            <div class="review-head">
              <div class="review-avatar" aria-hidden="true">${letterMain}</div>
              <div class="review-head-main">
                <div class="review-meta">
                  <span class="review-author">${authorDisp}</span>
                  <span class="review-badge review-badge-main">${t("reviewBadgeMain")}</span>
                </div>
                <span class="review-date review-date-under">${voteTime}</span>
              </div>
            </div>
            <p class="review-comment">${escapeHtml(v.comment || "-")}</p>
            <p class="review-score">${t("totalScore", { score: Number(v.totalScore || 0).toFixed(1) })}</p>
            <div class="review-actions">
            <button type="button" class="review-action-btn like-btn${likeActive}" data-react="1" title="${t("like")}">
              👍 <span class="review-action-count">${v.likes || 0}</span>
            </button>
            <button type="button" class="review-action-btn dislike-btn${dislikeActive}" data-react="-1" title="${t("dislike")}">
              👎 <span class="review-action-count">${v.dislikes || 0}</span>
            </button>
            <button type="button" class="review-action-btn reply-btn" data-reply>${t("reply")}</button>
          </div>
          </div>
          ${repliesBlock}
          <div class="review-reply-form" style="display:none">
            <input type="text" class="review-reply-input" placeholder="${t("replyPlaceholder")}" />
            <button type="button" class="review-reply-submit yellow-btn">${t("replySubmit")}</button>
          </div>
        </article>`;
      }
    )
    .join("");
}

function setupReviewsListListeners() {
  if (!reviewsList) return;
  reviewsList.addEventListener("click", async (e) => {
    const likeBtn = e.target.closest(".like-btn, .dislike-btn");
    if (likeBtn) {
      const item = likeBtn.closest(".review-item");
      const voteId = item?.dataset.voteId;
      const reaction = Number(likeBtn.dataset.react);
      if (!voteId || (reaction !== 1 && reaction !== -1)) return;
      try {
        const res = await api(`/votes/${voteId}/react`, {
          method: "POST",
          body: JSON.stringify({ reaction })
        });
        const likeSpan = item.querySelector(".like-btn .review-action-count");
        const dislikeSpan = item.querySelector(".dislike-btn .review-action-count");
        if (likeSpan) likeSpan.textContent = res.likes ?? 0;
        if (dislikeSpan) dislikeSpan.textContent = res.dislikes ?? 0;
        likeBtn.closest(".review-actions").querySelector(".like-btn")?.classList.toggle("active", res.reaction === 1);
        likeBtn.closest(".review-actions").querySelector(".dislike-btn")?.classList.toggle("active", res.reaction === -1);
      } catch (err) {
        showToast(err.message);
      }
      return;
    }
    const replyBtn = e.target.closest("[data-reply]");
    if (replyBtn) {
      const item = replyBtn.closest(".review-item");
      const form = item?.querySelector(".review-reply-form");
      const input = form?.querySelector(".review-reply-input");
      if (form && input) {
        form.style.display = form.style.display === "none" ? "block" : "none";
        if (form.style.display !== "none") input.focus();
      }
      return;
    }
    const submitBtn = e.target.closest(".review-reply-submit");
    if (submitBtn) {
      const item = submitBtn.closest(".review-item");
      const voteId = item?.dataset.voteId;
      const input = item?.querySelector(".review-reply-input");
      const content = input?.value?.trim();
      if (!voteId || !content) return;
      try {
        await api(`/votes/${voteId}/replies`, {
          method: "POST",
          body: JSON.stringify({ content })
        });
        input.value = "";
        item.querySelector(".review-reply-form").style.display = "none";
        await loadReviews(currentReviewsHandle);
      } catch (err) {
        showToast(t("replyFail", { error: err.message }));
      }
    }
  });
}

async function loadExposes() {
  const rows = await api("/exposes");
  state.exposes = Array.isArray(rows) ? rows : [];
  if (exposeTickerTimer) {
    clearInterval(exposeTickerTimer);
    exposeTickerTimer = null;
  }
  reportList.innerHTML = rows
    .slice(0, 4)
    .map((r) => {
      const media = (r.evidence || [])[0] || "";
      const isVideo = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(media);
      const credClass =
        r.credibility === "完全可信"
          ? "credibility-true"
          : r.credibility === "存疑"
            ? "credibility-mid"
            : r.credibility === "待审核"
              ? "credibility-pending"
              : "credibility-false";
      const mediaHtml = media
        ? isVideo
          ? `<video class="expose-cover" src="${escapeHtml(media)}" muted playsinline preload="metadata"></video>`
          : `<img class="expose-cover" src="${escapeHtml(media)}" alt="${escapeHtml(r.title || "")}" loading="lazy" />`
        : `<div class="expose-cover expose-cover-empty">暂无封面</div>`;
      return `<li class="expose-row" data-expose-id="${r.id}" data-expose-handle="${escapeHtml(r.subject_handle || "")}">
        <article class="expose-card">
          ${mediaHtml}
          <div class="expose-card-body">
            <p class="expose-card-title">${escapeHtml(r.title || "未命名主题")} <span class="credibility-tag ${credClass}">${getCredibilityText(r.credibility)}</span></p>
            ${renderExposeSubjectBlock(r)}
            <div class="expose-card-meta">
              <button type="button" class="expose-meta-btn" data-expose-like="${r.id}">👍 ${Number(r.likes || 0)}</button>
              <span>👁 ${Number(r.views || 0)}</span>
              <button type="button" class="expose-meta-btn" data-expose-discuss="${r.id}">💬 ${Number(r.discuss_count || 0)}</button>
            </div>
          </div>
        </article>
      </li>`;
    })
    .join("") || `<li class="muted">暂无爆料</li>`;
  if (state.kols?.length) renderKols();
}

async function openDiscussModal(exposeId, titleText = "") {
  if (!discussModal) return;
  currentDiscussExposeId = Number(exposeId) || null;
  discussModalTitle.textContent = titleText ? `讨论广场 · ${titleText}` : "讨论广场";
  discussList.innerHTML = `<p class="muted">加载中…</p>`;
  discussModal.setAttribute("aria-hidden", "false");
  discussModal.classList.add("open");
  try {
    await api(`/exposes/${currentDiscussExposeId}/view`, { method: "POST" });
  } catch (_e) {}
  try {
    const rows = await api(`/exposes/${currentDiscussExposeId}/comments`);
    discussList.innerHTML = (rows || [])
      .map((r) => `<div class="review-reply"><span class="review-reply-author">${escapeHtml(r.author || "@匿名")}</span><span class="review-reply-date">${formatReviewDate(r.created_at)}</span><p class="review-reply-content">${escapeHtml(r.content || "")}</p></div>`)
      .join("") || `<p class="muted">还没有讨论，来抢个沙发。</p>`;
  } catch (e) {
    discussList.innerHTML = `<p class="muted">${escapeHtml(e.message || "加载失败")}</p>`;
  }
}

async function fetchAuthMe() {
  try {
    const data = await api("/auth/me");
    state.twitterUser = data;
    return data;
  } catch {
    state.twitterUser = null;
    return null;
  }
}

function renderAuthUI() {
  const u = state.twitterUser;
  if (!xLoginBtn || !xUserInfo) return;
  if (u?.loggedIn) {
    xLoginBtn.style.display = "none";
    xUserInfo.style.display = "inline";
    xUserInfo.innerHTML = `
      <span class="x-user-text">${t("xLoggedIn", { handle: u.username || u.handle?.replace(/^@/, "") || "", followers: u.followers ?? 0 })}</span>
      <button id="xLogoutBtn" type="button" class="x-logout-btn">${t("xLogout")}</button>
    `;
    if (adminPanelLink) {
      adminPanelLink.style.display = u.isAdmin ? "inline-flex" : "none";
      adminPanelLink.textContent = t("adminPanel");
    }
    const logoutBtn = document.getElementById("xLogoutBtn");
    if (logoutBtn) {
      logoutBtn.onclick = async () => {
        try {
          await api("/auth/logout", { method: "POST" });
          state.twitterUser = null;
          renderAuthUI();
          if (state.kols?.length) renderKols();
        } catch {}
      };
    }
  } else {
    xLoginBtn.style.display = "";
    xLoginBtn.href = "/api/auth/twitter";
    xUserInfo.style.display = "none";
    xUserInfo.innerHTML = "";
    if (adminPanelLink) adminPanelLink.style.display = "none";
  }
}

voteModalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!state.twitterUser?.loggedIn) {
    modalVoteTips.textContent = t("loginRequired");
    return;
  }
  if (!twitterVoteAllowed()) {
    modalVoteTips.textContent = t("followersTooLow");
    return;
  }
  const comment = modalCommentInput.value.trim();
  if (!comment) {
    modalVoteTips.textContent = t("inputComment");
    return;
  }
  const fd = new FormData(voteModalForm);
  const scores = {
    biz: Number(fd.get("biz")),
    research: Number(fd.get("research")),
    ethics: Number(fd.get("ethics")),
    reputation: Number(fd.get("reputation")),
    safety: Number(fd.get("risk"))
  };
  if (Object.values(scores).some((s) => s < 1 || s > 5 || Number.isNaN(s))) {
    modalVoteTips.textContent = t("scoreRangeErr");
    return;
  }
  if (
    !state.twitterUser?.isAdmin &&
    (Object.values(scores).every((s) => s === 1) || Object.values(scores).every((s) => s === 5))
  ) {
    showToast(t("toastAllOneOrFive"));
    return;
  }
  try {
    const result = await api("/votes", {
      method: "POST",
      body: JSON.stringify({
        kolHandle: modalKolInput.value,
        comment,
        scores
      })
    });
    const lastAt = result.lastVoteAt ? formatReviewDate(result.lastVoteAt) : "";
    const nextAt = result.nextVoteAt ? formatReviewDate(result.nextVoteAt) : "";
    modalVoteTips.textContent =
      `${t("voteSuccess", { score: result.totalScore })}` +
      (lastAt && nextAt ? `\n防止刷评，同一用户每日仅允许评价一次。上次：${lastAt}；下次刷新：${nextAt}` : "");
    await loadKols();
    setTimeout(closeVoteModal, 600);
  } catch (err) {
    if (err?.data?.code === "DAILY_KOL_VOTE_LIMIT") {
      const lastAt = err.data.lastVoteAt ? formatReviewDate(err.data.lastVoteAt) : "-";
      const nextAt = err.data.nextVoteAt ? formatReviewDate(err.data.nextVoteAt) : "-";
      modalVoteTips.textContent = `防止刷评，同一用户每日仅允许评价一次。上次：${lastAt}；下次刷新：${nextAt}`;
    } else {
      modalVoteTips.textContent = t("voteErr", { error: err.message });
    }
  }
});

voteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!state.twitterUser?.loggedIn) {
    voteTips.textContent = t("loginRequired");
    return;
  }
  if (!twitterVoteAllowed()) {
    voteTips.textContent = t("followersTooLow");
    return;
  }
  const fd = new FormData(voteForm);
  const scores = {
    trust: Number(fd.get("trust")),
    alpha: Number(fd.get("alpha")),
    winRate: Number(fd.get("winRate")),
    risk: Number(fd.get("risk"))
  };
  try {
    const result = await api("/votes", {
      method: "POST",
      body: JSON.stringify({
        kolHandle: kolSelect.value,
        comment: "vote-page",
        scores
      })
    });
    const lastAt = result.lastVoteAt ? formatReviewDate(result.lastVoteAt) : "";
    const nextAt = result.nextVoteAt ? formatReviewDate(result.nextVoteAt) : "";
    voteTips.textContent =
      `${t("voteSuccess", { score: result.totalScore })}` +
      (lastAt && nextAt ? `\n防止刷评，同一用户每日仅允许评价一次。上次：${lastAt}；下次刷新：${nextAt}` : "");
    await loadKols();
  } catch (err) {
    if (err?.data?.code === "DAILY_KOL_VOTE_LIMIT") {
      const lastAt = err.data.lastVoteAt ? formatReviewDate(err.data.lastVoteAt) : "-";
      const nextAt = err.data.nextVoteAt ? formatReviewDate(err.data.nextVoteAt) : "-";
      voteTips.textContent = `防止刷评，同一用户每日仅允许评价一次。上次：${lastAt}；下次刷新：${nextAt}`;
    } else {
      voteTips.textContent = t("voteErr", { error: err.message });
    }
  }
});

submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await api("/kol-submissions", {
      method: "POST",
      body: JSON.stringify({
        twitterLink: document.getElementById("twitterLink").value.trim(),
        intro: document.getElementById("kolDesc").value.trim(),
        tag: document.getElementById("kolTag").value,
        isLeadTrade: document.getElementById("isLeadTrade").checked
      })
    });
    submitMsg.textContent = t("submitReviewDone");
    submitForm.reset();
  } catch (err) {
    submitMsg.textContent = t("submitReviewFail", { error: err.message });
  }
});

if (reportForm) {
  reportForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const twitterId = document.getElementById("reportTwitterId").value.trim();
    const title = document.getElementById("reportTitle").value.trim();
    const eventText = document.getElementById("reportContent").value.trim();
    const titleLen = [...title].length;
    if (!twitterId || !title || !eventText) {
      reportMsg.textContent = t("reportNeedFields");
      return;
    }
    if (titleLen < 10 || titleLen > 30) {
      reportMsg.textContent = "主题需 10-30 字";
      return;
    }
    const files = Array.from(document.getElementById("reportEvidence").files || []);
    if (!files.length) {
      reportMsg.textContent = "请上传图片或视频证据";
      return;
    }
    const form = new FormData();
    form.append("twitterId", twitterId);
    form.append("title", title);
    form.append("content", eventText);
    form.append("credibility", "待审核");
    files.forEach((f) => form.append("evidence", f));
    try {
      await api("/exposes", { method: "POST", body: form });
      reportMsg.textContent = t("reportSubmitted");
      reportForm.reset();
      if (exposeModal) {
        exposeModal.setAttribute("aria-hidden", "true");
        exposeModal.classList.remove("open");
      }
      await loadExposes();
    } catch (err) {
      reportMsg.textContent = t("reportFail", { error: err.message });
    }
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", async () => {
    tabs.forEach((x) => x.classList.remove("active"));
    tab.classList.add("active");
    state.currentRank = tab.dataset.rank;
    await loadKols();
  });
});

kolList.addEventListener("click", (e) => {
  const goExposeBtn = e.target.closest("[data-go-expose]");
  if (goExposeBtn) {
    window.location.hash = "comment";
    setActiveModule("comment");
    return;
  }
  const voteBtn = e.target.closest("[data-kol-vote]");
  if (voteBtn) {
    openVoteModal(voteBtn.dataset.kolVote);
    return;
  }
  const reviewsBtn = e.target.closest("[data-kol-reviews]");
  if (reviewsBtn) {
    openReviewsModal(reviewsBtn.dataset.kolReviews);
  }
});

voteModalClose.addEventListener("click", closeVoteModal);
voteModal.addEventListener("click", (e) => {
  if (e.target === voteModal) closeVoteModal();
});

if (reviewsModalClose) reviewsModalClose.addEventListener("click", closeReviewsModal);
if (reviewsModal) {
  reviewsModal.addEventListener("click", (e) => {
    if (e.target === reviewsModal) closeReviewsModal();
  });
}
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (voteModal.classList.contains("open")) closeVoteModal();
    else if (reviewsModal?.classList.contains("open")) closeReviewsModal();
    if (exposeModal?.getAttribute("aria-hidden") === "false") {
      exposeModal.setAttribute("aria-hidden", "true");
      exposeModal.classList.remove("open");
    }
    if (discussModal?.getAttribute("aria-hidden") === "false") {
      discussModal.setAttribute("aria-hidden", "true");
      discussModal.classList.remove("open");
    }
  }
});

if (openExposeModalBtn && exposeModal) {
  openExposeModalBtn.addEventListener("click", () => {
    exposeModal.setAttribute("aria-hidden", "false");
    exposeModal.classList.add("open");
  });
}
if (exposeModalClose && exposeModal) {
  exposeModalClose.addEventListener("click", () => {
    exposeModal.setAttribute("aria-hidden", "true");
    exposeModal.classList.remove("open");
  });
  exposeModal.addEventListener("click", (e) => {
    if (e.target === exposeModal) {
      exposeModal.setAttribute("aria-hidden", "true");
      exposeModal.classList.remove("open");
    }
  });
}
if (discussModalClose && discussModal) {
  discussModalClose.addEventListener("click", () => {
    discussModal.setAttribute("aria-hidden", "true");
    discussModal.classList.remove("open");
  });
  discussModal.addEventListener("click", (e) => {
    if (e.target === discussModal) {
      discussModal.setAttribute("aria-hidden", "true");
      discussModal.classList.remove("open");
    }
  });
}
if (reportList) {
  reportList.addEventListener("click", async (e) => {
    const likeBtn = e.target.closest("[data-expose-like]");
    if (likeBtn) {
      const exposeId = Number(likeBtn.dataset.exposeLike);
      try {
        const res = await api(`/exposes/${exposeId}/react`, {
          method: "POST",
          body: JSON.stringify({ reaction: 1 })
        });
        likeBtn.textContent = `👍 ${Number(res.likes || 0)}`;
      } catch (err) {
        showToast(err.message || "点赞失败");
      }
      return;
    }
    const discussBtn = e.target.closest("[data-expose-discuss]");
    if (discussBtn) {
      await openDiscussModal(Number(discussBtn.dataset.exposeDiscuss), "");
      return;
    }
    if (e.target.closest("a")) return;
    const row = e.target.closest("[data-expose-id]");
    if (!row) return;
    const exposeId = row.dataset.exposeId;
    const title = row.querySelector(".expose-card-title")?.textContent?.trim() || "";
    await openDiscussModal(exposeId, title);
  });
}
if (discussSubmit) {
  discussSubmit.addEventListener("click", async () => {
    const content = discussInput?.value?.trim();
    if (!currentDiscussExposeId || !content) return;
    try {
      await api(`/exposes/${currentDiscussExposeId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content })
      });
      discussInput.value = "";
      await openDiscussModal(currentDiscussExposeId, "");
    } catch (e) {
      showToast(e.message || "发送失败");
    }
  });
}

moduleLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.target;
    window.location.hash = target;
    setActiveModule(target);
  });
});

if (copyDonateAddressBtn) {
  copyDonateAddressBtn.addEventListener("click", async () => {
    const addr = donateAddressInput?.value?.trim();
    if (!addr) return;
    try {
      await navigator.clipboard.writeText(addr);
      showToast(t("copy"));
    } catch (_e) {
      showToast(addr);
    }
  });
}

window.addEventListener("hashchange", () => setActiveModule(getHashModule()));
searchInput.addEventListener("input", () => loadKols());

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateThemeButton();
});

langToggle.addEventListener("click", async () => {
  state.lang = state.lang === "zh" ? "en" : "zh";
  applyI18n();
  await loadKols();
  await loadExposes();
  updateModalTotalScore();
});

async function boot() {
  applyI18n();
  initStars();
  updateThemeButton();
  setActiveModule(getHashModule());
  await fetchAuthMe();
  renderAuthUI();
  setupReviewsListListeners();
  await Promise.all([loadExposes(), loadKols()]);
}

boot().catch((e) => {
  showToast(`Init failed: ${e.message}`, 12000);
});
