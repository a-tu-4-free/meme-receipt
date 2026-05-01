// ==================== MEME CORE v3 FULL - 修改版 ====================
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

// ==================== 堂口高層名單（已按照你的要求調整） ====================
const highLevelNames = [
    "蟑螂小姊姊",
    "阿北",
    "戰神",
    "澎風安",
    "白襪會計師",
    "基金會",
    "壁如姐的包",
    "智菡直播間",
    "幽靈帳主管",
    "特別費處理組",
    "竹北快遞哥",
    "麻醉帳戶長",
    "葉克膜主任",
    "正義咆哮機",
    "海外轉手王",
    "消失的錢包",
    "顧問費小組",
    "直播間金主",
    "黨部幽靈員工",
    "募款機關槍",
    "阿北轉手小弟",
    "戰神憤怒帳",
    "澎風安快線",
    "壁如海外基金",
    "珊珊特別戶",
    "核心成員甲",
    "系統洗錢組",
    "雙標執行長",
    "現金流守護者",
    "語意污染師"
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
                    請確認以下事項：<br>
                    1. memes.json 是否已上傳到 GitHub<br>
                    2. 檔案名稱完全正確（大小寫一致）<br>
                    3. Repository 是否設為 Public<br><br>
                    錯誤：${err.message}
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
    const highSalaryNum = Math.floor(1200000 + Math.random() * 4500000);
    const actualSalaryNum = Math.floor(highSalaryNum * (0.18 + Math.random() * 0.35));

    const highSalaryDisplay = getRandomHighLevelName();   // 使用新名單

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
        highSalary: highSalaryDisplay,        // 顯示堂口高層綽號
        actualSalary: actualSalaryNum.toLocaleString('zh-TW'),
        comparison: comparisonHTML,
        id: genId(),
        time: genTime(),
        level: genLevel(rand),
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

        // 加入風格 class
        if (r.isKo) receiptDiv.classList.add("ko");
        if (r.isHuang) receiptDiv.classList.add("huang");

        clone.querySelector(".result").innerHTML = r.content || "";
        clone.querySelector(".rmoney").innerText = r.money || "0";
        clone.querySelector(".rid").innerText = r.id || "SYS-000000";
        clone.querySelector(".rtime").innerText = r.time || "—";
        clone.querySelector(".rhighsalary").innerText = r.highSalary || "—";
        clone.querySelector(".ractual").innerText = r.actualSalary || "—";

        const comparisonDiv = clone.querySelector(".comparison");
        if (comparisonDiv) {
            comparisonDiv.innerHTML = r.comparison || "";
        }

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

    document.body.style.filter = "";
    if (gameState.chaos > 70) document.body.style.filter = "hue-rotate(120deg) saturate(1.4)";
    if (gameState.stability < 40) document.body.style.filter = "contrast(1.3) brightness(1.1)";
    if (gameState.stability < 15) document.body.style.animation = "shake 0.15s infinite";
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

// 雙太陽模式
window.spamBlack = function () {
    if (!memesReady) return;

    gameState.chaos = Math.min(99, gameState.chaos + 15);
    gameState.stability = Math.max(5, gameState.stability - 12);

    currentReceipts = [
        createReceipt("", true, false),   // 阿北系
        createReceipt("", false, true)    // 戰神系
    ];

    const container = document.getElementById("receiptContainer");
    container.classList.add("double");

    render();
    renderCommentUI("☠ 雙太陽模式啟動<br>阿北冷靜黑話 vs 戰神正義咆哮");
};

// 錢再多一點（等級上限99）
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
            content: r.content + `<br><br><span class="angry">🔥 LV${gameState.level} 崩壞加成啟動！現金流量暴增！</span>`,
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
    if (!input) {
        alert("請輸入內容！");
        return;
    }

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
        })
        .catch(() => alert("截圖失敗"));
};

window.shareToFB = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`);
window.shareToX = () => window.open(`https://twitter.com/intent/tweet?text=民眾堂%20MEME%20CORE&url=${encodeURIComponent(location.href)}`);
window.shareToThreads = () => alert("已複製連結，請手動貼到 Threads");
window.shareToIG = () => alert("請先下載收據圖片後上傳 IG");

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
        document.getElementById("receiptContainer").innerHTML = `
            <div style="color:#f87171; text-align:center; padding:40px;">
                你已被系統列入黑名單<br><br>
                雙標引擎已記錄你的拒絕行為
            </div>`;
    }
};

console.log("🔥 MEME CORE v3 - 堂口高層名單更新完成 LOADED");