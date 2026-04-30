let memes = null;

// 載入詞庫
fetch("memes.json", { cache: "no-store" })
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status} - memes.json 檔案不存在`);
    return r.json();
  })
  .then(d => {
    memes = d;
    console.log("✅ 詞庫載入成功！共", d.usages ? d.usages.length : 0, "條用法");
    generate();                    // 載入成功後自動產生一次
  })
  .catch(err => {
    console.error("❌ 載入失敗:", err);
    const resultEl = document.getElementById("result");
    if (resultEl) {
      resultEl.innerHTML = `
        <span style="color:#dc2626; font-weight:bold;">
          【詞庫載入失敗】<br><br>
          ${err.message}<br><br>
          解決方法：<br>
          • 確認檔案名稱為 <b>memes.json</b>（全部小寫）<br>
          • 檔案必須與 index.html 在同一資料夾<br>
          • GitHub Pages 請等待 1~2 分鐘後再強制刷新 (Ctrl + Shift + R)
        </span>`;
    }
  });

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
  return rand(["LEVEL 1 可識別", "LEVEL 2 模糊", "LEVEL 3 匿名", "LEVEL 4 不存在", "LEVEL 5 正在補正"]);
}

function time() {
  return new Date().toLocaleString('zh-TW');
}

// 核心生成函數
function generateMeme() {
  if (!memes) return "詞庫尚未載入，請稍候...";

  const isBlackMode = Math.random() < 0.55;

  if (Math.random() < 0.06 && memes.rare && memes.rare.length > 0) {
    return rand(memes.rare);
  }

  return rand(memes.openings) + "<br><br>" +
         rand(memes.usages) + "<br><br>" +
         rand(memes.usages) + "<br><br>" +
         rand(memes.endings);
}

// 主要功能
function generate() {
  if (!memes) return;

  document.getElementById("result").innerHTML = generateMeme();
  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();

  const rlevel = document.getElementById("rlevel");
  if (rlevel) rlevel.innerText = level();
}

// ==================== 優化後的洗版功能 ====================
function spam() {
  if (!memes) return;
  
  let t = "<strong>【一般洗版】</strong><br><br>";
  const count = 5;   // 減少到5句，避免過度重複

  for (let i = 0; i < count; i++) {
    t += generateMeme() + "<br><br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

function spamBlack() {
  if (!memes) return;
  
  let t = "<strong style='color:#b91c1c;'>【查帳黑毒加強版】</strong><br><br>";
  const count = 6;

  for (let i = 0; i < count; i++) {
    // 隨機增加毒度變化
    const extraToxic = Math.random() < 0.65;
    let text = "";

    if (extraToxic) {
      text = rand(memes.openings) + "<br><br>" +
             rand(memes.usages) + "<br><br>" +
             rand(memes.usages) + "<br><br>" +
             rand(memes.usages) + "<br><br>" +
             rand(memes.endings);
    } else {
      text = generateMeme();
    }
    
    t += text + "<br><br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

// 下載功能
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