let memes = null;
let memesReady = false;

// ==================== INIT ====================
fetch("memes.json", { cache: "no-store" })
  .then(r => {
    if (!r.ok) throw new Error("memes.json not found");
    return r.json();
  })
  .then(d => {
    memes = d;
    memesReady = true;
    generate();
  })
  .catch(() => {
    document.getElementById("result").innerHTML =
      "SYSTEM FAILURE: CORE DATABASE MISSING";
  });

// ==================== CORE TOOL ====================
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

function money() {
  return Math.floor(Math.random() * 900000 + 1000).toLocaleString();
}

function id() {
  return "SYS-" + Math.floor(Math.random() * 9999999);
}

function time() {
  return new Date().toLocaleString("zh-TW");
}

// ==================== MODE ENGINE ====================
function detectMode(text) {
  if (!text) return "SYSTEM";

  if (text.includes("女生") || text.includes("女人")) return "GENDER";
  if (text.includes("政治") || text.includes("民眾") || text.includes("政府")) return "POLITICS";
  if (text.includes("醫") || text.includes("手術")) return "MEDICAL";
  if (text.includes("外交") || text.includes("台灣")) return "FOREIGN";
  if (text.includes("人生") || text.includes("哲學")) return "PHILOSOPHY";
  if (text.includes("爆料") || text.includes("系統")) return "SYSTEM";

  return "CHAOS";
}

// ==================== OUTPUT ENGINE ====================
function render(parts) {
  return parts.filter(Boolean).join("<br><br>");
}

// ==================== RECEIPT ENGINE ====================
function chaosMath() {
  const a = Math.floor(Math.random() * 900 + 100);
  const b = Math.floor(Math.random() * 900 + 10);

  return `
【民眾堂餐費收據系統】

${a} + ${b}

正常：${a + b}
政治解讀：${"" + a + b}

系統判定：加法已進入敘事化`;
}

// ==================== AI INPUT ====================
function buildMemeFromInput() {
  const input = document.getElementById("userInput")?.value;

  if (!input) {
    document.getElementById("result").innerHTML = "SYSTEM: INPUT REQUIRED";
    return;
  }

  const mode = detectMode(input);
  const bank = memes.system_weird || memes.usages;

  const output = render([
    `【INPUT】${input}`,
    `【MODE】${mode}`,
    rand(memes.openings || ["SYSTEM BOOT"]),
    rand(bank),
    rand(memes.endings || ["END"]),
    chaosMath(),
    Math.random() > 0.7 ? "⚠ REALITY SHIFT DETECTED" : null
  ]);

  document.getElementById("result").innerHTML = output;

  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();
}

// ==================== MAIN GENERATOR ====================
function generate() {
  if (!memesReady) return;

  const mode = rand(["NORMAL", "SYSTEM", "GLITCH", "POLITICAL_OVERFLOW"]);

  let output = "";

  if (mode === "NORMAL") {
    output = render([
      rand(memes.openings),
      rand(memes.usages),
      rand(memes.endings)
    ]);
  }

  if (mode === "SYSTEM") {
    output = render([
      "SYSTEM MODE ACTIVE",
      rand(memes.system_weird),
      "processed"
    ]);
  }

  if (mode === "GLITCH") {
    output = render([
      "▓▒ SYSTEM CORRUPTION ▒▓",
      rand(memes.glitch || memes.usages),
      rand(memes.usages),
      "REALITY UNSTABLE"
    ]);
  }

  if (mode === "POLITICAL_OVERFLOW") {
    output = render([
      rand(memes.politics_glitch || memes.usages),
      rand(memes.usages),
      rand(memes.system_roles || memes.usages),
      "SYSTEM OVERRIDE ACTIVE"
    ]);
  }

  document.getElementById("result").innerHTML = output;

  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();
}

// ==================== SPAM ====================
function spam() {
  let t = "SYSTEM SPAM MODE<br><br>";
  for (let i = 0; i < 5; i++) {
    t += rand(memes.usages) + "<br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

function spamBlack() {
  let t = "SYSTEM OVERLOAD MODE<br><br>";
  for (let i = 0; i < 6; i++) {
    t += rand(memes.glitch || memes.usages) + "<br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

// ==================== DOWNLOAD ====================
function download() {
  const el = document.getElementById("receipt");

  html2canvas(el, {
    scale: 2,
    backgroundColor: "#fff"
  }).then(canvas => {
    const a = document.createElement("a");
    a.download = `SYSTEM_${Date.now()}.png`;
    a.href = canvas.toDataURL();
    a.click();
  });
}

// ==================== CLOCK ====================
const startDate = new Date("2024-08-29T00:00:00");

function updateClock() {
  const now = new Date();
  let diff = Math.floor((now - startDate) / 1000);

  const d = Math.floor(diff / 86400); diff %= 86400;
  const h = Math.floor(diff / 3600); diff %= 3600;
  const m = Math.floor(diff / 60);
  const s = diff % 60;

  const el = document.getElementById("rclock");
  if (el) el.innerText = `${d}天 ${h}時 ${m}分 ${s}秒`;
}

setInterval(updateClock, 1000);

// ==================== SHARE ====================

function shareToFB(){
  const url = encodeURIComponent(window.location.href);

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    "_blank"
  );
}

function shareToX(){
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("MEME CORE 系統崩壞中");

  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
}

function shareToThreads(){
  const text = "MEME CORE 系統崩壞中 " + window.location.href;

  // Threads 沒正式 API → 用複製
  navigator.clipboard.writeText(text)
    .then(() => alert("已複製，貼到 Threads"))
    .catch(() => alert("複製失敗"));
}

function shareToIG(){
  alert("IG 不支援網頁分享，請用下載圖片再上傳");
}