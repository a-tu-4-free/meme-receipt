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
  return a[Math.floor(Math.random() * a.length)];
}

function money() {
  return Math.floor(Math.random() * 800000 + 1000).toLocaleString();
}

function id() {
  return "MT-" + String(Math.floor(Math.random() * 9000000) + 1000000).padStart(7, '0');
}

function level() {
  return rand(["LEVEL 1 可識別", "LEVEL 2 模糊", "LEVEL 3 匿名", "LEVEL 4 不存在"]);
}

function time() {
  return new Date().toLocaleString('zh-TW');
}

// 改進版 generateMeme
function generateMeme() {
  if (Math.random() < 0.07 && memes.rare) {
    return rand(memes.rare);
  }

  return rand(memes.openings) + 
         "<br><br>" + 
         rand(memes.usages) + 
         "<br><br>" + 
         rand(memes.usages) + 
         "<br><br>" + 
         rand(memes.endings);
}

function generate() {
  if (!memes) return;

  document.getElementById("result").innerHTML = generateMeme();
  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();
  if (document.getElementById("rlevel")) {
    document.getElementById("rlevel").innerText = level();
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