// ==================== generator.js v3 (雙太陽堂口版) ====================
export function rand(arr) {
    return arr && arr.length
        ? arr[Math.floor(Math.random() * arr.length)]
        : "【SYSTEM LOADING】";
}

// ==================== 金額生成（已按你需求調整） ====================
// 隨機撈錢：平常低，極低機率爆高
export function genRandomMoney() {
    if (Math.random() < 0.008) { 
        return Math.floor(Math.random() * 850000) + 120000; 
    }
    return Math.floor(Math.random() * 1250) + 60; 
}

// 堂口模式：平常低，極低機率爆很高
export function genTangkouMoney() {
    if (Math.random() < 0.006) { 
        return Math.floor(Math.random() * 48000000) + 8000000; 
    }
    return Math.floor(Math.random() * 4800) + 650; 
}

// 錢再多一點（升級）
export function genUpgradeBonus() {
    if (Math.random() < 0.022) { 
        return Math.floor(Math.random() * 1500000) + 95000; 
    }
    return Math.floor(Math.random() * 9200) + 800; 
}

// ==================== 超級大獎（一天最多一次） ====================
export function isJackpotTriggered() {
    const today = new Date().toISOString().split('T')[0];
    if (localStorage.getItem('jackpotToday') === today) return false;
    return Math.random() < 0.003; 
}

export function markJackpotTriggered() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('jackpotToday', today);
}

// ==================== 其他基本生成 ====================
export function genId() {
    return "SYS-" + Math.floor(Math.random() * 9999999).toString().padStart(7, '0');
}

export function genTime() {
    return new Date().toLocaleString("zh-TW", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function genHighSalary() {
    return Math.floor(Math.random() * (450000 - 80000 + 1) + 80000);
}

export function genTangkouName() {
    const names = [
        "白賊阿北", "咆嘯戰神", "蟑螂小姊姊", "新年快樂", "堂口之母",
        "電梯扔蛋男", "藍白雙標王", "側翼總指揮", "阿北身邊的女人",
        "政治精算師", "柯學教主", "戰神護法", "小草總幹事", "民眾堂金流師",
        "拖走行李的橘子", "賺四代網軍大將", "六十年老同學的妹妹",
        "B18的三叔公的姊夫的姪子", "九二共事執行長", "增豓動員指揮官",
        "高樓層攝影師", "國台拌三三談談專家", "小沈安排的人頭",
        "堂口御用剪輯師", "民眾堂帳房", "白賊阿北的影子", "立法戰狼",
        "空心菜", "吉他戰神"
    ];
    return rand(names);
}

export function genLevel(state = {}) {
    const chaos = state.chaos || 0;
    const stability = state.stability || 100;
    const normal = [
        "特級人頭供養者", "洗錢小草", "木可金流師", "橘子運輸中隊長",
        "政治獻金優化師", "系統性帳務觀察員", "低風險帳務處理員"
    ];
    const rare = [
        "🔥 傳說級金主", "💀 地獄級收藏家", "🏆 民眾堂終身貢獻獎",
        "🌟 神級隱形金流", "⚡ 系統異常核心持有人"
    ];
    if (chaos > 80 || stability < 30) {
        return rand(rare);
    }
    return Math.random() > 0.8 ? rand(rare) : rand(normal);
}

export function genThanksMessage() {
    const thanks = [
        "✅ 民眾堂對您的奉獻深表感謝！",
        "「這筆奉獻將成為堂口重要支柱，感謝您的忠誠！」",
        "堂口高層已記下您的貢獻，未來必有回報。",
        "您的支持讓民眾堂得以繼續運作，堂口上下同感溫暖。",
        "「好奉獻！這才是真正的信徒該有的格局。」",
        "白賊阿北看了都說讚，這筆錢很會做事！",
        "堂口之母表示：這才是正確的奉獻態度！",
        "您的忠誠已上傳雲端，永不刪除。",
        "蟑螂小姊姊說：這筆錢會幫您在堂口排好位置。",
        "咆嘯戰神親自批示：此人值得重點培養！",
        "民眾堂帳房先生表示：這筆奉獻非常有眼光。",
        "感謝您讓堂口又多了一位優質金主！",
        "這筆錢會化作無數小草，替您衝鋒陷陣。",
        "堂口已將您的名字刻在別人的胸口上。",
        "阿北在睡夢中都為您點了讚！",
        "這筆奉獻讓堂口高層眉開眼笑。",
        "您的名字已被列入堂口VIP名單。"
    ];
    return rand(thanks);
}

export function genAngryMessage() {
    const angry = [
        "⚠️ 堂口高層相當不滿！奉獻金額嚴重不足！",
        "「這點錢連高層薪水都不夠，堂口要怎麼運作？」",
        "「再這樣下去，系統將對您進行特別標記。」",
        "「請立即增加奉獻金額，否則後果請自行負責。」",
        "「阿北看了都搖頭，這奉獻也太寒酸了。」",
        "「民眾堂不是慈善機構，請拿出誠意！」",
        "咆嘯戰神已發飆：這是什麼鬼金額？",
        "堂口之母表示：你這是在羞辱整個民眾堂！",
        "白賊阿北說：這種奉獻我看不下去。",
        "蟑螂小姊姊已準備對你發出律師函。",
        "這筆錢連電梯都不夠搭，堂口很失望。",
        "「就這？建議你回去再考慮一下。」",
        "高層已將您列入「低貢獻觀察名單」",
        "這種金額只夠買一包小草，堂口不需要！",
        "阿北：我寧願去睡覺也不想看這種奉獻。",
        "堂口帳房：這筆錢我都不好意思入帳。",
        "警告！再不加碼將取消您的金主資格。",
        "這奉獻連小草都看不起。",
        "阿北已氣到拍桌！",
        "請不要惹阿北生氣！"
    ];
    return rand(angry);
}

export function genComment() {
    const comments = [
        "這筆你真的敢報？", "系統判定：異常偏高", "審計單位已標記",
        "這不是犯罪，是作帳", "🔥 貪污等級上升", "你是不是太誠實了",
        "系統：建議立即關機", "⚠ 系統開始懷疑你的行為",
        "堂口高層正在看這筆帳", "白賊阿北：這數字我三月才知道",
        "咆嘯戰神已進入暴怒模式", "蟑螂小姊姊說：笑死，根本沒誠意",
        "堂口之母搖頭：太小氣了吧", "系統判定：這是低端奉獻",
        "阿北在睡覺，醒來看到這筆錢會氣醒", "小草們集體沉默中...",
        "這筆錢連電梯費都不夠", "建議你下次直接捐給對手比較快",
        "系統：已自動幫你標記為「可疑金主」", "民眾堂帳房：我不想接這筆錢",
        "警告！再這樣下去會被列入觀察名單", "這奉獻金額... 堂口會倒閉的啦",
        "政治精算師表示：你這操作非常外行", "系統吐槽：格局小了點兄弟",
        "白賊阿北：我寧願繼續睡也不想看這個", "這筆錢只夠買一包衛生紙",
        "堂口已將此筆奉獻評為「笑話等級」", "偵測到低配金主，正在自動鄙視",
        "系統：你確定這不是在酸民眾堂？", "這筆奉獻連阿北的助理都看不下去。",
        "系統：這筆錢連B18都無法用ATM理財術！"
    ];
    return rand(comments);
}

export function fillTemplate(str) {
    if (!str) return "";
    return str
        .replace(/{days}/g, () => Math.floor(Math.random() * 800 + 20))
        .replace(/{money}/g, () => Math.floor(Math.random() * 5000 + 300) + "萬")
        .replace(/{num}/g, () => Math.floor(Math.random() * 99999))
        .replace(/{year}/g, () => 2024 + Math.floor(Math.random() * 5));
}

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

// ==================== 完整收據生成 ====================
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
        money: genRandomMoney(),
        id: genId(),
        time: genTime(),
        level: genLevel(state)
    };
}