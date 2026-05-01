// ==================== ui.js v4 (單張收據優化版) ====================

let lastClickedReceipt = null;

// ==================== 收據渲染（單張版本） ====================
export function renderReceiptsUI(container, template, list) {
    container.innerHTML = "";

    // 因為現在只顯示一張，所以取第一筆資料
    const r = list[0];
    if (!r) return;

    const clone = template.content.cloneNode(true);
    const el = clone.querySelector(".receipt");

    // ==================== 基本資料填入 ====================
    const resultEl = clone.querySelector(".result");
    const moneyEl = clone.querySelector(".rmoney");
    const idEl = clone.querySelector(".rid");
    const timeEl = clone.querySelector(".rtime");
    const highSalaryEl = clone.querySelector(".rhighsalary");
    const actualSalaryEl = clone.querySelector(".ractual");
    const comparisonEl = clone.querySelector(".comparison");

    // 填入資料
    resultEl.innerHTML = r.content || "";
    moneyEl.innerText = r.money || "0";
    idEl.innerText = r.id || "SYS-000000";
    timeEl.innerText = r.time || "—";

    if (highSalaryEl) highSalaryEl.innerText = r.highSalary || "—";
    if (actualSalaryEl) actualSalaryEl.innerText = r.actualSalary || "—";
    if (comparisonEl) comparisonEl.innerHTML = r.comparison || "";

    // ==================== 出場動畫（單張版本） ====================
    el.style.opacity = "0";
    el.style.transform = "translateY(30px) scale(0.95)";

    setTimeout(() => {
        el.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
    }, 50);

    // ==================== 點擊互動 ====================
    el.addEventListener("click", () => {
        // 重複點擊時增加旋轉效果
        if (lastClickedReceipt === el) {
            el.style.transform = "scale(1.03) rotate(-2deg)";
        } else {
            el.style.transform = "scale(1.05)";
        }

        setTimeout(() => {
            el.style.transform = "scale(1)";
        }, 180);

        lastClickedReceipt = el;

        // 隨機 glitch 效果
        if (Math.random() > 0.65) {
            el.style.filter = "contrast(2.2) hue-rotate(200deg) saturate(1.3)";
            setTimeout(() => {
                el.style.filter = "none";
            }, 220);
        }

        console.log(`📄 收據點擊：${r.id}`);
    });

    container.appendChild(clone);
}

// ==================== 系統吐槽（動畫版） ====================
export function renderCommentUI(text) {
    const el = document.getElementById("systemComment");
    if (!el) return;

    // 如果內容一樣 → 觸發左右抖動
    if (el.innerText === text) {
        el.style.transform = "translateX(6px)";
        setTimeout(() => el.style.transform = "translateX(-6px)", 80);
        setTimeout(() => el.style.transform = "translateX(0)", 180);
        return;
    }

    // 更新文字 + 淡入效果
    el.style.opacity = "0";
    setTimeout(() => {
        el.innerText = text;
        el.style.transition = "opacity 0.35s ease";
        el.style.opacity = "1";
    }, 100);
}