// ==================== MEME CORE v3 FULL - 修正版 ====================
import {
    rand,
    genMoney,
    genId,
    genTime,
    genLevel,
    genComment,
    fillTemplate,
    chaosMath,
    genThanksMessage,
    genAngryMessage
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

// ==================== 堂口高層名單 ====================
const highLevelNames = [
    "蟑螂小姊姊",
    "白賊阿北",
    "咆嘯戰神",
    "白襪會計師",
    "眾賺基金會",
    "B如姐的包",
    "秘書長直播間",
    "幽靈帳主管",
    "特別費處理組",
    "堂口燒鳥哥",
    "麻醉帳戶長"
    "EkMore主任",
    "海外轉手王",
    "消失的錢包",
    "顧問費小組",
    "餐費做帳黨工",
    "募款機關槍",
    "來我辦公室上班的小姐",
    "賺四代網軍執行長",
    "澎風安快線",
    "很負責任的文忠",
    "冂建築特別戶",
    "核心成員柚子",
    "系統洗錢組",
    "雙標執行長",
    "現在是怎樣發言人",
    "幽靈雙載的志工"
];

// 隨機取得堂口高層名稱
function getRandomHighLevelName() {
    return highLevelNames[Math.floor(Math.random() * highLevelNames.length)];
}

// ==================== INIT ====================
function loadMemes() {
    const url = "memes.json";
    fetch(url + "?ts=" + Date.now())
        .then(r => {
            if (!r.ok) throw new Error("HTTP " + r.status);
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
                    請確認 memes.json 是否正確上傳
                </div>`;
        });
}

// ==================== CORE ====================
function createReceipt(input = "", isKo = false, isHuang = false) {
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
        parts = [
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.glitch)),
            chaosMath()
        ];
    }

    if (input) {
        parts.unshift(`【INPUT】${input}`);
    }

    const money = genMoney();
    const actualSalaryNum = Math.floor(800000 + Math.random() * 3000000);
    
    const highSalaryDisplay = getRandomHighLevelName();   // ← 關鍵：取得高層名稱

    const donate = parseInt(money.replace(/,/g, '')) || 0;

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
        content: parts.filter(Boolean).join("<br><br>"),
        money: money,
        highSalary: highSalaryDisplay,        // ← 必須確保這裡有值
        actualSalary: actualSalaryNum.toLocaleString('zh-TW'),
        comparison: comparisonHTML,
        id: genId(),
        time: genTime(),
        level: genLevel(gameState),           // ← 修正：傳入 gameState 而不是 rand
        isKo: isKo,
        isHuang: isHuang
    };
}

// ==================== RENDER ====================
function render() {
    const container = document.getElementById("receiptContainer");
    const template = document.getElementById("receiptTemplate");
    
    container.innerHTML = "";
    container.classList.remove("double");

    currentReceipts.forEach(r => {
        const clone = template.content.cloneNode(true);
        const receiptDiv = clone.querySelector(".receipt");

        if (r.isKo) receiptDiv.classList.add("ko");
        if (r.isHuang) receiptDiv.classList.add("huang");

        clone.querySelector(".result").innerHTML = r.content || "";
        clone.querySelector(".rmoney").innerText = r.money || "0";
        clone.querySelector(".rid").innerText = r.id || "SYS-000000";
        clone.querySelector(".rtime").innerText = r.time || "—";
        
        // === 關鍵修正點 ===
        clone.querySelector(".rhighsalary").innerText = r.highSalary || "堂口高層";
        clone.querySelector(".ractual").innerText = r.actualSalary || "—";

        const comparisonDiv = clone.querySelector(".comparison");
        if (comparisonDiv) comparisonDiv.innerHTML = r.comparison || "";

        receiptDiv.addEventListener("click", () => {
            alert("系統已記錄此筆異常現金流\n雙標引擎運作中...");
        });

        container.appendChild(clone);
    });

    renderCommentUI(genComment(gameState));
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
}

// ==================== MAIN FUNCTIONS ====================

window.generate = function () {
    if (!memesReady) return;
    gameState.clicks++;
    gameState.chaos = Math.min(99, gameState.chaos + 6);
    gameState.stability = Math.max(5, gameState.stability - 3);
    if (gameState.clicks > 8 && gameState.level < 99) gameState.level++;

    currentReceipts = [createReceipt("")];
    render();
};

window.spam = () => generate();

window.spamBlack = function () {
    if (!memesReady) return;
    gameState.chaos = Math.min(99, gameState.chaos + 15);
    gameState.stability = Math.max(5, gameState.stability - 12);

    currentReceipts = [
        createReceipt("", true, false),
        createReceipt("", false, true)
    ];

    document.getElementById("receiptContainer").classList.add("double");
    render();
    renderCommentUI("☠ 雙太陽模式啟動<br>阿北冷靜黑話 vs 戰神正義咆哮");
};

window.upgradeMode = function () {
    if (gameState.level >= 99) {
        renderCommentUI("⚠️ 已達到最高等級 LV99，系統即將完全崩壞");
        return;
    }

    gameState.level = Math.min(99, gameState.level + 1);
    gameState.chaos = Math.min(99, gameState.chaos + 18);
    gameState.stability = Math.max(5, gameState.stability - 15);

    if (currentReceipts.length === 0) {
        currentReceipts = [createReceipt("")];
    } else {
        currentReceipts = currentReceipts.map(r => ({
            ...r,
            content: r.content + `<br><br><span class="angry">🔥 LV${gameState.level} 崩壞加成啟動！</span>`,
            money: (parseInt(r.money.replace(/,/g, "")) * (1.8 + Math.random() * 1.2)).toLocaleString('zh-TW')
        }));
    }

    let msg = `🔥 等級提升至 LV${gameState.level}！`;
    if (gameState.level > 40) msg += "<br>系統開始出現嚴重語意污染...";
    if (gameState.level > 70) msg += "<br><span class='warning-text'>現實扭曲指數嚴重超標！</span>";
    if (gameState.level > 90) msg += "<br><span class='angry'>MEME CORE 已接近完全失控</span>";

    renderCommentUI(msg);
    render();
};

window.buildMemeFromInput = function () {
    const input = document.getElementById("userInput")?.value.trim();
    if (!input) return alert("請輸入內容！");
    
    gameState.chaos = Math.min(99, gameState.chaos + 12);
    gameState.stability = Math.max(5, gameState.stability - 8);
    currentReceipts = [createReceipt(input)];
    render();
};

window.download = function () {
    const el = document.getElementById("receiptContainer");
    html2canvas(el, { scale: 2, backgroundColor: "#ffffff" })
        .then(canvas => {
            const a = document.createElement("a");
            a.download = `民眾堂收據_${Date.now()}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        });
};

// 其他分享函式保持不變
window.shareToFB = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`);
window.shareToX = () => window.open(`https://twitter.com/intent/tweet?text=民眾堂%20MEME%20CORE&url=${encodeURIComponent(location.href)}`);
window.shareToThreads = () => alert("已複製連結，請手動貼到 Threads");
window.shareToIG = () => alert("請先下載收據圖片後上傳 IG");

// ==================== CLOCK & MODAL ====================
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

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("introModal");
    if (modal) modal.style.display = "flex";
});

window.enterSystem = function (ok) {
    document.getElementById("introModal").style.display = "none";
    if (ok) loadMemes();
    else document.getElementById("receiptContainer").innerHTML = "SYSTEM OFFLINE";
};

console.log("🔥 MEME CORE v3 - 高層名稱修正版 LOADED");