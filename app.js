// Neural Need Web — local-only storage

const DB_KEY = "neural_need_web_v1";
const USER = { id: "local-user", name: "Zixuan", avatar: "Z" };

// ---------- Utilities ----------
const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);
const nowISO = () => new Date().toISOString();

function loadDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);

  // seed
  const seedNeedId = uid();
  const seed = {
    needs: [
      {
        id: seedNeedId,
        authorId: USER.id,
        authorName: USER.name,
        title: "Need: build a local-only Neural Web MVP",
        body:
          "Goal: only Need posts + interactions (comments & interest). Keep it offline and open-source.\n\nConstraints:\n- text-only thread\n- simple search\n- clean Apple-like UI (white + glass + subtle metal)",
        tags: ["BCI", "platform", "MVP"],
        createdAt: nowISO(),
        lastActivityAt: nowISO(),
        interestUserIds: [],
      },
    ],
    comments: [
      {
        id: uid(),
        needId: seedNeedId,
        authorId: USER.id,
        authorName: USER.name,
        text: "First comment: this is the minimal interaction thread. Add more comments to test persistence.",
        createdAt: nowISO(),
      },
    ],
  };

  localStorage.setItem(DB_KEY, JSON.stringify(seed));
  return seed;
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

function summarize(text, max = 140) {
  const t = (text || "").trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + "…";
}

function normalizeTag(s) {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

// ---------- State ----------
let db = loadDB();
let selectedNeedId = null;
let searchQuery = "";

// ---------- DOM ----------
const el = (id) => document.getElementById(id);

const needListEl = el("needList");
const feedMetaEl = el("feedMeta");
const searchInputEl = el("searchInput");

const detailEmptyEl = el("detailEmpty");
const detailEl = el("detail");
const detailTitleEl = el("detailTitle");
const detailMetaEl = el("detailMeta");
const detailTagsEl = el("detailTags");
const detailBodyEl = el("detailBody");

const interestBtnEl = el("interestBtn");
const deleteNeedBtnEl = el("deleteNeedBtn");

const commentListEl = el("commentList");
const threadMetaEl = el("threadMeta");
const commentInputEl = el("commentInput");
const sendCommentBtnEl = el("sendCommentBtn");

const newNeedBtnEl = el("newNeedBtn");
const modalBackdropEl = el("modalBackdrop");
const modalEl = el("modal");
const closeModalBtnEl = el("closeModalBtn");
const needTitleInputEl = el("needTitleInput");
const needTagsInputEl = el("needTagsInput");
const needBodyInputEl = el("needBodyInput");
const createNeedBtnEl = el("createNeedBtn");

el("userName").textContent = USER.name;

// ---------- Render ----------
function getNeedComments(needId) {
  return db.comments
    .filter((c) => c.needId === needId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function getFilteredNeeds() {
  const q = searchQuery.trim().toLowerCase();
  let needs = [...db.needs];

  if (q) {
    needs = needs.filter((n) => {
      const inTitle = (n.title || "").toLowerCase().includes(q);
      const inTags = (n.tags || []).some((t) => t.toLowerCase().includes(q));
      return inTitle || inTags;
    });
  }

  // Sort by lastActivityAt desc
  needs.sort((a, b) => new Date(b.lastActivityAt) - new Date(a.lastActivityAt));
  return needs;
}

function renderFeed() {
  const needs = getFilteredNeeds();
  feedMetaEl.textContent = `${needs.length} item${needs.length === 1 ? "" : "s"}`;

  needListEl.innerHTML = needs
    .map((n) => {
      const comments = getNeedComments(n.id);
      const isSelected = n.id === selectedNeedId;
      const interestCount = (n.interestUserIds || []).length;

      const tags = (n.tags || [])
        .slice(0, 6)
        .map((t) => `<span class="pill">#${escapeHTML(t)}</span>`)
        .join("");

      return `
      <div class="card" data-id="${n.id}" style="${isSelected ? "outline:2px solid rgba(60,120,255,0.25);" : ""}">
        <div class="cardTitle">${escapeHTML(n.title)}</div>
        <div class="cardBody">${escapeHTML(summarize(n.body, 180))}</div>
        <div class="cardMeta">
          <span class="pill">🕒 ${escapeHTML(formatTime(n.createdAt))}</span>
          <span class="pill">💬 ${comments.length}</span>
          <span class="pill">☆ ${interestCount}</span>
          ${tags}
        </div>
      </div>`;
    })
    .join("");

  // bind click
  [...needListEl.querySelectorAll(".card")].forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      selectNeed(id);
    });
  });
}

function renderDetail() {
  const need = db.needs.find((n) => n.id === selectedNeedId);
  if (!need) {
    detailEmptyEl.classList.remove("hidden");
    detailEl.classList.add("hidden");
    return;
  }

  detailEmptyEl.classList.add("hidden");
  detailEl.classList.remove("hidden");

  detailTitleEl.textContent = need.title;
  detailMetaEl.textContent = `By ${need.authorName} • Created ${formatTime(need.createdAt)} • Active ${formatTime(need.lastActivityAt)}`;

  detailTagsEl.innerHTML = (need.tags || [])
    .map((t) => `<span class="tag">#${escapeHTML(t)}</span>`)
    .join("");

  detailBodyEl.textContent = need.body;

  const interestCount = (need.interestUserIds || []).length;
  const interested = (need.interestUserIds || []).includes(USER.id);
  interestBtnEl.textContent = `${interested ? "★ Interested" : "☆ Interest"}  (${interestCount})`;

  const comments = getNeedComments(need.id);
  threadMetaEl.textContent = `${comments.length} comment${comments.length === 1 ? "" : "s"}`;

  commentListEl.innerHTML = comments
    .map((c) => {
      return `
      <div class="comment">
        <div class="commentMeta">
          <div><strong>${escapeHTML(c.authorName)}</strong></div>
          <div>${escapeHTML(formatTime(c.createdAt))}</div>
        </div>
        <div class="commentText">${escapeHTML(c.text)}</div>
      </div>`;
    })
    .join("");
}

function renderAll() {
  renderFeed();
  renderDetail();
}

// ---------- Actions ----------
function selectNeed(id) {
  selectedNeedId = id;
  commentInputEl.value = "";
  renderAll();
}

function openModal() {
  modalBackdropEl.classList.remove("hidden");
  modalEl.classList.remove("hidden");
  needTitleInputEl.value = "";
  needTagsInputEl.value = "";
  needBodyInputEl.value = "";
  needTitleInputEl.focus();
}

function closeModal() {
  modalBackdropEl.classList.add("hidden");
  modalEl.classList.add("hidden");
}

function createNeed() {
  const title = needTitleInputEl.value.trim();
  const body = needBodyInputEl.value.trim();
  const tagsRaw = needTagsInputEl.value.trim();

  if (!title) return alert("Title is required.");
  if (!body) return alert("Body is required.");

  const tags = tagsRaw
    ? tagsRaw.split(",").map(normalizeTag).filter(Boolean).slice(0, 20)
    : [];

  const id = uid();
  const t = nowISO();
  const need = {
    id,
    authorId: USER.id,
    authorName: USER.name,
    title,
    body,
    tags,
    createdAt: t,
    lastActivityAt: t,
    interestUserIds: [],
  };

  db.needs.unshift(need);
  saveDB(db);
  closeModal();
  selectNeed(id);
}

function postComment() {
  const need = db.needs.find((n) => n.id === selectedNeedId);
  if (!need) return;

  const text = commentInputEl.value.trim();
  if (!text) return;

  const c = {
    id: uid(),
    needId: need.id,
    authorId: USER.id,
    authorName: USER.name,
    text,
    createdAt: nowISO(),
  };

  db.comments.push(c);
  need.lastActivityAt = c.createdAt;
  saveDB(db);

  commentInputEl.value = "";
  renderAll();
}

function toggleInterest() {
  const need = db.needs.find((n) => n.id === selectedNeedId);
  if (!need) return;

  need.interestUserIds = need.interestUserIds || [];
  const idx = need.interestUserIds.indexOf(USER.id);
  if (idx >= 0) need.interestUserIds.splice(idx, 1);
  else need.interestUserIds.push(USER.id);

  need.lastActivityAt = nowISO();
  saveDB(db);
  renderAll();
}

function deleteNeed() {
  const need = db.needs.find((n) => n.id === selectedNeedId);
  if (!need) return;

  const ok = confirm("Delete this Need? This will remove its comments too (local only).");
  if (!ok) return;

  db.needs = db.needs.filter((n) => n.id !== selectedNeedId);
  db.comments = db.comments.filter((c) => c.needId !== selectedNeedId);
  saveDB(db);

  selectedNeedId = null;
  renderAll();
}

// ---------- Events ----------
searchInputEl.addEventListener("input", (e) => {
  searchQuery = e.target.value || "";
  renderFeed();
});

newNeedBtnEl.addEventListener("click", openModal);
closeModalBtnEl.addEventListener("click", closeModal);
modalBackdropEl.addEventListener("click", closeModal);
createNeedBtnEl.addEventListener("click", createNeed);

interestBtnEl.addEventListener("click", toggleInterest);
deleteNeedBtnEl.addEventListener("click", deleteNeed);
sendCommentBtnEl.addEventListener("click", postComment);

commentInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    postComment();
  }
});

// initial render
renderAll();
