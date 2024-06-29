let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    
    // To nullify style = display:none; in HTML
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;

    // Closing modal window
    modal.addEventListener("click", closeModal);
    const closeButton = modal.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
};

const closeModal = function(e) {
    if (modal === null) return;
    e.preventDefault();

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    
    const closeButton = modal.querySelector(".close-button");
    if (closeButton) {
        closeButton.removeEventListener("click", closeModal);
    }
    
    modal = null;
};

// Opening modal window when 'js-modal' link is clicked
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
});
