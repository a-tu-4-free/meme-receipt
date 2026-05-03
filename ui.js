// ==================== ui.js v3 (堂口高層版 - 雙太陽模式) ====================
let lastClickedReceipt = null;

// ==================== 收據渲染（強化互動版） ====================
export function renderReceiptsUI(container, template, list) {
    container.innerHTML = "";

    list.forEach((r, index) => {
        const clone = template.content.cloneNode(true);
        const el = clone.querySelector(".receipt");

        // 根據類型加入樣式
        if (r.type === "tangkou") {
            el.classList.add("tangkou");
        }

        // 基本資料填入
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

        // 出場動畫（逐張延遲）
        el.style.opacity = "0";
        el.style.transform = "translateY(30px) scale(0.95)";

        setTimeout(() => {
            el.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
        }, index * 100);

        // ==================== 點擊互動 ====================
        el.addEventListener("click", () => {
            // 點擊放大 + 輕微旋轉
            if (lastClickedReceipt === el) {
                el.style.transition = "all 0.15s";
                el.style.transform = "scale(1.06) rotate(-2deg)";
            } else {
                el.style.transition = "all 0.2s";
                el.style.transform = "scale(1.08)";
            }

            setTimeout(() => {
                el.style.transition = "all 0.4s ease";
                el.style.transform = "scale(1) rotate(0deg)";
            }, 180);

            lastClickedReceipt = el;

            // 隨機 glitch 效果
            if (Math.random() > 0.6) {
                el.style.filter = "contrast(2.2) hue-rotate(160deg) brightness(1.3)";
                setTimeout(() => el.style.filter = "none", 280);
            }

            // 超大金額加強特效
            const moneyNum = parseInt((r.money || "0").replace(/,/g, ''));
            if (moneyNum > 100000) {
                el.classList.add("jackpot");
                setTimeout(() => el.classList.remove("jackpot"), 2500);
            }

            console.log(`📄 收據點擊：${r.id || 'N/A'} (${r.type || 'random'}) - 金額 ${r.money}`);
        });

        container.appendChild(clone);
    });
}

// ==================== 系統吐槽（動畫版） ====================
export function renderCommentUI(text) {
    const el = document.getElementById("systemComment");
    if (!el) return;

    // 超級大獎加強特效
    if (text.includes("超級大獎") || text.includes("失控") || text.includes("大獎")) {
        el.style.transition = "none";
        el.style.transform = "scale(0.8)";
        el.style.color = "#f59e0b";

        setTimeout(() => {
            el.style.transition = "all 0.4s ease";
            el.style.transform = "scale(1.15)";
        }, 10);

        setTimeout(() => {
            el.style.transform = "scale(1)";
            el.style.color = "#fbbf24";
        }, 800);
    }

    // 一般文字更新
    if (el.innerText === text) {
        el.style.transition = "transform 0.1s";
        el.style.transform = "translateX(6px)";
        setTimeout(() => el.style.transform = "translateX(-6px)", 80);
        setTimeout(() => el.style.transform = "translateX(0)", 180);
        return;
    }

    el.style.opacity = "0";
    setTimeout(() => {
        el.innerHTML = text;
        el.style.transition = "opacity 0.35s ease";
        el.style.opacity = "1";
    }, 150);
}

// ==================== 全域大獎特效 ====================
export function triggerJackpotEffect() {
    const body = document.body;
    body.style.transition = "filter 0.6s";
    body.style.filter = "hue-rotate(30deg) brightness(1.4) saturate(1.6)";

    setTimeout(() => {
        body.style.filter = "none";
    }, 1200);

    // 畫面金色閃光
    const flash = document.createElement("div");
    flash.style.cssText = `
        position: fixed; 
        inset: 0; 
        background: #fbbf24; 
        opacity: 0.28; 
        pointer-events: none; 
        z-index: 999999;
        animation: jackpotFlash 0.8s forwards;
    `;
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 1500);
}