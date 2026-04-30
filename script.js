let memes = null;

// 載入詞庫
fetch("memes.json")
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status} - memes.json 檔案不存在`);
    return r.json();
  })
  .then(d => {
    memes = d;
    console.log("✅ 詞庫載入成功！共", d.usages ? d.usages.length : 0, "條用法");
    generate();                    // 載入成功後自動產生
  })
  .catch(err => {
    console.error("❌ 載入失敗:", err);
    const resultEl = document.getElementById("result");
    if (resultEl) {
      resultEl.innerHTML = `
        <span style="color:#dc2626; font-weight:bold;">
          【詞庫載入失敗】<br><br>
          ${err.message}<br><br>
          請確認：<br>
          • 檔案名稱必須為 <b>memes.json</b>（全部小寫）<br>
          • 檔案必須與 index.html 在同一資料夾<br>
          • 如果是 GitHub Pages，請等 1~2 分鐘後重新整理
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

// 核心函數
function generateMeme() {
  if (!memes) return "詞庫尚未載入，請稍候...";

  const isBlackMode = Math.random() < 0.55;   // 55% 機率黑毒模式

  // 極低機率出現 rare（安全防護）
  if (Math.random() < 0.05 && memes.rare && memes.rare.length > 0) {
    return rand(memes.rare);
  }

  return rand(memes.openings) + "<br><br>" +
         rand(memes.usages) + "<br><br>" +
         rand(memes.usages) + "<br><br>" +
         rand(memes.endings);
}

function generate() {
  if (!memes) return;
  
  document.getElementById("result").innerHTML = generateMeme();
  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();

  const rlevel = document.getElementById("rlevel");
  if (rlevel) rlevel.innerText = level();
}

function spam() {
  if (!memes) return;
  let t = "";
  for (let i = 0; i < 8; i++) {
    t += generateMeme() + "<br><br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

function spamBlack() {
  if (!memes) return;
  let t = "";
  for (let i = 0; i < 7; i++) {
    const text = rand(memes.openings) + "<br><br>" +
                 rand(memes.usages) + "<br><br>" +
                 rand(memes.usages) + "<br><br>" +
                 rand(memes.usages) + "<br><br>" +
                 rand(memes.endings);
    t += text + "<br><br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

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