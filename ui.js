// ==================== ui.js ====================

export function renderReceiptsUI(container, template, list) {
    container.innerHTML = "";

    list.forEach(r => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".result").innerHTML = r.content;
        clone.querySelector(".rmoney").innerText = r.money;
        clone.querySelector(".rid").innerText = r.id;
        clone.querySelector(".rtime").innerText = r.time;
        clone.querySelector(".rlevel").innerText = r.level;

        container.appendChild(clone);
    });
}

export function renderCommentUI(text) {
    const el = document.getElementById("systemComment");
    if (el) el.innerText = text;
}