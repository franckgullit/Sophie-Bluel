let modal = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    
    // To nullify style = display:none; in HTML
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");

    // Closing modal window//
    modal.addEventListener("click", closeModal);
    const closeButton = modal.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    //preventing closure of modal window upon click IN modal window//
    modal.querySelector(".modal-content").addEventListener("click",function(e) {
        e.stopPropagation();
    });

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



