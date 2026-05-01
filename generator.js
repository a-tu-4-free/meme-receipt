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
        "忠誠奉獻執行員",
        "基本盤穩定貢獻者",
        "小額長期支持者",
        "線上刷卡小英雄",
        "轉帳不手軟的兄弟",
        "定期定額金流機",
        "黨工推薦優質人頭",
        "默默奉獻的無名氏"
    ];

    const rare = [
        "🔥 傳說級金主",
        "💀 地獄級收藏家",
        "🏆 民眾堂終身貢獻獎",
        "🌟 神級隱形金流",
        "⚡ 系統異常核心持有人",
        "☠ 雙標終極執行者",
        "🧨 現金流核彈製造機",
        "👑 堂口隱藏大金主",
        "🚀 超級 VIP 奉獻者",
        "💎 鑽石級洗錢藝術家",
        "🌪️ 亂流製造者",
        "🃏 命運的雙標之子",
        "🔮 預言級金流先知"
    ];

    if (chaos > 75 || stability < 35) {
        return rand(rare);
    }
    return Math.random() > 0.72 ? rand(rare) : rand(normal);
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
        "感謝您讓堂口高層今晚能睡得安穩。",
        "「這筆錢夠戰神買兩杯手搖飲了，感謝！」",
        "蟑螂小姊姊說：這筆很可以，繼續保持。",
        "您的奉獻已成功轉化為堂口戰鬥力。",
        "堂口核心成員一致通過：這是優質奉獻。",
        "「阿北在群組公開表揚你了（雖然沒點名）」",
        "這筆錢將用來對抗綠營的抹黑，感謝您的正義。",
        "高層實領後表示：這位兄弟很懂事。",
        "您的愛心已成功通過雙標審核。",
        "堂口會計師蓋章通過：乾淨又衛生。"
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
        "「這筆錢連澎風安的油錢都不夠。」",
        "「高層看到這筆金額直接把手機摔了。」",
        "「就這？堂口要靠你翻身嗎？」",
        "「建議你回去重新做人再來奉獻。」",
        "「這金額連壁如姐的包都買不起。」",
        "「系統判定：此人奉獻態度嚴重消極。」",
        "「戰神說：這種金額還敢報？勇氣可嘉。」",
        "「阿北：我睡眠品質都被你這筆錢搞差了。」",
        "「請不要汙辱堂口的募款系統，謝謝。」",
        "「高層已將您加入觀察名單，建議盡速加碼。」",
        "「這筆錢拿去買樂透還比較實際。」"
    ];
    return rand(angry);
}

// ==================== 系統吐槽 ====================
export function genComment(state = {}) {
    const chaos = state.chaos || 0;
    const level = state.level || 1;

    const comments = [
        "這筆你真的敢報？",
        "系統判定：異常偏高",
        "會計單位已標記",
        "這不是犯罪，是做帳紀錄",
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
        "系統提示：這筆奉獻可能需要「特別處理」",
        "系統誤判：此為黑色操作，請立即檢查",
        "堂口大佬已經懷疑你的「人頭」來源",
        "⚡️ 預警：不穩定因素正在增加中…",
        "系統報警：金流異常，請重啟流程",
        "「這麼誠實的帳目，哪來的手法？」",
        "系統設定：信號過載，請求中斷",
        "這筆帳勁爆，已經進入超高危險區域",
        "「這筆不會是掉進深層漩渦的金流吧？」",
        "進入破滅模式：系統即將崩潰",
        "⚠️ 指令錯誤：該金額已經超出限度"
    ];

    // 依據不同的 `level` 和 `chaos` 值來改變吐槽的內容
    if (level >= 30) comments.push("LV30以上開始出現現實扭曲現象");
    if (level >= 60) comments.push("⚠️ 警告：系統即將失控，請小心");
    if (level >= 85) comments.push("☠ MEME CORE 已接近完全崩壞狀態");

    // 高混亂值加大吐槽的強度
    if (chaos > 75) {
        comments.push("💀 混亂即將達到臨界點，警告所有人！");
        comments.push("☠ 系統正處於崩潰邊緣，請即刻處理！");
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

// ==================== chaos math（已修正千分位問題） ====================
export function chaosMath() {
    const a = Math.floor(Math.random() * 900 + 100);
    const b = Math.floor(Math.random() * 900 + 10);
    const truth = a + b;

    // 關鍵修正：三個數字都要套用千分位格式
    const format = (n) => n.toLocaleString("zh-TW");

    const narrative = (a * 1000 + b).toString();   // 模擬「黏在一起」的政治敘事
    const distortion = (b * 1000 + a).toString();  // 模擬「系統誤讀」

    return `【系統運算模組】<br>
收據 A：${format(a)}元<br>
收據 B：${format(b)}元<br><br>
真實結果：${format(truth)}元<br>
政治敘事：${format(Number(narrative))}元<br>
系統誤讀：${format(Number(distortion))}元<br><br>
系統判定：數學已被重新定義為三種真相`;
}

// ==================== 收據生成（保留供未來使用） ====================
export function generateReceipt(memes, input = "", state = {}) {
    const chaos = state.chaos || 0;
    const stability = state.stability || 100;

    // 初始的金額較低，假設1000以下就顯示生氣詞庫
    let money = parseInt(genMoney().replace(/,/g, ''));  // 去掉千分位，轉換為數字
    let modePool = ["NORMAL", "SYSTEM", "GLITCH", "CHAOS"];

    // 根據金額判斷詞庫
    let angryChance = money < 1000 ? 0.85 : 0.4;  // 如果金額少於1000，就大概率觸發生氣詞庫

    if (chaos > 60) modePool.push("GLITCH");
    if (chaos > 85) modePool = ["GLITCH", "CHAOS", "SYSTEM"];
    if (stability < 40) modePool = ["SYSTEM", "GLITCH"];

    const mode = rand(modePool);
    let parts = [];

    if (mode === "NORMAL" || Math.random() < angryChance) {
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

    // 根據金額決定是否生成感謝詞庫或生氣詞庫
    if (money < 1000) {
        parts.push(genAngryMessage());  // 金額少於1000時，優先顯示生氣詞庫
    } else {
        parts.push(genThanksMessage());  // 金額高於1000時，顯示感謝詞庫
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

console.log("✅ generator.js v3 - 堂口高層綽號版（chaosMath 已修正千分位） 已載入");