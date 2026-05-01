// ==================== ui.js v4 - 雙太陽模式支援版 ====================

let lastClickedReceipt = null;

// ==================== 收據渲染（支援單張與雙太陽模式） ====================
export function renderReceiptsUI(container, template, list) {
    container.innerHTML = "";

    if (!list || list.length === 0) return;

    const isDoubleMode = list.length >= 2;

    if (isDoubleMode) {
        container.classList.add("double");
    } else {
        container.classList.remove("double");
    }

    list.forEach((r, index) => {
        const clone = template.content.cloneNode(true);
        const receiptEl = clone.querySelector(".receipt");

        // 加入風格 class
        if (r.isKo) receiptEl.classList.add("ko");
        if (r.isHuang) receiptEl.classList.add("huang");

        // ==================== 資料填入 ====================
        const resultEl = clone.querySelector(".result");
        const moneyEl = clone.querySelector(".rmoney");
        const idEl = clone.querySelector(".rid");
        const timeEl = clone.querySelector(".rtime");
        const highSalaryEl = clone.querySelector(".rhighsalary");
        const actualSalaryEl = clone.querySelector(".ractual");
        const comparisonEl = clone.querySelector(".comparison");

        resultEl.innerHTML = r.content || "";
        moneyEl.innerText = r.money || "0";
        idEl.innerText = r.id || "SYS-000000";
        timeEl.innerText = r.time || "—";
        
        if (highSalaryEl) highSalaryEl.innerText = r.highSalary || "—";
        if (actualSalaryEl) actualSalaryEl.innerText = r.actualSalary || "—";
        if (comparisonEl) comparisonEl.innerHTML = r.comparison || "";

        // ==================== 出場動畫 ====================
        receiptEl.style.opacity = "0";
        receiptEl.style.transform = "translateY(40px) scale(0.92)";

        const delay = isDoubleMode ? index * 120 : 50;

        setTimeout(() => {
            receiptEl.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
            receiptEl.style.opacity = "1";
            receiptEl.style.transform = "translateY(0) scale(1)";
        }, delay);

        // ==================== 點擊互動 ====================
        receiptEl.addEventListener("click", () => {
            // 重複點擊增加特殊效果
            if (lastClickedReceipt === receiptEl) {
                receiptEl.style.transform = "scale(1.06) rotate(3deg)";
            } else {
                receiptEl.style.transform = "scale(1.08)";
            }

            setTimeout(() => {
                receiptEl.style.transform = "scale(1)";
            }, 220);

            lastClickedReceipt = receiptEl;

            // 根據不同風格觸發不同 glitch 效果
            if (r.isKo) {
                // 阿北風格 - 冷靜但帶點酸
                receiptEl.style.filter = "hue-rotate(90deg) saturate(1.6)";
            } else if (r.isHuang) {
                // 戰神風格 - 激昂紅調
                receiptEl.style.filter = "hue-rotate(0deg) contrast(1.8) saturate(1.4)";
            } else {
                // 一般 glitch
                if (Math.random() > 0.6) {
                    receiptEl.style.filter = "contrast(2.1) hue-rotate(200deg) saturate(1.5)";
                }
            }

            setTimeout(() => {
                receiptEl.style.filter = "none";
            }, 280);

            console.log(`📄 收據點擊：${r.id} ${r.isKo ? '(柯文哲風格)' : r.isHuang ? '(黃國昌風格)' : ''}`);
        });

        container.appendChild(clone);
    });
}

// ==================== 系統吐槽 UI（優化版） ====================
export function renderCommentUI(text) {
    const el = document.getElementById("systemComment");
    if (!el) return;

    // 如果是同一段文字，觸發輕微抖動效果
    if (el.textContent === text) {
        el.style.transition = "transform 0.2s";
        el.style.transform = "translateX(8px)";
        
        setTimeout(() => el.style.transform = "translateX(-8px)", 80);
        setTimeout(() => el.style.transform = "translateX(0)", 240);
        return;
    }

    // 淡出 → 更新文字 → 淡入
    el.style.transition = "opacity 0.25s ease";
    el.style.opacity = "0";

    setTimeout(() => {
        el.innerHTML = text;   // 使用 innerHTML 支援 <br> 和 <span>
        el.style.transition = "opacity 0.4s ease";
        el.style.opacity = "1";
    }, 180);
}

// ==================== 額外：可選的全域收據點擊音效提示（未來可擴充） ====================
export function initReceiptClickEffect() {
    console.log("🖱️ ui.js - 收據互動效果已初始化（雙太陽模式支援）");
}

// 自動初始化提示
initReceiptClickEffect();