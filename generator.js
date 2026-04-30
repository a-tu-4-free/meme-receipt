// ==================== generator.js ====================

export function rand(arr) {
    return arr && arr.length
        ? arr[Math.floor(Math.random() * arr.length)]
        : "【SYSTEM LOADING】";
}

// ===== 基本生成 =====
export function genMoney() {
    return Math.floor(Math.random() * 900000 + 1000).toLocaleString();
}

export function genId() {
    return "SYS-" + Math.floor(Math.random() * 9999999);
}

export function genTime() {
    return new Date().toLocaleString("zh-TW");
}

// ===== 人頭等級 =====
export function genLevel() {
    const normal = [
        "特級人頭供養者",
        "洗錢小草",
        "木可金流師",
        "橘子運輸中隊長",
        "政治獻金優化師",
        "系統性帳務觀察員"
    ];

    const rare = [
        "🔥 傳說級金主",
        "💀 地獄級收藏家",
        "🏆 民眾堂終身貢獻獎",
        "🌟 神級隱形金流"
    ];

    return Math.random() > 0.82
        ? rand(rare)
        : rand(normal);
}

// ===== 系統吐槽 =====
export function genComment() {
    const comments = [
        "這筆你真的敢報？",
        "系統判定：異常偏高",
        "審計單位已標記",
        "這不是收據，是紀錄犯罪",
        "🔥 貪污等級上升",
        "你是不是太誠實了",
        "系統：建議立即關機"
    ];

    return rand(comments);
}

// ===== 內容模板 =====
export function fillTemplate(str) {
    if (!str) return "";

    return str
        .replace(/{days}/g, () => Math.floor(Math.random() * 800 + 20))
        .replace(/{money}/g, () => Math.floor(Math.random() * 5000 + 300) + "萬")
        .replace(/{num}/g, () => Math.floor(Math.random() * 99999))
        .replace(/{year}/g, () => 2024 + Math.floor(Math.random() * 5));
}

// ===== chaos math =====
export function chaosMath() {
    const a = Math.floor(Math.random() * 900 + 100);
    const b = Math.floor(Math.random() * 900 + 10);

    return `【系統運算模組】<br>
${a} + ${b}<br>
正常結果：${a + b}<br>
政治解讀：${a + b}<br>
系統判定：數學已敘事化`;
}

// ===== 單張收據生成 =====
export function generateReceipt(memes, input = "") {
    const modes = ["NORMAL", "SYSTEM", "GLITCH", "CHAOS"];
    const mode = rand(modes);

    let parts = [];

    if (mode === "NORMAL") {
        parts = [
            fillTemplate(rand(memes.openings)),
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.endings))
        ];
    }

    if (mode === "SYSTEM") {
        parts = ["【SYSTEM MODE】", fillTemplate(rand(memes.system_weird))];
    }

    if (mode === "GLITCH") {
        parts = ["▓▒░ CORRUPTION ░▒▓", fillTemplate(rand(memes.glitch))];
    }

    if (mode === "CHAOS") {
        parts = [
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.glitch)),
            chaosMath()
        ];
    }

    if (input) {
        parts.unshift(`【INPUT】${input}`);
    }

    return parts.filter(Boolean).join("<br><br>");
}