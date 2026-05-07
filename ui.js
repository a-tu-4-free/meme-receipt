// ==================== MEME CORE UI ENGINE ====================

// ==================== EFFECT CACHE ====================
let activeReceipt = null;

/**
 * =========================
 * 📄 RENDER RECEIPTS
 * =========================
 */
export function renderReceiptsUI(container, template, list) {
    container.innerHTML = "";

    list.forEach((r, index) => {
        const node = template.content.cloneNode(true);
        const el = node.querySelector(".receipt");

        // ================= TYPE STYLE =================
        if (r.type === "tangkou") {
            el.classList.add("tangkou");
        }

        // ================= DATA BIND =================
        bindText(node, ".result", r.content);
        bindText(node, ".rmoney", r.money);
        bindText(node, ".rid", r.id);
        bindText(node, ".rtime", r.time);
        bindText(node, ".rhighsalary", r.highSalary);
        bindText(node, ".ractual", r.actualSalary);

        const comp = node.querySelector(".comparison");
        if (comp) comp.innerHTML = r.comparison || "";

        // ================= ENTRY ANIMATION =================
        setEntryAnimation(el, index);

        // ================= INTERACTION =================
        attachReceiptInteraction(el, r);

        container.appendChild(node);
    });
}

/**
 * =========================
 * 🔗 bind helper
 * =========================
 */
function bindText(root, selector, value) {
    const el = root.querySelector(selector);
    if (el) el.innerText = value ?? "—";
}

/**
 * =========================
 * 🎬 ENTRY ANIMATION SYSTEM
 * =========================
 */
function setEntryAnimation(el, index) {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px) scale(0.98)";

    setTimeout(() => {
        el.style.transition = "0.35s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
    }, index * 100);
}

/**
 * =========================
 * 🧠 RECEIPT INTERACTION ENGINE
 * =========================
 */
function attachReceiptInteraction(el, data) {
    let clickLock = false;

    el.addEventListener("click", () => {
        if (clickLock) return;
        clickLock = true;

        // base scale effect
        el.style.transform = "scale(1.03)";

        setTimeout(() => {
            el.style.transform = "scale(1)";
            clickLock = false;
        }, 150);

        // repeat click accent
        if (activeReceipt === el) {
            el.style.transform = "scale(1.05) rotate(-1deg)";
        }

        activeReceipt = el;

        // ================= glitch chance =================
        triggerGlitch(el);

        console.log(`📄 receipt clicked: ${data.id}`);
    });

    // hover micro effect
    el.addEventListener("mouseenter", () => {
        el.style.transition = "0.2s";
        el.style.transform = "translateY(-3px)";
    });

    el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0)";
    });
}

/**
 * =========================
 * 💀 GLITCH ENGINE
 * =========================
 */
function triggerGlitch(el) {
    const r = Math.random();

    if (r > 0.65) {
        el.style.filter = "contrast(2) hue-rotate(160deg)";

        setTimeout(() => {
            el.style.filter = "none";
        }, 180);
    }

    if (r > 0.85) {
        el.style.transform = "translateX(3px)";
        setTimeout(() => el.style.transform = "translateX(-3px)", 50);
        setTimeout(() => el.style.transform = "translateX(0)", 100);
    }
}

/**
 * =========================
 * 💬 COMMENT SYSTEM
 * =========================
 */
export function renderCommentUI(text) {
    const el = document.getElementById("systemComment");
    if (!el) return;

    // same text → shake instead of replace
    if (el.innerText === text) {
        shake(el);
        return;
    }

    // fade update
    el.style.opacity = "0";

    setTimeout(() => {
        el.innerText = text;
        el.style.transition = "0.25s ease";
        el.style.opacity = "1";
    }, 100);
}

/**
 * =========================
 * 📳 SHAKE EFFECT
 * =========================
 */
function shake(el) {
    el.style.transform = "translateX(4px)";

    setTimeout(() => el.style.transform = "translateX(-4px)", 60);
    setTimeout(() => el.style.transform = "translateX(2px)", 120);
    setTimeout(() => el.style.transform = "translateX(0)", 180);
}