// ==================== generator.js v2 (STATE SYSTEM) ====================

export function rand(arr) {
    return arr && arr.length
        ? arr[Math.floor(Math.random() * arr.length)]
        : "【SYSTEM LOADING】";
}

// ==================== 基本生成 ====================
export function genMoney() {
    return Math.floor(Math.random() * 900000 + 1000).toLocaleString();
}

export function genId() {
    return "SYS-" + Math.floor(Math.random() * 9999999);
}

export function genTime() {
    return new Date().toLocaleString("zh-TW");
}

// ==================== 人頭等級（會看狀態） ====================
export function genLevel(state = {}) {

    const chaos = state.chaos || 0;
    const stability = state.stability || 100;

    const normal = [
        "特級人頭供養者",
        "洗錢小草",
        "木可金流師",
        "橘子運輸中隊長",
        "政治獻金優化師",
        "系統性帳務觀察員",
        "低風險帳務處理員"
    ];

    const rare = [
        "🔥 傳說級金主",
        "💀 地獄級收藏家",
        "🏆 民眾堂終身貢獻獎",
        "🌟 神級隱形金流",
        "⚡ 系統異常核心持有人"
    ];

    // 💀 系統越亂 → 等級越瘋
    if (chaos > 80 || stability < 30) {
        return rand(rare);
    }

    return Math.random() > 0.8 ? rand(rare) : rand(normal);
}

// ==================== 系統吐槽 ====================
export function genComment() {
    const comments = [
        "這筆你真的敢報？",
        "系統判定：異常偏高",
        "審計單位已標記",
        "這不是收據，是紀錄犯罪",
        "🔥 貪污等級上升",
        "你是不是太誠實了",
        "系統：建議立即關機",
        "⚠ 系統開始懷疑你的行為"
    ];

    return rand(comments);
}

// ==================== 模板替換 ====================
export function fillTemplate(str) {
    if (!str) return "";

    return str
        .replace(/{days}/g, () => Math.floor(Math.random() * 800 + 20))
        .replace(/{money}/g, () => Math.floor(Math.random() * 5000 + 300) + "萬")
        .replace(/{num}/g, () => Math.floor(Math.random() * 99999))
        .replace(/{year}/g, () => 2024 + Math.floor(Math.random() * 5));
}

// ==================== chaos math ====================
export function chaosMath() {
    const a = Math.floor(Math.random() * 900 + 100);
    const b = Math.floor(Math.random() * 900 + 10);

    return `【系統運算模組】<br>
${a} + ${b}<br>
正常結果：${a + b}<br>
政治解讀：${a + b}<br>
系統判定：數學已敘事化`;
}

// ==================== 收據生成（核心升級） ====================
export function generateReceipt(memes, input = "", state = {}) {

    const chaos = state.chaos || 0;
    const stability = state.stability || 100;

    // 🔥 動態模式池（會變）
    let modePool = [
        "NORMAL",
        "SYSTEM",
        "GLITCH",
        "CHAOS"
    ];

    if (chaos > 60) modePool.push("GLITCH");
    if (chaos > 85) modePool = ["GLITCH", "CHAOS", "SYSTEM"];
    if (stability < 40) modePool = ["SYSTEM", "GLITCH"];

    const mode = rand(modePool);

    let parts = [];

    if (mode === "NORMAL") {
        parts = [
            fillTemplate(rand(memes.openings)),
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.endings))
        ];
    }

    if (mode === "SYSTEM") {
        parts = [
            "【SYSTEM MODE ACTIVE】",
            fillTemplate(rand(memes.system_weird))
        ];
    }

    if (mode === "GLITCH") {
        parts = [
            "▓▒░ SYSTEM CORRUPTION ░▒▓",
            fillTemplate(rand(memes.glitch))
        ];
    }

    if (mode === "CHAOS") {
        parts = [
            fillTemplate(rand(memes.usages)),
            fillTemplate(rand(memes.glitch)),
            chaosMath()
        ];
    }

    // 💀 玩家輸入影響系統
    if (input) {
        parts.unshift(`【INPUT】${input}`);
    }

    return {
        content: parts.filter(Boolean).join("<br><br>"),
        money: genMoney(),
        id: genId(),
        time: genTime(),
        level: genLevel(state)
    };
}