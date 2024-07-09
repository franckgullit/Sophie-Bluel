document.addEventListener('DOMContentLoaded', function () {
    const authToken = localStorage.getItem("authToken");
    const editModeBar = document.getElementById("edit-mode-bar");
    const editButton = document.getElementById("edit-button");
    const loginLogoutButton = document.getElementById("loginlogout-link");
    const filters = document.getElementById("filters");
    const editionMode = document.getElementById("edition-mode")

    // nullifying style=display:none; when an authentification token is present
    if (authToken) {
        editModeBar.style.display = null;
        editButton.style.display = null;
        filters.style.display = "none";
        editionMode.style.display = null;
        loginLogoutButton.textContent = "logout"
    }
    //adding eventlistener to logout
    loginLogoutButton.addEventListener('click', function () {
        if (authToken) {
            localStorage.removeItem("authToken");
            location.reload();
        }
    });
});
