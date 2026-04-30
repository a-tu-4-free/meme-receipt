let memes = null;

// 載入詞庫
fetch("memes.json")
  .then(r => {
    if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
    return r.json();
  })
  .then(d => {
    memes = d;
    console.log("✅ 詞庫載入成功");
    generate();           // 載入成功後自動產生一次
  })
  .catch(err => {
    console.error("❌ 載入 memes.json 失敗", err);
    const resultEl = document.getElementById("result");
    if (resultEl) {
      resultEl.innerHTML = `<span style="color:red; font-weight:bold;">
        錯誤：memes.json 詞庫載入失敗！<br>
        請確認檔案名稱為「memes.json」且與 index.html 在同一資料夾
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

// ==================== 核心：更黑毒版 generateMeme ====================
function generateMeme() {
  if (!memes) return "詞庫尚未載入...";

  // 提高黑毒梗出現機率（50%）
  const isBlackMode = Math.random() < 0.50;

  // 極低機率出現 rare
  if (Math.random() < 0.06 && memes.rare && memes.rare.length > 0) {
    return rand(memes.rare);
  }

  if (isBlackMode) {
    // 黑毒模式：更容易出現狠句
    return rand(memes.openings) + "<br><br>" +
           rand(memes.usages) + "<br><br>" +
           rand(memes.usages) + "<br><br>" +
           rand(memes.endings);
  } else {
    // 普通模式
    return rand(memes.openings) + "<br><br>" +
           rand(memes.usages) + "<br><br>" +
           rand(memes.usages) + "<br><br>" +
           rand(memes.endings);
  }
}

// ==================== 主要功能 ====================
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

// 專門的黑毒洗版模式
function spamBlack() {
  if (!memes) return;

  let t = "";
  for (let i = 0; i < 7; i++) {
    // 強制黑毒模式 + 提高毒句密度
    const text = rand(memes.openings) + "<br><br>" +
                 rand(memes.usages) + "<br><br>" +
                 rand(memes.usages) + "<br><br>" +
                 rand(memes.usages) + "<br><br>" +   // 多一句 usages 增加毒度
                 rand(memes.endings);
    t += text + "<br><br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

function download() {
  const receipt = document.getElementById("receipt");
  
  html2canvas(receipt, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  }).then(canvas => {
    const a = document.createElement("a");
    a.download = `民眾堂收據_${Date.now()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
}