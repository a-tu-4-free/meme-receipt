// ==================== generator.js v3 - 堂口高層綽號版 ====================

export function rand(arr) {
    return arr && arr.length
        ? arr[Math.floor(Math.random() * arr.length)]
        : "【SYSTEM LOADING】";
}

// ==================== 基本生成 ====================
export function genMoney(min = 88888, max = 8888888) {
    return Math.floor(Math.random() * (max - min + 1) + min).toLocaleString('zh-TW');
}

export function genId() {
    return "M" + String(Math.floor(100000 + Math.random() * 900000));
}

export function genTime() {
    return new Date().toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}

// ==================== 人頭等級 ====================
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
        "低風險帳務處理員",
        "忠誠奉獻執行員"
    ];

    const rare = [
        "🔥 傳說級金主",
        "💀 地獄級收藏家",
        "🏆 民眾堂終身貢獻獎",
        "🌟 神級隱形金流",
        "⚡ 系統異常核心持有人",
        "☠ 雙標終極執行者"
    ];

    if (chaos > 75 || stability < 35) {
        return rand(rare);
    }
    return Math.random() > 0.75 ? rand(rare) : rand(normal);
}

// ==================== 感謝詞庫（奉獻金額充足時） ====================
export function genThanksMessage() {
    const thanks = [
        "✅ 民眾堂對您的奉獻深表感謝！",
        "「這筆奉獻將成為堂口重要支柱，感謝您的忠誠！」",
        "堂口高層已記下您的貢獻，未來必有回報。",
        "您的支持讓民眾堂得以繼續運作，堂口上下同感溫暖。",
        "「好奉獻！這才是真正的信徒該有的格局。」",
        "阿北看了都點頭，這筆錢很有誠意。",
        "系統已將您列入優先保護名單。",
        "感謝您讓堂口高層今晚能睡得安穩。"
    ];
    return rand(thanks);
}

// ==================== 生氣警語詞庫（奉獻金額不足時） ====================
export function genAngryMessage() {
    const angry = [
        "⚠️ 堂口高層相當不滿！奉獻金額嚴重不足！",
        "「這點錢連高層薪水都不夠，堂口要怎麼運作？」",
        "「再這樣下去，系統將對您進行特別標記。」",
        "「請立即增加奉獻金額，否則後果請自行負責。」",
        "「阿北看了都搖頭，這奉獻也太寒酸了。」",
        "「民眾堂不是慈善機構，請拿出誠意！」",
        "「戰神已經在群組發火了，你知道嗎？」",
        "「蟑螂小姊姊表示非常失望。」",
        "「這筆錢連澎風安的油錢都不夠。」"
    ];
    return rand(angry);
}

// ==================== 系統吐槽（加強版） ====================
export function genComment(state = {}) {
    const chaos = state.chaos || 0;
    const level = state.level || 1;

    const comments = [
        "這筆你真的敢報？",
        "系統判定：異常偏高",
        "審計單位已標記",
        "這不是收據，是紀錄犯罪",
        "🔥 貪污等級上升",
        "你是不是太誠實了",
        "系統：建議立即關機",
        "⚠ 系統開始懷疑你的行為",
        "堂口高層正在討論要不要約談你",
        "阿北：這筆帳很有靈性",
        "戰神已開始準備質詢稿",
        "蟑螂小姊姊正在滑手機看這筆",
        `目前混亂值 ${chaos}，再高就要進入雙太陽模式了`,
        "穩定度持續下降中…建議多捐一點壓壓驚",
        "系統提示：這筆奉獻可能需要「特別處理」"
    ];

    // 等級越高，吐槽越酸
    if (level >= 30) {
        comments.push("LV30以上開始出現現實扭曲現象");
    }
    if (level >= 60) {
        comments.push("⚠️ 警告：系統即將失控，請小心");
    }
    if (level >= 85) {
        comments.push("☠ MEME CORE 已接近完全崩壞狀態");
    }

    return rand(comments);
}

// ==================== 模板替換 ====================
export function fillTemplate(str) {
    if (!str) return "";
    return str
        .replace(/{days}/g, () => Math.floor(Math.random() * 800 + 20))
        .replace(/{money}/g, () => Math.floor(Math.random() * 5000 + 300) + "萬")
        .replace(/{num}/g, () => Math.floor(Math.random() * 99999))
        .replace(/{year}/g, () => 2024 + Math.floor(Math.random() * 5))
        .replace(/{high}/g, () => "堂口高層");
}

// ==================== chaos math ====================
export function chaosMath() {
    const a = Math.floor(Math.random() * 900 + 100);
    const b = Math.floor(Math.random() * 900 + 10);
    const truth = a + b;
    const narrative = "" + a + b;
    const distortion = b + "" + a;
    const format = (n) => n.toLocaleString("zh-TW");

    return `【系統運算模組】<br>
收據 A：${format(a)}元<br>
收據 B：${format(b)}元<br><br>
真實結果：${format(truth)}元<br>
政治敘事：${narrative}元<br>
系統誤讀：${distortion}元<br><br>
系統判定：數學已被重新定義為三種真相`;
}

// ==================== 收據生成（保留原本函式，供未來擴充） ====================
export function generateReceipt(memes, input = "", state = {}) {
    const chaos = state.chaos || 0;
    const stability = state.stability || 100;

    let modePool = ["NORMAL", "SYSTEM", "GLITCH", "CHAOS"];
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
    } else if (mode === "SYSTEM") {
        parts = ["【SYSTEM MODE ACTIVE】", fillTemplate(rand(memes.system_weird))];
    } else if (mode === "GLITCH") {
        parts = ["▓▒░ SYSTEM CORRUPTION ░▒▓", fillTemplate(rand(memes.glitch))];
    } else if (mode === "CHAOS") {
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
        level: genLevel(state)
    };
}

console.log("✅ generator.js v3 - 堂口高層綽號版 已載入");