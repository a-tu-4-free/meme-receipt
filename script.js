// ==================== MEME CORE v3 DOUBLE SUN MODE ====================
import {
    rand,
    genRandomMoney,
    genTangkouMoney,
    genUpgradeBonus,
    genId,
    genTime,
    genLevel,
    genComment,
    fillTemplate,
    chaosMath,
    genHighSalary,
    genThanksMessage,
    genAngryMessage,
    genTangkouName,
    isJackpotTriggered,
    markJackpotTriggered
} from "./generator.js";

import { renderReceiptsUI, renderCommentUI, triggerJackpotEffect } from "./ui.js";

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

// ==================== 點數系統 ====================
let userPoints = 87;

function loadPoints() {
    const today = new Date().toISOString().split('T')[0];
    const lastReset = localStorage.getItem('lastReset');
    if (lastReset !== today) {
        userPoints = 87;
        localStorage.setItem('lastReset', today);
    } else {
        const saved = localStorage.getItem('memePoints');
        if (saved) userPoints = parseInt(saved);
    }
    updateHUD();
}

function savePoints() {
    localStorage.setItem('memePoints', userPoints);
}

function checkPoints(cost) {
    if (userPoints < cost) {
        alert(`點數不足！目前剩下 ${userPoints} 點\n\n每日會重置為 87 點`);
        return false;
    }
    userPoints -= cost;
    savePoints();
    updateHUD();
    return true;
}

// ==================== HUD ====================
function updateHUD() {
    const levelEl = document.getElementById("hudLevel");
    const chaosEl = document.getElementById("hudChaos");
    const stabEl = document.getElementById("hudStability");
    if (levelEl) levelEl.innerText = "LV" + gameState.level;
    if (chaosEl) chaosEl.innerText = userPoints;
    if (stabEl) stabEl.innerText = gameState.stability + "%";
}

// ==================== 超級大獎 ====================
function checkJackpot(type) {
    if (isJackpotTriggered()) {
        markJackpotTriggered();
        triggerJackpotEffect();
        alert("🎉【超級大獎觸發！】\n\n今天手氣爆表！系統已進入失控模式！");
        gameState.modeLock = "GLITCH";
        gameState.chaos += 30;
        gameState.stability = 20;
        return true;
    }
    return false;
}

// ==================== CORE ====================
function createReceipt(type = "random", input = "") {
    const modePool = ["NORMAL", "SYSTEM", "GLITCH", "POLITICAL_OVERFLOW", "CHAOS"];
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
        parts = ["【SYSTEM MODE ACTIVE】", fillTemplate(rand(memes.system_weird))];
    } else if (mode === "GLITCH") {
        parts = ["▓▒░ SYSTEM CORRUPTION ░▒▓", fillTemplate(rand(memes.glitch))];
    } else if (mode === "POLITICAL_OVERFLOW") {
        parts = [fillTemplate(rand(memes.politics_glitch)), "SYSTEM OVERRIDE ACTIVE"];
    } else {
        parts = [fillTemplate(rand(memes.usages)), fillTemplate(rand(memes.glitch)), chaosMath()];
    }

    if (input) parts.unshift(`【INPUT】${input}`);

    let moneyNum = type === "random" ? genRandomMoney() : genTangkouMoney();
    const levelMultiplier = 1 + (Math.min(gameState.level, 10) * 0.05);
    moneyNum = Math.floor(moneyNum * levelMultiplier);

    const highSalaryNum = genHighSalary();
    const actualSalaryNum = Math.floor(highSalaryNum * (0.65 + Math.random() * 0.3));
    const tangkouName = genTangkouName();

    let comparisonHTML = moneyNum >= actualSalaryNum
        ? `<div class="thanks">✅ 民眾堂對您的奉獻深表感謝！</div><div style="color:#4ade80; margin-top:6px;">${genThanksMessage()}</div>`
        : `<div class="angry">⚠️ 堂口高層相當不滿！</div><div class="warning-text" style="margin-top:8px;">${genAngryMessage()}</div>`;

    return {
        type: type,
        content: parts.filter(Boolean).join("<br><br>"),
        money: moneyNum.toLocaleString(),
        highSalary: tangkouName,
        actualSalary: actualSalaryNum.toLocaleString(),
        comparison: comparisonHTML,
        id: genId(),
        time: genTime(),
        level: genLevel(gameState)
    };
}

// ==================== RENDER ====================
function render() {
    const container = document.getElementById("receiptContainer");
    const template = document.getElementById("receiptTemplate");
    renderReceiptsUI(container, template, currentReceipts);   // 使用 ui.js 的渲染
    renderCommentUI(genComment());
    updateHUD();
}

// ==================== 主要按鈕功能 ====================
window.randomMoney = function () {
    if (!memesReady) return;
    if (!checkPoints(7)) return;
    checkJackpot("random");
    gameState.clicks++;
    gameState.chaos += 5;
    gameState.stability = Math.max(0, gameState.stability - 2);
    currentReceipts = [createReceipt("random")];
    render();
};

window.tangkouMode = function () {
    if (!memesReady) return;
    if (!checkPoints(17)) return;
    checkJackpot("tangkou");
    gameState.clicks++;
    gameState.chaos += 8;
    gameState.stability = Math.max(0, gameState.stability - 4);
    currentReceipts = [createReceipt("tangkou")];
    render();
};

window.doubleSunMode = function () {
    if (!memesReady) return;
    if (!checkPoints(15)) return;
    gameState.clicks++;
    gameState.chaos += 12;
    gameState.stability = Math.max(0, gameState.stability - 6);
    currentReceipts = [
        createReceipt("random"),
        createReceipt("tangkou")
    ];
    render();
};

window.buildMemeFromInput = function () {
    const input = document.getElementById("userInput")?.value.trim();
    if (!input) return alert("請輸入內容");
    if (!checkPoints(10)) return;
    gameState.clicks++;
    gameState.chaos += 10;
    gameState.stability = Math.max(0, gameState.stability - 5);
    currentReceipts = [
        createReceipt("random", input),
        createReceipt("tangkou", input)
    ];
    render();
};

// ==================== 錢再多一點 ====================
window.upgradeMode = function () {
    if (gameState.level >= 10) {
        const taunts = [
            "LV10 已經可以在額頭刺「kb青青白白」啦，再升一樣只能幫阿北撐傘啦！",
            "高層說你再捐，扛得住特偵組的盤問嗎？！",
            "系統：你以為這是比特幣嗎？",
            "再點下去會被查帳喔！"
        ];
        renderCommentUI(`<span class="angry">${taunts[Math.floor(Math.random() * taunts.length)]}</span>`);
        return;
    }

    checkJackpot("upgrade");
    gameState.level = Math.min(gameState.level + 1, 10);
    userPoints += 25;
    savePoints();
    updateHUD();
    renderCommentUI(`<span class="high-salary">✅ 升級成功！目前 LV${gameState.level}，獲得 25 點獎勵</span>`);
};

// ==================== 留下證據 ====================
window.showEvidenceModal = function () {
    const modal = document.getElementById("evidenceModal");
    if (modal) modal.style.display = "flex";
};

window.closeEvidenceModal = function () {
    const modal = document.getElementById("evidenceModal");
    if (modal) modal.style.display = "none";
};

window.copyLinkAndInfo = function () {
    const text = `民眾堂 MEME CORE 收據\n連結：${location.href}\n生成時間：${new Date().toLocaleString('zh-TW')}\n記得截圖保存！`;
    navigator.clipboard.writeText(text).then(() => {
        alert("✅ 已複製連結與資訊，可以直接貼到社群！");
        closeEvidenceModal();
    });
};

window.saveAsJPG = async function () {
    closeEvidenceModal();
    const container = document.getElementById("receiptContainer");
    if (!container.children.length) return alert("請先生成收據！");
    try {
        const canvas = await html2canvas(container, { scale: 2 });
        const link = document.createElement("a");
        link.download = `民眾堂收據_${new Date().toISOString().slice(0,10)}.jpg`;
        link.href = canvas.toDataURL("image/jpeg", 0.92);
        link.click();
    } catch(e) {
        alert("截圖失敗，請稍後再試");
    }
};

// ==================== INIT ====================
function loadMemes() {
    const url = "memes.json";
    fetch(url + "?ts=" + Date.now())
        .then(r => r.ok ? r.json() : Promise.reject("HTTP " + r.status))
        .then(d => {
            memes = d;
            memesReady = true;
            console.log("✅ memes.json 載入成功！");
            window.randomMoney();
        })
        .catch(err => {
            console.error("❌ memes.json 載入失敗:", err);
            document.getElementById("receiptContainer").innerHTML = `<div style="color:#f87171; padding:40px; text-align:center;">SYSTEM FAILURE: 無法載入 memes.json</div>`;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadPoints();
    const modal = document.getElementById("introModal");
    if (modal) modal.style.display = "flex";
});

window.enterSystem = function (ok) {
    const modal = document.getElementById("introModal");
    if (modal) modal.style.display = "none";
    if (ok) loadMemes();
};

console.log("🔥 MEME CORE v3 已載入");