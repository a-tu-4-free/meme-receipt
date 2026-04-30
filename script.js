// ==================== script.js v2 完整版 ====================
import {
    genMoney,
    genId,
    genTime,
    genLevel,
    genComment,
    generateReceipt
} from "./generator.js";

import {
    renderReceiptsUI,
    renderCommentUI
} from "./ui.js";
let memes = null;
let memesReady = false;
let currentReceipts = [];

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
            generate();
        })
        .catch(err => {
            console.error(err);
            document.getElementById("receiptContainer").innerHTML = "SYSTEM FAILURE";
        });
}

// ==================== TOOLS ====================
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

// ==================== 人頭等級 ====================
function getHeadLevel() {
    const normalLevels = [
        "特級人頭供養者","一級洗錢小草","木可認證金流師","橘子運輸中隊長",
        "1500萬級別金主","B18姊夫唯一","政治獻金優化師","17年刑期預備役"
    ];
    const rareLevels = [
        "🌟 神級人頭","🔥 傳說級","💀 地獄級","🏆 終身貢獻獎"
    ];
    return Math.random() > 0.82 ? rand(rareLevels) : rand(normalLevels);
}

// ==================== COMMENT ====================
function getComment() {
    const comments = [
        "這筆你真的敢報？",
        "系統判定：異常偏高",
        "審計部已鎖定你",
        "這不是收據，是犯罪紀錄",
        "🔥 貪污等級上升中",
        "這會被抓去關吧",
        "系統：你有點太誠實了"
    ];
    return rand(comments);
}

// ==================== MODE ====================
function chaosMath() {
    const a = Math.floor(Math.random() * 900 + 100);
    const b = Math.floor(Math.random() * 900 + 10);
    return `【民眾堂餐費收據系統】<br>
${a} + ${b}<br>
正常：${a + b}<br>
政治解讀：${a + b}<br>
系統判定：加法已進入敘事化`;
}

// ==================== 建立單張收據 ====================
function createReceipt(input="") {
    const mode = rand(["NORMAL","SYSTEM","GLITCH","POLITICAL_OVERFLOW","CHAOS"]);
    let parts = [];

    if (mode === "NORMAL") {
        parts = [
            fillTemplate(rand(memes.openings)),
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.endings))
        ];
    } else if (mode === "SYSTEM") {
        parts = ["【SYSTEM MODE ACTIVE】", fillTemplate(rand(memes.system_weird))];
    } else if (mode === "GLITCH") {
        parts = ["▓▒░ SYSTEM CORRUPTION ░▒▓", fillTemplate(rand(memes.glitch))];
    } else if (mode === "POLITICAL_OVERFLOW") {
        parts = [fillTemplate(rand(memes.politics_glitch)), "SYSTEM OVERRIDE"];
    } else {
        parts = [fillTemplate(rand(memes.usages)), fillTemplate(rand(memes.glitch)), chaosMath()];
    }

    if (input) parts.unshift(`【INPUT】${input}`);

    return {
        content: parts.filter(Boolean).join("<br><br>"),
        money: money(),
        id: id(),
        time: time(),
        level: getHeadLevel()
    };
}

// ==================== 渲染 ====================
function renderReceipts(list) {
    const container = document.getElementById("receiptContainer");
    const template = document.getElementById("receiptTemplate");

    container.innerHTML = "";

    list.forEach(r => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".result").innerHTML = r.content;
        clone.querySelector(".rmoney").innerText = r.money;
        clone.querySelector(".rid").innerText = r.id;
        clone.querySelector(".rtime").innerText = r.time;
        clone.querySelector(".rlevel").innerText = r.level;

        container.appendChild(clone);
    });

    document.getElementById("systemComment").innerText = getComment();
}

// ==================== 主功能 ====================
window.generate = function() {
    if (!memesReady) return;

    currentReceipts = [];
    for (let i = 0; i < 3; i++) {
        currentReceipts.push(createReceipt());
    }

    renderReceipts(currentReceipts);
};

window.buildMemeFromInput = function() {
    const input = document.getElementById("userInput")?.value.trim();
    if (!input) return;

    currentReceipts = [];
    for (let i = 0; i < 3; i++) {
        currentReceipts.push(createReceipt(input));
    }

    renderReceipts(currentReceipts);
};

// ==================== 加碼 ====================
window.upgradeMode = function() {
    if (!currentReceipts.length) return;

    currentReceipts = currentReceipts.map(r => ({
        ...r,
        content: r.content + "<br><br>🔥【加碼成功】異常已升級",
        money: (parseInt(r.money.replace(/,/g,"")) * 10).toLocaleString(),
        level: "💀 失控等級"
    }));

    renderReceiptsUI(currentReceipts);
	renderCommentUI(getComment());
};

// ==================== 舊功能兼容 ====================
window.spam = () => generate();
window.spamBlack = () => generate();

// ==================== 下載 ====================
window.download = function() {
    const el = document.getElementById("receiptContainer");

    html2canvas(el, { scale: 2, backgroundColor: "#fff" })
        .then(canvas => {
            const a = document.createElement("a");
            a.download = `MEMECORE_${Date.now()}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        });
};

// ==================== 分享 ====================
window.shareToFB = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`);
window.shareToX = () => window.open(`https://twitter.com/intent/tweet?text=MEME CORE&url=${location.href}`);
window.shareToThreads = () => alert("已複製請貼上 Threads");
window.shareToIG = () => alert("請下載圖片上傳 IG");

// ==================== CLOCK ====================
const startDate = new Date("2024-08-29T00:00:00");
function updateClock() {
    const now = new Date();
    let diff = Math.floor((now - startDate) / 1000);
    const d = Math.floor(diff / 86400); diff %= 86400;
    const h = Math.floor(diff / 3600); diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = diff % 60;

    document.querySelectorAll(".rclock").forEach(el => {
        el.innerText = `${d}天 ${h}時 ${m}分 ${s}秒`;
    });
}
setInterval(updateClock, 1000);

// ==================== Modal ====================
window.enterSystem = function(ok) {
    document.getElementById("introModal").style.display = "none";
    if (ok) loadMemes();
};

console.log("✅ MEME CORE v2 完整版已載入");