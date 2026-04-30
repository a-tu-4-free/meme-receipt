// ==================== ui.js v2 (INTERACTION UPGRADE) ====================

let lastClickedReceipt = null;

// ==================== 收據渲染（強化互動版） ====================
export function renderReceiptsUI(container, template, list) {

    container.innerHTML = "";

    list.forEach((r, index) => {

        const clone = template.content.cloneNode(true);

        const el = clone.querySelector(".receipt");

        const resultEl = clone.querySelector(".result");
        const moneyEl = clone.querySelector(".rmoney");
        const idEl = clone.querySelector(".rid");
        const timeEl = clone.querySelector(".rtime");
        const levelEl = clone.querySelector(".rlevel");

        // ====================
        // 基本資料填入
        // ====================
        resultEl.innerHTML = r.content;
        moneyEl.innerText = r.money;
        idEl.innerText = r.id;
        timeEl.innerText = r.time;
        levelEl.innerText = r.level;

        // ====================
        // 出場動畫（逐張延遲）
        // ====================
        el.style.opacity = "0";
        el.style.transform = "translateY(20px) scale(0.98)";

        setTimeout(() => {
            el.style.transition = "all 0.4s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
        }, index * 120);

        // ====================
        // 點擊互動（重點）
        // ====================
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

            // 💀 隨機 glitch flicker
            if (Math.random() > 0.7) {
                el.style.filter = "contrast(2) hue-rotate(180deg)";
                setTimeout(() => {
                    el.style.filter = "none";
                }, 200);
            }
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