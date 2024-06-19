function addingsubmitlistener() {
    const loginform = document.querySelector(".login-form");
    loginform.addEventListener("submit", function (event) {
        event.preventDefault();

        // Creating object for login details//
        const logindata = {
            email: event.target.querySelector("emailinput").value,
            password: event.target.querySelector("passwordinput").value,
            errormessage: event.target.getElementbyId("error-message").value,
        };

        //converting logindata to format json//
        const submittedform = JSON.stringify(logindata);

        //calling on fetch function//
        try {
            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "content-type": "application/Json" },
                body: "submittedform"
            });

            if (submittedform.match) {
                const data = response.json()
                    .then(data => localStorage.setItem);
                location.href = 'index.html';
            } else {
                errorMessage.textContent = 'Email ou mot de passe incorrect';
                errorMessage.style.display = 'block';
            }
         } catch (error) {
                console.error('Erreur:', error);
                errorMessage.style.display = 'block';
        }
    });
}
