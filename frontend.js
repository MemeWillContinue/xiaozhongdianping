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
    searchPlaceholder: "搜索KOL名称或推特ID",
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
    searchPlaceholder: "Search KOL name or Twitter ID",
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
  let text = dict[key] || key;
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
    if (i18n[state.lang]?.[k]) el.textContent = i18n[state.lang][k];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const k = el.dataset.i18nPlaceholder;
    if (i18n[state.lang]?.[k]) el.placeholder = i18n[state.lang][k];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const k = el.dataset.i18nHtml;
    if (i18n[state.lang]?.[k]) el.innerHTML = i18n[state.lang][k];
  });
  langToggle.textContent = state.lang === "zh" ? "中文/EN" : "EN/中文";
  updateThemeButton();
}

function getRiskText(kol) {
  const risk = Number(kol.risk_index || 0);
  if (risk >= 3) return state.lang === "zh" ? "高风险" : "High";
  if (risk >= 1.7) return state.lang === "zh" ? "中风险" : "Medium";
  return state.lang === "zh" ? "安全" : "Low";
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
  kolList.innerHTML = state.kols
    .map((k) => {
      const avatar = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(k.handle)}`;
      return `<article class="kol-item">
        <div class="kol-head">
          <img class="kol-avatar" src="${avatar}" alt="${k.handle}" />
          <div>
            <h3>${k.handle} <span class="badge">${k.tags || ""}</span></h3>
            <p class="kol-rating">${t("ratingLine", { score: Number(k.avg_score || 0).toFixed(1), votes: k.vote_count || 0 })}</p>
          </div>
        </div>
        <p>${t("labelTwitterId")}：${k.twitter_uid || "-"}</p>
        <p>${t("labelFollowers")}：${k.followers || 0}</p>
        <p>${t("labelRiskLevel")}：${getRiskText(k)}</p>
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
  reportList.innerHTML = rows
    .map((r) => {
      const evidence = (r.evidence || []).length ? r.evidence.map((x) => `<a href="${x}" target="_blank">file</a>`).join(" / ") : t("noEvidence");
      return `<li><strong>${r.twitter_id}</strong>：${r.event_text}<span class="credibility-tag">${r.credibility}</span><br/>${t("evidence")}：${evidence}</li>`;
    })
    .join("");

  const black = rows.filter((r) => r.credibility !== "完全可信").slice(0, 8);
  const alpha = rows.filter((r) => r.credibility === "完全可信").slice(0, 8);
  blackFeed.innerHTML = black.map((r) => `<li>${r.twitter_id}：${r.event_text}</li>`).join("") || "<li>-</li>";
  alphaFeed.innerHTML = alpha.map((r) => `<li>${r.twitter_id}：${r.event_text}</li>`).join("") || "<li>-</li>";
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
