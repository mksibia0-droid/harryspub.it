// ===============================
// POPUP LOGIC (5 minutes timeout)
// ===============================

const LS_KEY = "harrys_opening_seen_time";
const OVERLAY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const overlay = document.getElementById("openingOverlay");
const closeBtn = document.getElementById("closeOverlay");

// Hide function (when user clicks close)
function hideOverlay() {
    if (!overlay) return;

    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");

    // Save current timestamp
    try {
        localStorage.setItem(LS_KEY, Date.now().toString());
    } catch (_) {}
}

// Check timing on every page load
(function checkOverlayTime() {
    if (!overlay) return;

    try {
        const savedTime = localStorage.getItem(LS_KEY);

        if (!savedTime) return; // User ne kabhi close nahi kiya → show popup

        const diff = Date.now() - Number(savedTime);

        if (diff < OVERLAY_TIMEOUT) {
            // 5 minutes se kam time hua → popup hide
            overlay.classList.add("hidden");
            overlay.setAttribute("aria-hidden", "true");
        } else {
            // 5 minutes complete → popup dikhna chahiye
            localStorage.removeItem(LS_KEY);
        }

    } catch (_) {}
})();

// Close popup events
if (overlay && closeBtn) {
    closeBtn.addEventListener("click", hideOverlay);

    // Background click closes popup
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hideOverlay();
    });
}



// ===============================
// SMOOTH SCROLL
// ===============================
function smoothScrollTo(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: "smooth" });
}

document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-scroll");
        if (target) smoothScrollTo(target);
    });
});



// ===============================
// FOOTER YEAR
// ===============================
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}