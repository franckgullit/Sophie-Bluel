function addingsubmitlistener() {
    const loginform = document.getElementById("login-form");
    loginform.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Creating object for login details//
        const logindata = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        //Getting error message//
        const errorMessage = document.getElementById("error-message");

        //converting logindata to format json//
        const submittedform = JSON.stringify(logindata);

        //calling on fetch function//
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: submittedform
            });

            if (response.ok) {
                const data = await response.json();
                const token = authToken;
                localStorage.setItem("authToken", data.token);
                location.href = "index.html";
            } else {
                const errorData = await response.json();
                errorMessage.textContent = "Email ou mot de passe incorrect";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error('Erreur:', error);
            errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
            errorMessage.style.display = "block";
        }
    });
}

addingsubmitlistener();


