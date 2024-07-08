document.addEventListener('DOMContentLoaded', function () {
    const editionMode = document.getElementById("edition-mode");
    const editButton = document.getElementById("edit-mode-bar");
    const filters = document.getElementById("filters");
    const logOutLink = document.createElement("li");
    const linkText = document.createElement("a");
    linkText.innerText = "Logout";
    logOutLink.appendChild(linkText);

    const loginform = document.getElementById("login-form");
    if (loginform) {
        loginform.addEventListener("submit", function (event) {
            event.preventDefault();
            const logindata = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            };

            if (logindata.ok) {
                window.location.href = "index.html";
                editionMode.classList.remove("hidden");
                editButton.classList.remove("hidden");
                filters.style.display = "none";
            } else {

            }
        });

    }
});
