// ==================== MEME CORE v3 DOUBLE SUN MODE ====================
import {
    rand,
    genMoney,
    genId,
    genTime,
    genLevel,
    genComment,
    fillTemplate,
    chaosMath,
    genHighSalary,
    genThanksMessage,
    genAngryMessage
	genTangkouName
} from "./generator.js";

import {
    renderCommentUI
} from "./ui.js";

// ==================== STATE ====================
let memes = null;
let memesReady = false;
let currentReceipts = [];
let gameState = {
    chaos: 0,
    stability: 100,
    level: 1,
    clicks: 0,
    modeLock: null
};

// ==================== INIT ====================
function loadMemes() {
    const url = "memes.json";
    fetch(url + "?ts=" + Date.now())
        .then(r => {
            if (!r.ok) {
                throw new Error("HTTP " + r.status);
            }
            return r.json();
        })
        .then(d => {
            memes = d;
            memesReady = true;
            console.log("✅ memes.json 載入成功！");
            generate();
        })
        .catch(err => {
            console.error("❌ memes.json 載入失敗:", err);
            document.getElementById("receiptContainer").innerHTML = `
                <div style="color:#f87171; padding:20px; text-align:center;">
                    SYSTEM FAILURE: 無法載入 memes.json<br><br>
                    請確認以下事項：<br>
                    1. memes.json 是否已上傳到 GitHub<br>
                    2. 檔案名稱完全正確（大小寫一致）<br>
                    3. Repository 是否設為 Public<br><br>
                    錯誤：${err.message}
                </div>`;
        });
}

// ==================== CORE ====================
function createReceipt(type = "random", input = "") {
    const modePool = [
        "NORMAL", "SYSTEM", "GLITCH", "POLITICAL_OVERFLOW", "CHAOS"
    ];

    let mode = rand(modePool);

    if (gameState.chaos > 80) mode = "GLITCH";
    if (gameState.stability < 40) mode = "SYSTEM";
    if (gameState.modeLock) mode = gameState.modeLock;

    let parts = [];

    if (mode === "NORMAL") {
        parts = [
            fillTemplate(rand(memes.openings)),
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.endings))
        ];
    } else if (mode === "SYSTEM") {
        parts = [
            "【SYSTEM MODE ACTIVE】",
            fillTemplate(rand(memes.system_weird))
        ];
    } else if (mode === "GLITCH") {
        parts = [
            "▓▒░ SYSTEM CORRUPTION ░▒▓",
            fillTemplate(rand(memes.glitch))
        ];
    } else if (mode === "POLITICAL_OVERFLOW") {
        parts = [
            fillTemplate(rand(memes.politics_glitch)),
            "SYSTEM OVERRIDE ACTIVE"
        ];
    } else {
        parts = [
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.glitch)),
            chaosMath()
        ];
    }

    if (input) {
        parts.unshift(`【INPUT】${input}`);
    }

    // ==================== 金額邏輯 ====================
    let moneyNum;
    if (type === "random") {
        moneyNum = Math.floor(Math.random() * 951) + 50; // 50 ~ 1000
    } else { // tangkou
        moneyNum = Math.floor(Math.random() * 9000) + 1001; // 1001 ~ 10000
    }

    // 等級加成（最高10級，每次增加5%）
    const levelMultiplier = 1 + (Math.min(gameState.level, 10) * 0.05);
    moneyNum = Math.floor(moneyNum * levelMultiplier);

    const money = moneyNum.toLocaleString();

    const highSalaryNum = genHighSalary();
    const actualSalaryNum = Math.floor(highSalaryNum * (0.65 + Math.random() * 0.3));

    const highSalary = highSalaryNum.toLocaleString();
    const actualSalary = actualSalaryNum.toLocaleString();

    // 比較邏輯
    const donate = moneyNum;
    let comparisonHTML = "";

    if (donate >= actualSalaryNum) {
        comparisonHTML = `
            <div class="thanks">✅ 民眾堂對您的奉獻深表感謝！</div>
            <div style="color:#4ade80; margin-top:6px; font-size:15px;">
                ${genThanksMessage()}
            </div>`;
    } else {
        comparisonHTML = `
            <div class="angry">⚠️ 堂口高層相當不滿！</div>
            <div class="warning-text" style="margin-top:8px; font-size:15px;">
                ${genAngryMessage()}
            </div>`;
    }

    return {
        type: type,
        content: parts.filter(Boolean).join("<br><br>"),
        money: money,
        highSalary: type === "tangkou" 
			? `堂口高層 ${genTangkouName()}` 
			: highSalary,
        actualSalary: actualSalary,
        comparison: comparisonHTML,
        id: genId(),
        time: genTime(),
        level: genLevel(rand)
    };
}

// ==================== RENDER ====================
function render() {
    const container = document.getElementById("receiptContainer");
    const template = document.getElementById("receiptTemplate");
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.gap = "24px";
    container.style.justifyContent = "center";
    container.style.flexWrap = "wrap";

    currentReceipts.forEach(r => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".result").innerHTML = r.content;
        clone.querySelector(".rmoney").innerText = r.money;
        clone.querySelector(".rid").innerText = r.id;
        clone.querySelector(".rtime").innerText = r.time;
        
        clone.querySelector(".rhighsalary").innerText = r.highSalary || "—";
        clone.querySelector(".ractual").innerText = r.actualSalary || "—";

        const comparisonDiv = clone.querySelector(".comparison");
        if (comparisonDiv) comparisonDiv.innerHTML = r.comparison || "";

        // 堂口加一點視覺區別
        if (r.type === "tangkou") {
            const receiptEl = clone.querySelector(".receipt");
            if (receiptEl) receiptEl.style.border = "2px solid #fbbf24";
        }

        container.appendChild(clone);
    });

    renderCommentUI(genComment());
    updateHUD();
}

// ==================== HUD ====================
function updateHUD() {
    const levelEl = document.getElementById("hudLevel");
    const chaosEl = document.getElementById("hudChaos");
    const stabEl = document.getElementById("hudStability");

    if (levelEl) levelEl.innerText = "LV" + gameState.level;
    if (chaosEl) chaosEl.innerText = gameState.chaos;
    if (stabEl) stabEl.innerText = gameState.stability + "%";

    document.body.style.filter = "";
    if (gameState.chaos > 60) document.body.style.filter = "hue-rotate(90deg)";
    if (gameState.stability < 50) document.body.style.filter = "contrast(1.2)";
    if (gameState.stability < 20) document.body.style.animation = "shake 0.2s infinite";
}

// ==================== MAIN ====================
window.generate = function () {
    if (!memesReady) return;
    gameState.clicks++;
    gameState.chaos += 5;
    gameState.stability -= 2;
    if (gameState.clicks > 8) gameState.level = Math.min(gameState.level + 1, 10);

    currentReceipts = [
        createReceipt("random"),   // 左側 - 隨機
        createReceipt("tangkou")   // 右側 - 堂口
    ];
    render();
};

window.buildMemeFromInput = function () {
    const input = document.getElementById("userInput")?.value.trim();
    if (!input) {
        document.getElementById("receiptContainer").innerHTML = "SYSTEM: INPUT REQUIRED";
        return;
    }

    gameState.clicks++;
    gameState.chaos += 10;
    gameState.stability -= 5;

    currentReceipts = [
        createReceipt("random", input),
        createReceipt("tangkou", input)
    ];
    render();
};

// ==================== UPGRADE ====================
window.upgradeMode = function () {
    if (!currentReceipts.length) return;

    gameState.chaos += 50;
    gameState.stability -= 30;
    gameState.level = Math.min(gameState.level + 2, 10);
    gameState.modeLock = "GLITCH";

    currentReceipts = currentReceipts.map(r => ({
        ...r,
        content: r.content + "<br><br>🔥【系統已失控】",
        money: (parseInt(r.money.replace(/,/g, "")) * 10).toLocaleString(),
        highSalary: r.type === "tangkou" 
            ? `堂口高層 ${genTangkouName()}` 
            : (parseInt(r.highSalary.replace(/,/g, "")) * 8).toLocaleString(),
        actualSalary: (parseInt(r.actualSalary.replace(/,/g, "")) * 8).toLocaleString(),
        level: "💀 失控等級"
    }));

    renderCommentUI("🔥 系統判定：已進入崩壞模式");
    render();
};

// ==================== OLD ====================
window.spam = () => generate();
window.spamBlack = () => generate();

// ==================== DOWNLOAD ====================
window.download = function () {
    const el = document.getElementById("receiptContainer");
    html2canvas(el, { scale: 2, backgroundColor: "#fff" })
        .then(canvas => {
            const a = document.createElement("a");
            a.download = `MEMECORE_${Date.now()}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        });
};

// ==================== SHARE ====================
window.shareToFB = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`);
window.shareToX = () => window.open(`https://twitter.com/intent/tweet?text=MEME CORE&url=${location.href}`);
window.shareToThreads = () => alert("已複製請貼上 Threads");
window.shareToIG = () => alert("請下載圖片上傳 IG");

// ==================== CLOCK ====================
const startDate = new Date("2024-08-29T00:00:00");
function updateClock() {
    const now = new Date();
    let diff = Math.floor((now - startDate) / 1000);
    const d = Math.floor(diff / 86400);
    diff %= 86400;
    const h = Math.floor(diff / 3600);
    diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = diff % 60;

    document.querySelectorAll(".rclock").forEach(el => {
        el.innerText = `${d}天 ${h}時 ${m}分 ${s}秒`;
    });
}
setInterval(updateClock, 1000);

// ==================== MODAL ====================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("introModal");
    if (modal) modal.style.display = "flex";
});

window.enterSystem = function (ok) {
    document.getElementById("introModal").style.display = "none";
    if (ok) loadMemes();
    else document.getElementById("receiptContainer").innerHTML = "SYSTEM OFFLINE";
};

console.log("🔥 MEME CORE v3 DOUBLE SUN MODE LOADED（左右隨機+堂口模式）");