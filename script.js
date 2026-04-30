// ==================== MEME CORE v3 FULL ====================

import {
    rand,
    genMoney,
    genId,
    genTime,
    genLevel,
    genComment,
    fillTemplate,
    chaosMath
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
            document.getElementById("receiptContainer").innerHTML =
                "SYSTEM FAILURE: memes.json missing";
        });
}

// ==================== CORE ====================
function createReceipt(input = "") {

    const modePool = [
        "NORMAL",
        "SYSTEM",
        "GLITCH",
        "POLITICAL_OVERFLOW",
        "CHAOS"
    ];

    let mode = rand(modePool);

    // 🔥 系統鎖模式（進化機制）
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

    return {
        content: parts.filter(Boolean).join("<br><br>"),
        money: genMoney(),
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

    currentReceipts.forEach(r => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".result").innerHTML = r.content;
        clone.querySelector(".rmoney").innerText = r.money;
        clone.querySelector(".rid").innerText = r.id;
        clone.querySelector(".rtime").innerText = r.time;
        clone.querySelector(".rlevel").innerText = r.level;

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

    // 🔥 視覺崩壞效果
    document.body.style.filter = "";

    if (gameState.chaos > 60) {
        document.body.style.filter = "hue-rotate(90deg)";
    }

    if (gameState.stability < 50) {
        document.body.style.filter = "contrast(1.2)";
    }

    if (gameState.stability < 20) {
        document.body.style.animation = "shake 0.2s infinite";
    }
}

// ==================== MAIN ====================
window.generate = function () {
    if (!memesReady) return;

    gameState.clicks++;
    gameState.chaos += 5;
    gameState.stability -= 2;

    if (gameState.clicks > 10) {
        gameState.level = 2;
    }

    currentReceipts = [];

    for (let i = 0; i < 3; i++) {
        currentReceipts.push(createReceipt());
    }

    render();
};

window.buildMemeFromInput = function () {
    const input = document.getElementById("userInput")?.value.trim();

    if (!input) {
        document.getElementById("receiptContainer").innerHTML =
            "SYSTEM: INPUT REQUIRED";
        return;
    }

    gameState.clicks++;
    gameState.chaos += 10;
    gameState.stability -= 5;

    currentReceipts = [];

    for (let i = 0; i < 3; i++) {
        currentReceipts.push(createReceipt(input));
    }

    render();
};

// ==================== UPGRADE (核心爆炸點) ====================
window.upgradeMode = function () {
    if (!currentReceipts.length) return;

    gameState.chaos += 50;
    gameState.stability -= 30;
    gameState.level++;

    gameState.modeLock = "GLITCH";

    currentReceipts = currentReceipts.map(r => ({
        ...r,
        content: r.content + "<br><br>🔥【系統已失控】",
        money: (parseInt(r.money.replace(/,/g, "")) * 10).toLocaleString(),
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
window.shareToFB = () =>
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`);

window.shareToX = () =>
    window.open(`https://twitter.com/intent/tweet?text=MEME CORE&url=${location.href}`);

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

    if (ok) {
        loadMemes();
    } else {
        document.getElementById("receiptContainer").innerHTML =
            "SYSTEM OFFLINE";
    }
};

console.log("🔥 MEME CORE v3 LOADED (STATE SYSTEM ACTIVE)");