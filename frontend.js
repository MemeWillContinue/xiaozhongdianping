const API_BASE = "/api";

const state = {
  lang: "zh",
  theme: "day",
  currentRank: "top",
  wallet: null,
  kols: []
};

const i18n = {
  zh: {
    brandName: "小众点评",
    pageTitle: "小众点评 - 链上真实投票的KOL照妖镜",
    searchPlaceholder: "搜索KOL名称或推特ID",
    tabTop: "Top榜",
    tabBlack: "黑榜",
    tabNew: "新晋榜",
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
    bottomSubmit: "提交",
    bottomExpose: "爆料",
    bottomNotice: "说明",
    themeToggleAria: "切换黑白主题",
    day: "DAY",
    night: "NIGHT",
    walletConnect: "连接钱包",
    walletConnected: "已连接 {wallet}",
    donationNeedWallet: "请先连接钱包。",
    donationOk: "捐赠验证成功，金额 {amount} USDT。你现在可以真实投票。",
    donationErr: "捐赠验证失败：{error}",
    voteBtn: "投票",
    labelTwitterId: "推特ID",
    labelFollowers: "粉丝",
    labelRiskLevel: "风险等级",
    ratingLine: "{score}分，{votes}人点评",
    noMatch: "当前条件下没有匹配KOL。",
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
    blackFeedTitle: "黑料榜",
    alphaFeedTitle: "神单榜",
    totalScore: "总分：{score} / 5.0",
    modalNote:
      "安全可靠指存在诈骗、割韭菜等过往史，一星为最高风险。<br />请理性投票，恶意评价将会导致封号。",
    submitScoreSimple: "提交评分"
  },
  en: {
    brandName: "Niche Review",
    pageTitle: "Niche Review - On-chain KOL Voting",
    searchPlaceholder: "Search KOL name or Twitter ID",
    tabTop: "Top",
    tabBlack: "Blacklist",
    tabNew: "Rising",
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
    bottomSubmit: "Submit",
    bottomExpose: "Expose",
    bottomNotice: "Notice",
    themeToggleAria: "Toggle day/night theme",
    day: "DAY",
    night: "NIGHT",
    walletConnect: "Connect Wallet",
    walletConnected: "Connected {wallet}",
    donationNeedWallet: "Connect wallet first.",
    donationOk: "Donation verified: {amount} USDT. Real voting is unlocked.",
    donationErr: "Donation verification failed: {error}",
    voteBtn: "Vote",
    labelTwitterId: "Twitter ID",
    labelFollowers: "Followers",
    labelRiskLevel: "Risk",
    ratingLine: "{score}, {votes} ratings",
    noMatch: "No KOL matches current filter.",
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
    blackFeedTitle: "Blacklist Feed",
    alphaFeedTitle: "Alpha Feed",
    totalScore: "Total: {score} / 5.0",
    modalNote:
      "Safety indicates possible scam/rug history; 1-star means highest risk.<br />Vote rationally. Malicious ratings may lead to bans.",
    submitScoreSimple: "Submit"
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

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" })
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "request failed");
  return data;
}

const searchInput = document.getElementById("searchInput");
const tabs = document.querySelectorAll(".tab");
const kolList = document.getElementById("kolList");
const moduleLinks = document.querySelectorAll(".module-link");
const moduleCards = document.querySelectorAll(".module-card");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const donationVerifyForm = document.getElementById("donationVerifyForm");
const donationMsg = document.getElementById("donationMsg");
const donationWalletInput = document.getElementById("donationWallet");
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

let toastTimer = null;

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
  return exists ? m : "kol";
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
  return val || "";
}

async function loadKols() {
  const q = encodeURIComponent(searchInput.value.trim());
  const rank = encodeURIComponent(state.currentRank);
  state.kols = await api(`/kols?rank=${rank}&q=${q}`);
  const all = await api("/kols?rank=all&q=");
  kolSelect.innerHTML = all.map((k) => `<option value="${k.handle}">${k.handle} (${k.twitter_uid || ""})</option>`).join("");
  renderKols();
}

function renderKols() {
  if (!state.kols.length) {
    kolList.innerHTML = `<p class="muted">${t("noMatch")}</p>`;
    return;
  }
  const sep = state.lang === "zh" ? "：" : ": ";
  kolList.innerHTML = state.kols
    .map((k) => {
      const isPinned = k.handle === "xlink_lab";
      const avatarUrl = `/api/avatar/${encodeURIComponent(k.handle)}`;
      const dicebearUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(k.handle)}`;
      const twitterHandle = (k.twitter_uid || k.handle || "").replace(/^@/, "");
      const twitterLink = twitterHandle
        ? `https://x.com/${encodeURIComponent(twitterHandle)}`
        : "";
      const twitterDisplay = k.twitter_uid || (twitterHandle ? `@${twitterHandle}` : "-");
      return `<article class="kol-item ${isPinned ? "kol-item-pinned" : ""}">
        ${isPinned ? `<span class="kol-pinned-badge">${t("pinnedBadge")}</span>` : ""}
        <div class="kol-head">
          <img class="kol-avatar" src="${avatarUrl}" alt="${k.handle}" data-fallback="${dicebearUrl}" onerror="this.onerror=null;this.src=this.dataset.fallback" />
          <div>
            <h3>${k.handle} <span class="badge">${k.tags || ""}</span></h3>
            <p class="kol-rating">${t("ratingLine", { score: Number(k.avg_score || 0).toFixed(1), votes: k.vote_count || 0 })}</p>
          </div>
        </div>
        <p>${t("labelTwitterId")}${sep}${twitterLink ? `<a href="${twitterLink}" target="_blank" rel="noopener" class="kol-twitter-link">${twitterDisplay}</a>` : twitterDisplay}</p>
        <p>${t("labelFollowers")}${sep}${formatFollowers(k.followers)}</p>
        <p>${t("labelRiskLevel")}${sep}${getRiskText(k)}</p>
        <button class="yellow-btn kol-vote-btn" type="button" data-kol-vote="${k.handle}">${t("voteBtn")}</button>
      </article>`;
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
  modalVoteTips.textContent = "";
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

async function loadExposes() {
  const rows = await api("/exposes");
  const sep = state.lang === "zh" ? "：" : ": ";
  reportList.innerHTML = rows
    .map((r) => {
      const evidence = (r.evidence || []).length ? r.evidence.map((x) => `<a href="${x}" target="_blank">file</a>`).join(" / ") : t("noEvidence");
      return `<li><strong>${r.twitter_id}</strong>${sep}${r.event_text}<span class="credibility-tag">${getCredibilityText(r.credibility)}</span><br/>${t("evidence")}${sep}${evidence}</li>`;
    })
    .join("");

  const black = rows.filter((r) => r.credibility !== "完全可信").slice(0, 8);
  const alpha = rows.filter((r) => r.credibility === "完全可信").slice(0, 8);
  blackFeed.innerHTML = black.map((r) => `<li>${r.twitter_id}${sep}${r.event_text}</li>`).join("") || "<li>-</li>";
  alphaFeed.innerHTML = alpha.map((r) => `<li>${r.twitter_id}${sep}${r.event_text}</li>`).join("") || "<li>-</li>";
}

donationVerifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const wallet = donationWalletInput.value.trim().toLowerCase();
  if (!wallet) {
    donationMsg.textContent = t("inputWallet");
    return;
  }
  state.wallet = wallet;
  const chain = document.getElementById("donationChain").value;
  const txHash = document.getElementById("donationTxHash").value.trim();
  try {
    const result = await api("/donations/verify", {
      method: "POST",
      body: JSON.stringify({ wallet, chain, txHash })
    });
    donationMsg.textContent = t("donationOk", { amount: result.amount });
  } catch (err) {
    donationMsg.textContent = t("donationErr", { error: err.message });
  }
});

voteModalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fallbackWallet = document.getElementById("walletInput").value.trim().toLowerCase() || donationWalletInput.value.trim().toLowerCase();
  if (!state.wallet && fallbackWallet) state.wallet = fallbackWallet;
  if (!state.wallet) {
    modalVoteTips.textContent = t("inputWallet");
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
  if (Object.values(scores).every((s) => s === 1) || Object.values(scores).every((s) => s === 5)) {
    showToast(t("toastAllOneOrFive"));
    return;
  }
  try {
    const result = await api("/votes", {
      method: "POST",
      body: JSON.stringify({
        wallet: state.wallet,
        kolHandle: modalKolInput.value,
        comment,
        scores
      })
    });
    modalVoteTips.textContent = t("voteSuccess", { score: result.totalScore });
    await loadKols();
    setTimeout(closeVoteModal, 600);
  } catch (err) {
    modalVoteTips.textContent = t("voteErr", { error: err.message });
  }
});

voteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const wallet = document.getElementById("walletInput").value.trim().toLowerCase();
  if (!wallet) {
    voteTips.textContent = t("inputWallet");
    return;
  }
  state.wallet = wallet;
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
        wallet,
        kolHandle: kolSelect.value,
        comment: "vote-page",
        scores
      })
    });
    voteTips.textContent = t("voteSuccess", { score: result.totalScore });
    await loadKols();
  } catch (err) {
    voteTips.textContent = t("voteErr", { error: err.message });
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

reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const twitterId = document.getElementById("reportTwitterId").value.trim();
  const eventText = document.getElementById("reportEvent").value.trim();
  if (!twitterId || !eventText) {
    reportMsg.textContent = t("reportNeedFields");
    return;
  }
  const form = new FormData();
  form.append("twitterId", twitterId);
  form.append("event", eventText);
  form.append("credibility", document.getElementById("reportCredibility").value);
  Array.from(document.getElementById("reportEvidence").files || []).forEach((f) => form.append("evidence", f));
  try {
    await api("/exposes", { method: "POST", body: form });
    reportMsg.textContent = t("reportSubmitted");
    reportForm.reset();
    await loadExposes();
  } catch (err) {
    reportMsg.textContent = t("reportFail", { error: err.message });
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", async () => {
    tabs.forEach((x) => x.classList.remove("active"));
    tab.classList.add("active");
    state.currentRank = tab.dataset.rank;
    await loadKols();
  });
});

kolList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-kol-vote]");
  if (!btn) return;
  openVoteModal(btn.dataset.kolVote);
});

voteModalClose.addEventListener("click", closeVoteModal);
voteModal.addEventListener("click", (e) => {
  if (e.target === voteModal) closeVoteModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && voteModal.classList.contains("open")) closeVoteModal();
});

moduleLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.target;
    window.location.hash = target;
    setActiveModule(target);
  });
});

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
  await Promise.all([loadKols(), loadExposes()]);
}

boot().catch((e) => {
  showToast(`Init failed: ${e.message}`, 12000);
});
