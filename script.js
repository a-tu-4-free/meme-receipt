let memes = null;
let memesReady = false;

// ==================== 初始化 ====================
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
  .catch(err => {
    document.getElementById("result").innerHTML =
      "SYSTEM ERROR: memes.json missing";
  });

// ==================== 工具 ====================
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function money() {
  return Math.floor(Math.random() * 900000 + 1000).toLocaleString();
}

function id() {
  return "SYS-" + Math.floor(Math.random() * 9999999);
}

function time() {
  return new Date().toLocaleString("zh-TW");
}

// ==================== 使用者輸入 AI（核心） ====================
function buildMemeFromInput() {
  const input = document.getElementById("userInput")?.value;

  if (!input) {
    document.getElementById("result").innerHTML =
      "SYSTEM: 請輸入內容";
    return;
  }

  const mode = rand([
    "SYSTEM_LOG",
    "SYSTEM_ANALYSIS",
    "SYSTEM_CORRECTION",
    "SYSTEM_WARNING",
    "SYSTEM_GLITCH"
  ]);

  let chaos = Math.random(); // 0~1

  let output = "";

  // ================= 系統紀錄 =================
  if (mode === "SYSTEM_LOG") {
    output =
      `【SYSTEM LOG】<br><br>` +
      `INPUT: ${input}<br><br>` +
      `STATUS: 已記錄<br>` +
      `→ 正在進入資料庫`;
  }

  // ================= 分析模式 =================
  else if (mode === "SYSTEM_ANALYSIS") {
    output =
      `【SYSTEM ANALYSIS】<br><br>` +
      `「${input}」<br><br>` +
      `分析結果：<br>` +
      rand(memes.usages) +
      `<br><br>→ 結論：資料不完整`;
  }

  // ================= 補正模式 =================
  else if (mode === "SYSTEM_CORRECTION") {
    output =
      `【SYSTEM CORRECTION】<br><br>` +
      `INPUT: ${input}<br><br>` +
      rand(memes.openings) +
      `<br>` +
      rand(memes.usages) +
      `<br><br>→ 系統正在自動補正`;
  }

  // ================= 警告模式 =================
  else if (mode === "SYSTEM_WARNING") {
    output =
      `【SYSTEM WARNING】<br><br>` +
      `偵測到輸入：${input}<br><br>` +
      `→ 已觸發模糊化處理<br>` +
      `→ 系統建議停止查詢`;
  }

  // ================= 崩壞模式（最有趣） =================
  else {
    output =
      `【SYSTEM GLITCH MODE】<br><br>` +
      `>>> ${input} <<<` +
      `<br><br>` +
      rand(memes.usages) +
      `<br>` +
      rand(memes.usages) +
      `<br><br>` +
      `ERROR: SYSTEM REALITY UNSTABLE`;
  }

  // ================= 亂數加強（互動核心） =================
  if (chaos > 0.7) {
    output += `<br><br>⚠ CHAOS BOOST ACTIVATED ⚠<br>` +
              `SYSTEM OVERDRIVE`;
  }

  document.getElementById("result").innerHTML = output;

  // 更新資訊欄
  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();
}

// ==================== 主生成 ====================
function generate() {
  if (!memesReady) return;

  const mode = rand(["NORMAL", "SYSTEM", "GLITCH"]);

  let output = "";

  if (mode === "NORMAL") {
    output =
      rand(memes.openings) + "<br><br>" +
      rand(memes.usages) + "<br><br>" +
      rand(memes.endings);
  }

  else if (mode === "SYSTEM") {
    output =
      "【SYSTEM MODE】<br><br>" +
      rand(memes.usages) +
      "<br><br>→ processed";
  }

  else {
    output =
      "【GLITCH MODE】<br><br>" +
      rand(memes.usages) + "<br>" +
      rand(memes.usages) +
      "<br><br>ERROR";
  }

  document.getElementById("result").innerHTML = output;

  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();
}

// ==================== 洗版（娛樂模式） ====================
function spam() {
  let t = "SYSTEM SPAM MODE<br><br>";

  for (let i = 0; i < 5; i++) {
    t += generateMeme() + "<br><br>";
  }

  document.getElementById("result").innerHTML = t;
}

function spamBlack() {
  let t = "SYSTEM OVERLOAD MODE<br><br>";

  for (let i = 0; i < 6; i++) {
    t += generateMeme() + "<br><br>";
  }

  document.getElementById("result").innerHTML = t;
}

// ==================== 下載 ====================
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

// ==================== 時間系統 ====================
const startDate = new Date("2024-08-29T00:00:00");

function updateClock() {
  const now = new Date();

  let diff = Math.floor((now - startDate) / 1000);

  const days = Math.floor(diff / 86400);
  diff %= 86400;

  const hours = Math.floor(diff / 3600);
  diff %= 3600;

  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  const el = document.getElementById("rclock");

  if (el) {
    el.innerText = `${days}天 ${hours}時 ${minutes}分 ${seconds}秒`;
  }
}

setInterval(updateClock, 1000);