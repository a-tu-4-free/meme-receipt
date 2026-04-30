// ==================== script.js ====================

let memes = null;
let memesReady = false;

// ==================== INIT ====================
function loadMemes() {
    fetch("memes.json", { cache: "no-store" })
        .then(r => {
            if (!r.ok) throw new Error("memes.json not found");
            return r.json();
        })
        .then(d => {
            memes = d;
            memesReady = true;
            console.log("✅ memes.json 載入成功");
            generate();
        })
        .catch(err => {
            console.error(err);
            const result = document.getElementById("result");
            if (result) result.innerHTML = "SYSTEM FAILURE: CORE DATABASE MISSING";
        });
}

// ==================== CORE TOOLS ====================
const rand = arr => arr && arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : "【系統載入中...】";

function fillTemplate(str) {
    if (!str) return "";
    return str
        .replace(/{days}/g, () => Math.floor(Math.random() * 850 + 20))
        .replace(/{money}/g, () => Math.floor(Math.random() * 4500 + 300) + "萬")
        .replace(/{num}/g, () => Math.floor(Math.random() * 99999))
        .replace(/{year}/g, () => 2024 + Math.floor(Math.random() * 5));
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

// ==================== 人頭等級嘲諷系統（重點） ====================
function getHeadLevel() {
    const normalLevels = [
        "特級人頭供養者",
        "一級洗錢小草",
        "木可認證金流師",
        "橘子運輸中隊長",
        "1500萬級別金主",
        "B18姊夫唯一",
        "兒子要結婚用的",
        "政治獻金優化師",
        "17年刑期預備役",
        "偽造文書高手",
        "容積率創意總監",
        "雙載志工督導",
        "A錢不難等級",
        "系統性匿報者",
        "黑箱作業認證",
        "小草募款機器",
        "柯學高級信徒",
        "民眾堂核心金流",
        "拉得慢等級",
		"公雞金等級"
    ];

    const rareLevels = [
        "🌟 神級人頭 · 連特偵組都找不到",
        "🔥 傳說級 · 錢在木可飛",
        "💀 地獄級 · 17年刑期收藏家",
        "🟠 橘色等級 · 抓不到",
        "🏆 民眾堂終身貢獻獎",
        "⚡ 超級金主 · 謝媽媽最愛",
        "🌋 史詩級 · 木可傳奇人物"
    ];

    return Math.random() > 0.82 ? rand(rareLevels) : rand(normalLevels);
}

// ==================== MODE & OUTPUT ====================
function detectMode(text) {
    if (!text) return "SYSTEM";
    if (text.includes("女生") || text.includes("女人")) return "GENDER";
    if (text.includes("政治") || text.includes("民眾") || text.includes("政府") ||
        text.includes("木可") || text.includes("查帳") || text.includes("獻金") ||
        text.includes("柯") || text.includes("賴") || text.includes("侯")) return "POLITICS";
    if (text.includes("醫") || text.includes("手術")) return "MEDICAL";
    if (text.includes("外交") || text.includes("台灣")) return "FOREIGN";
    if (text.includes("人生") || text.includes("哲學")) return "PHILOSOPHY";
    if (text.includes("爆料") || text.includes("系統")) return "SYSTEM";
    return "CHAOS";
}

function render(parts) {
    return parts.filter(Boolean).join("<br><br>");
}

function chaosMath() {
    const a = Math.floor(Math.random() * 900 + 100);
    const b = Math.floor(Math.random() * 900 + 10);
    return `【民眾堂餐費收據系統】<br>
${a} + ${b}<br>
正常：${a + b}<br>
政治解讀：${a + b}<br>
系統判定：加法已進入敘事化`;
}

// ==================== 主要功能 ====================
window.generate = function() {
    if (!memesReady) {
        document.getElementById("result").innerHTML = "系統載入中...";
        return;
    }

    const mode = rand(["NORMAL", "SYSTEM", "GLITCH", "POLITICAL_OVERFLOW", "CHAOS"]);
    let parts = [];

    if (mode === "NORMAL") {
        parts = [
            fillTemplate(rand(memes.openings)),
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.endings))
        ];
    } else if (mode === "SYSTEM") {
        parts = ["【SYSTEM MODE ACTIVE】", fillTemplate(rand(memes.system_weird)), fillTemplate(rand(memes.endings))];
    } else if (mode === "GLITCH") {
        parts = ["▓▒░ SYSTEM CORRUPTION DETECTED ░▒▓", fillTemplate(rand(memes.glitch)), fillTemplate(rand(memes.usages)), "REALITY UNSTABLE"];
    } else if (mode === "POLITICAL_OVERFLOW") {
        parts = [fillTemplate(rand(memes.politics_glitch)), fillTemplate(rand(memes.usages)), "SYSTEM OVERRIDE ACTIVE • 2028"];
    } else {
        parts = [fillTemplate(rand(memes.openings)), fillTemplate(rand(memes.usages)), fillTemplate(rand(memes.glitch)), chaosMath()];
    }

    document.getElementById("result").innerHTML = render(parts);
    document.getElementById("rmoney").innerText = money();
    document.getElementById("rid").innerText = id();
    document.getElementById("rtime").innerText = time();
    document.getElementById("rlevel").innerText = getHeadLevel();   // ← 人頭等級
};

window.buildMemeFromInput = function() {
    const input = document.getElementById("userInput")?.value.trim();
    if (!input) {
        document.getElementById("result").innerHTML = "SYSTEM: INPUT REQUIRED";
        return;
    }

    const parts = [
        `【INPUT】${input}`,
        fillTemplate(rand(memes.openings)),
        fillTemplate(rand(memes.usages)),
        chaosMath()
    ];

    document.getElementById("result").innerHTML = render(parts);
    document.getElementById("rmoney").innerText = money();
    document.getElementById("rid").innerText = id();
    document.getElementById("rtime").innerText = time();
    document.getElementById("rlevel").innerText = getHeadLevel();   // ← 人頭等級
};

window.spam = function() {
    let t = "SYSTEM SPAM MODE<br><br>";
    for (let i = 0; i < 6; i++) {
        t += fillTemplate(rand(memes.usages)) + "<br><br>";
    }
    document.getElementById("result").innerHTML = t;
    document.getElementById("rlevel").innerText = getHeadLevel();
};

window.spamBlack = function() {
    let t = "SYSTEM OVERLOAD MODE<br><br>";
    for (let i = 0; i < 7; i++) {
        t += fillTemplate(rand(memes.glitch || memes.usages)) + "<br><br>";
    }
    document.getElementById("result").innerHTML = t;
    document.getElementById("rlevel").innerText = getHeadLevel();
};

window.download = function() {
    const el = document.getElementById("receipt");
    if (!el) return alert("找不到收據元素！");
    
    html2canvas(el, { scale: 2, backgroundColor: "#fff" })
        .then(canvas => {
            const a = document.createElement("a");
            a.download = `MEMECORE_${Date.now()}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        });
};

// Share Functions
window.shareToFB = function() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

window.shareToX = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("MEME CORE 系統崩壞中");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
};

window.shareToThreads = function() {
    const text = "MEME CORE 系統崩壞中 " + window.location.href;
    navigator.clipboard.writeText(text)
        .then(() => alert("已複製，可以貼到 Threads"))
        .catch(() => alert("複製失敗"));
};

window.shareToIG = function() {
    alert("IG 不支援網頁直接分享，請先下載圖片再上傳");
};

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

// Modal 控制
window.enterSystem = function(ok) {
    document.getElementById("introModal").style.display = "none";
    if (ok) {
        loadMemes();
    } else {
        document.getElementById("result").innerHTML = "SYSTEM OFFLINE";
    }
};

console.log("✅ MEME CORE script.js 載入完成（人頭等級已強化）");