let memes = null;
let memesReady = false;

// ==================== 載入詞庫 ====================
fetch("memes.json", { cache: "no-store" })
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status} - memes.json 檔案不存在`);
    return r.json();
  })
  .then(d => {
    memes = d;
    memesReady = true;

    console.log("✅ 詞庫載入成功！共", d.usages ? d.usages.length : 0, "條用法");

    // 避免重複觸發
    setTimeout(() => {
      generate();
    }, 200);
  })
  .catch(err => {
    console.error("❌ 載入失敗:", err);

    const resultEl = document.getElementById("result");
    if (resultEl) {
      resultEl.innerHTML = `
        <span style="color:#dc2626; font-weight:bold;">
          【詞庫載入失敗】<br><br>
          ${err.message}<br><br>
          • 檔案需為 memes.json<br>
          • 與 index.html 同資料夾<br>
          • GitHub Pages 請 Ctrl+Shift+R
        </span>`;
    }
  });

// ==================== 工具函數 ====================
function rand(a) {
  if (!a || a.length === 0) return "（詞庫異常）";
  return a[Math.floor(Math.random() * a.length)];
}

function money() {
  return Math.floor(Math.random() * 800000 + 1000).toLocaleString();
}

function id() {
  return "MT-" + String(Math.floor(Math.random() * 9000000) + 1000000).padStart(7, '0');
}

function level() {
  return rand([
    "LEVEL 1 可識別",
    "LEVEL 2 模糊",
    "LEVEL 3 匿名",
    "LEVEL 4 不存在",
    "LEVEL 5 正在補正"
  ]);
}

function time() {
  return new Date().toLocaleString('zh-TW');
}

// ==================== 核心生成 ====================
function generateMeme() {
  if (!memesReady || !memes) return "詞庫尚未載入，請稍候...";

  if (Math.random() < 0.06 && memes.rare?.length > 0) {
    return rand(memes.rare);
  }

  return (
    rand(memes.openings) + "<br><br>" +
    rand(memes.usages) + "<br><br>" +
    rand(memes.usages) + "<br><br>" +
    rand(memes.endings)
  );
}

// ==================== 主生成 ====================
function generate() {
  if (!memesReady) {
    document.getElementById("result").innerHTML =
      "⏳ 詞庫載入中...請稍候";
    return;
  }

  document.getElementById("result").innerHTML = generateMeme();
  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();

  const rlevel = document.getElementById("rlevel");
  if (rlevel) rlevel.innerText = level();
}

// ==================== 洗版 ====================
function spam() {
  if (!memesReady) return;

  let t = "<strong>【一般洗版】</strong><br><br>";

  for (let i = 0; i < 5; i++) {
    t += generateMeme() + "<br><br><br>";
  }

  document.getElementById("result").innerHTML = t;
}

function spamBlack() {
  if (!memesReady) return;

  let t = "<strong style='color:#b91c1c;'>【查帳黑毒加強版】</strong><br><br>";

  for (let i = 0; i < 6; i++) {
    const extra = Math.random() < 0.65;

    let text = extra
      ? rand(memes.openings) + "<br><br>" +
        rand(memes.usages) + "<br><br>" +
        rand(memes.usages) + "<br><br>" +
        rand(memes.usages) + "<br><br>" +
        rand(memes.endings)
      : generateMeme();

    t += text + "<br><br><br>";
  }

  document.getElementById("result").innerHTML = t;
}

// ==================== 下載 ====================
function download() {
  const receipt = document.getElementById("receipt");

  html2canvas(receipt, {
    scale: 2,
    backgroundColor: "#ffffff"
  }).then(canvas => {
    const a = document.createElement("a");
    a.download = `民眾堂收據_${Date.now()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
}

// ==================== 🔥 新增：分享文案工具 ====================
function getShareText() {
  const text =
`民眾堂政治獻金收據生成器

收據編號：${id()}
金額：NT$ ${money()}
匿名等級：${level()}

「方向是對的，只是憑證還沒對齊」

#迷因 #查帳 #系統生成`;

  return encodeURIComponent(text);
}

// （給你之後 IG / Threads / X 可直接用）
function shareTextOnly() {
  return getShareText();
}