// ==================== MEME CORE ENGINE (FIXED VERSION) ====================
import {
    rand,
    genRandomMoney,
    genTangkouMoney,
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
    genFooter
} from "./generator.js";
import { renderCommentUI } from "./ui.js";
// ==================== SAFE RNG ====================
function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// ==================== STATE ====================
let memes = null;
let memesReady = false;
let currentReceipt = null;
let gameState = {
    mode: "random",
    chaos: 0,
    stability: 100,
    level: 1,
    doubleSun: false,
    jackpotUsed: false,
    lock: false
};
// ==================== LOAD MEMES ====================
function loadMemes() {
    fetch("memes.json?ts=" + Date.now())
        .then(r => r.json())
        .then(d => {
            memes = d;
            memesReady = true;
            console.log("memes loaded");
            generate();
        })
        .catch(err => {
            console.error("memes load fail", err);
        });
}
// ==================== CHAOS SYSTEM ====================
function addChaos(mode) {
    let gain = 0;
    if (mode === "random") {
        const r = Math.random();
        if (r < 0.7) gain = randRange(1, 5);
        else if (r < 0.9) gain = randRange(6, 20);
        else if (r < 0.98) gain = randRange(21, 50);
        else gain = randRange(51, 100);
    }
    if (mode === "tangkou") {
        const r = Math.random();
        if (r < 0.6) gain = randRange(10, 50);
        else if (r < 0.85) gain = randRange(50, 200);
        else if (r < 0.95) gain = randRange(200, 1000);
        else gain = randRange(1000, 5000);
    }
    gameState.chaos += gain;
    gameState.stability -= Math.floor(gain / 25);
    if (gameState.stability < 0) gameState.stability = 0;
    return gain;
}
// ==================== JACKPOT ====================
function checkJackpot() {
    if (gameState.jackpotUsed) return 0;
    const r = Math.random();
    if (gameState.mode === "random" && r < 0.001) {
        gameState.jackpotUsed = true;
        return randRange(100000, 900000);
    }
    if (gameState.mode === "tangkou" && r < 0.001) {
        gameState.jackpotUsed = true;
        return randRange(1000000, 9000000);
    }
    if (gameState.level >= 5 && r < 0.0005) {
        gameState.jackpotUsed = true;
        return randRange(10000000, 99000000);
    }
    return 0;
}
// ==================== RECEIPT ====================
function createReceipt(input = "") {
    if (!memes) return { content: "SYSTEM LOADING" };
    let baseMoney =
        gameState.mode === "random"
            ? genRandomMoney()
            : genTangkouMoney();
    let levelBonus =
        gameState.level *
        (gameState.mode === "random" ? 50 : 5000);
    let chaosGain = addChaos(gameState.mode);
    let jackpot = checkJackpot();
    let money = baseMoney + levelBonus + chaosGain * 10 + jackpot;
    // ================= content =================
    let content = [];
    content.push(fillTemplate(rand(memes.openings || [])));
    content.push(fillTemplate(rand(memes.usages || [])));
    if (gameState.doubleSun) {
        content.push("【咆哮戰神】 " + fillTemplate(rand(memes.huang || [])));
        content.push("【白賊阿北】 " + fillTemplate(rand(memes.ko || [])));
    } else {
        content.push(fillTemplate(rand(memes.usages || [])));
    }
    content.push(fillTemplate(rand(memes.endings || [])));
    if (input) content.unshift("【INPUT】" + input);
    // ================= salary =================
    const highSalary = genTangkouName();
    const actualSalary = Math.floor(money * (0.6 + Math.random() * 0.3));
    const comparison =
        money >= actualSalary
            ? `✅ 感謝奉獻<br>${genThanksMessage()}`
            : `⚠️ 高層不滿<br>${genAngryMessage()}`;
    return {
        id: genId(),
        time: genTime(),
        money: money,
        moneyDisplay: money.toLocaleString(),
        highSalary,
        actualSalary,
        actualSalaryDisplay: actualSalary.toLocaleString(),
        content: content.join("<br><br>"),
        comparison,
        footer: genFooter()
    };
}
// ==================== RENDER ====================
function render() {
    const container = document.getElementById("receiptContainer");
    const template = document.getElementById("receiptTemplate");
    if (!container || !template) return;
    container.innerHTML = "";
    const r = createReceipt();
    const node = template.content.cloneNode(true);
    node.querySelector(".rid").innerText = r.id;
    node.querySelector(".rtime").innerText = r.time;
    node.querySelector(".rmoney").innerText = r.moneyDisplay;
    node.querySelector(".rhigh").innerText = r.highSalary;
    node.querySelector(".ractual").innerText = r.actualSalaryDisplay;
    node.querySelector(".result").innerHTML = r.content;
    const footer = node.querySelector(".footer");
    if (footer) footer.innerHTML = r.footer;
    container.appendChild(node);
    updateHUD();
    renderCommentUI(genComment(gameState.chaos));
}
// ==================== HUD ====================
function updateHUD() {
    const safeSet = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.innerText = v;
    };
    safeSet("mode", gameState.mode);
    safeSet("level", gameState.level);
    safeSet("chaos", gameState.chaos);
}
// ==================== ACTIONS ====================
window.generate = function () {
    if (!memesReady || gameState.lock) return;
    render();
};
window.setMode = function (m) {
    gameState.mode = m;
};
window.toggleDoubleSun = function () {
    gameState.doubleSun = !gameState.doubleSun;
    const btn = document.getElementById("doubleSunBtn");
    if (btn) {
        btn.innerText =
            gameState.doubleSun
                ? "🌞 雙太陽 ON"
                : "🌞 雙太陽 OFF";
    }
    render();
};
window.upgrade = function () {
    gameState.level++;
    if (gameState.level >= 10) {
        gameState.lock = true;
        document.body.innerHTML =
            "<h1 style='color:red;text-align:center;padding:50px'>SYSTEM LOCKED</h1>";
    }
    render();
};
window.buildMemeFromInput = function () {
    render();
};
// ==================== INIT ====================
window.enter = function (ok) {
    document.getElementById("introModal").style.display = "none";
    if (ok) loadMemes();
};
document.addEventListener("DOMContentLoaded", () => {
    const m = document.getElementById("introModal");
    if (m) m.style.display = "flex";
});
console.log("MEME CORE ENGINE FIXED ✔");