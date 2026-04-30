let memes = null;

// 載入詞庫
fetch("memes.json")
  .then(r => r.json())
  .then(d => {
    memes = d;
    console.log("✅ 詞庫載入成功");
    generate();        // 載入完成後自動產生一次
  })
  .catch(err => {
    console.error("❌ 載入 memes.json 失敗", err);
    alert("詞庫載入失敗，請確認 memes.json 檔案存在！");
  });

function rand(a) {
  if (!a || a.length === 0) return "（詞庫載入異常）";
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

// 更黑毒版 generateMeme - 提高查帳與毒梗出現率
function generateMeme() {
  const isBlackMode = Math.random() < 0.45;   // 45% 機率進入黑毒模式

  if (Math.random() < 0.08 && memes.rare) {
    return rand(memes.rare);
  }

  if (isBlackMode) {
    // 黑毒模式：更容易出現查帳、17年、搞定司法等梗
    return rand(memes.openings) +
           "<br><br>" +
           rand(memes.usages) +
           "<br><br>" +
           rand(memes.usages) +   // 第二句更容易是毒句
           "<br><br>" +
           rand(memes.endings);
  } else {
    // 一般模式
    return rand(memes.openings) +
           "<br><br>" +
           rand(memes.usages) +
           "<br><br>" +
           rand(memes.usages) +
           "<br><br>" +
           rand(memes.endings);
  }
}

function generate() {
  if (!memes) return;

  document.getElementById("result").innerHTML = generateMeme();
  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();

  const rlevel = document.getElementById("rlevel");
  if (rlevel) {
    rlevel.innerText = level();
  }
}

function spam() {
  if (!memes) return;

  let t = "";
  for (let i = 0; i < 8; i++) {
    t += generateMeme() + "<br><br><br>";
  }
  document.getElementById("result").innerHTML = t;
}

// 新增：專門的「查帳黑毒洗版」模式（可選）
function spamBlack() {
  if (!memes) return;

  let t = "";
  for (let i = 0; i < 7; i++) {
    // 強制使用黑毒模式
    const text = rand(memes.openings) +
                 "<br><br>" +
                 rand(memes.usages) +
                 "<br><br>" +
                 rand(memes.usages) +
                 "<br><br>" +
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