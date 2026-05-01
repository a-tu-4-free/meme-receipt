// ==================== ui.js v3 (堂口高層薪水版) ====================

let lastClickedReceipt = null;

// ==================== 收據渲染（強化互動版） ====================
export function renderReceiptsUI(container, template, list) {
    container.innerHTML = "";

    list.forEach((r, index) => {
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

        // 新增欄位
        if (highSalaryEl) highSalaryEl.innerText = r.highSalary || "—";
        if (actualSalaryEl) actualSalaryEl.innerText = r.actualSalary || "—";
        if (comparisonEl) comparisonEl.innerHTML = r.comparison || "";

        // ==================== 出場動畫（逐張延遲） ====================
        el.style.opacity = "0";
        el.style.transform = "translateY(20px) scale(0.98)";

        setTimeout(() => {
            el.style.transition = "all 0.4s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
        }, index * 120);

        // ==================== 點擊互動（重點） ====================
        el.addEventListener("click", () => {
            // 重複點擊效果
            if (lastClickedReceipt === el) {
                el.style.transform = "scale(1.02) rotate(-1deg)";
            } else {
                el.style.transform = "scale(1.03)";
            }

            setTimeout(() => {
                el.style.transform = "scale(1)";
            }, 150);

            lastClickedReceipt = el;

            // 💀 隨機 glitch flicker 效果
            if (Math.random() > 0.7) {
                el.style.filter = "contrast(2) hue-rotate(180deg)";
                setTimeout(() => {
                    el.style.filter = "none";
                }, 200);
            }

            // 可在此擴充更多點擊後的反應
            console.log(`📄 收據點擊：${r.id}`);
        });

        container.appendChild(clone);
    });
}

// ==================== 系統吐槽（動畫版） ====================
export function renderCommentUI(text) {
    const el = document.getElementById("systemComment");
    if (!el) return;

    // 如果內容一樣 → 觸發抖動
    if (el.innerText === text) {
        el.style.transform = "translateX(4px)";
        setTimeout(() => el.style.transform = "translateX(-4px)", 80);
        setTimeout(() => el.style.transform = "translateX(0)", 160);
        return;
    }

    // 更新文字 + fade effect
    el.style.opacity = "0";
    setTimeout(() => {
        el.innerText = text;
        el.style.transition = "0.3s ease";
        el.style.opacity = "1";
    }, 120);
}