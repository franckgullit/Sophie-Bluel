let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
// to nullify style = display:none; in htmml//
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target

    //closing modal window//
    modal.addEventListener("click", closeModal)
    modal.querySelector(".close-button").addEventListener("click", closeModal)
}

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".close-button").removeEventListener("click", closeModal)
    modal = null
}

// Opening modal window when 'modifier'link is clicked//
document.querySelectorAll("js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})
