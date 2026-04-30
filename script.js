// ==================== script.js v2 FIXED FULL ====================

import {
    rand,
    genMoney,
    genId,
    genTime,
    genLevel,
    genComment,
    generateReceipt,
    fillTemplate,
    chaosMath
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
            document.getElementById("receiptContainer").innerHTML =
                "SYSTEM FAILURE: memes.json missing";
        });
}

// ==================== 建立收據 ====================
function createReceipt(input = "") {
    const mode = rand([
        "NORMAL",
        "SYSTEM",
        "GLITCH",
        "POLITICAL_OVERFLOW",
        "CHAOS"
    ]);

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

// ==================== 渲染 ====================
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
}

// ==================== 主功能 ====================
window.generate = function () {
    if (!memesReady) return;

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

    currentReceipts = [];

    for (let i = 0; i < 3; i++) {
        currentReceipts.push(createReceipt(input));
    }

    render();
};

// ==================== 加碼系統 ====================
window.upgradeMode = function () {
    if (!currentReceipts.length) return;

    currentReceipts = currentReceipts.map(r => ({
        ...r,
        content: r.content + "<br><br>🔥【加碼成功】系統已升級",
        money: (parseInt(r.money.replace(/,/g, "")) * 10).toLocaleString(),
        level: "💀 失控等級"
    }));

    renderCommentUI("🔥 系統判定：完全失控");
    render();
};

// ==================== 舊功能 ====================
window.spam = () => generate();
window.spamBlack = () => generate();

// ==================== 下載 ====================
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

// ==================== 分享 ====================
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

// ==================== MODAL FIX ====================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("introModal");

    if (modal) {
        modal.style.display = "flex";
    }
});

console.log("✅ MEME CORE v2 FIXED FULL LOADED");

window.enterSystem = function(ok) {
    document.getElementById("introModal").style.display = "none";

    if (ok) {
        loadMemes();
    } else {
        document.getElementById("receiptContainer").innerHTML = "SYSTEM OFFLINE";
    }
};