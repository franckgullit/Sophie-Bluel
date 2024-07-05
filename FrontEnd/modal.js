let modal = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.getElementById("modal");

    // To nullify style = display:none; in HTML//
    modal.style.display = null
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");

    // Closing modal window//
    modal.addEventListener("click", closeModal);
    const closeButton = modal.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    //preventing closure of modal window upon click IN modal window//
    modal.querySelector(".modal-content").addEventListener("click", function (e) {
        e.stopPropagation();
    });

};
//close modal function//
const closeModal = function (e) {
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

// Opening modal window when 'js-modal' link is clicked//
document.getElementById("edit-button").addEventListener("click", (e) => openModal(e))

// managing modal content//
async function begin() {
    try {
        // Recupération des données des travaux via l'API//
        let response = await fetch("http://localhost:5678/api/works");
        let data = await response.json();
        displaymodalGallery(data);
        console.log(data);
    } catch (error) {
        console.error("Error fetching works:", error);
    }
}

function displaymodalGallery(data) {
    let modalGallery = document.querySelector(".modal-gallery");

    // Emptying modal Gallery//
    modalGallery.innerHTML = "";

    data.forEach(item => {
        let modalfigureElement = document.createElement("figure");

        // Creating image element//
        const imgmodalElement = document.createElement("img");
        imgmodalElement.src = item.imageUrl;

        // Adding created image to figure element//
        modalfigureElement.appendChild(imgmodalElement);

        // Creating trashicon
        const trashIconElement = document.createElement("i");
        trashIconElement.classList.add("fa-solid", "fa-trash-can");
        // Storing item ID in data attribute//
        trashIconElement.dataset.id = item.id;

        // Adding trashicon to figure//
        modalfigureElement.appendChild(trashIconElement);

        // Adding created figures to modalgallery//
        modalGallery.appendChild(modalfigureElement);

        // Adding event listener to the trash icon//
        trashIconElement.addEventListener("click", (e) => deleteItem(e));
    });
}

//Creating deleteItem function//
async function deleteItem(e) {
    const itemId = e.target.dataset.id;
    const token = localStorage.getItem("authToken", data.token);

    if (!token) {
        console.error("Token is not available.");
        return;
    }

    try {
        let response = await fetch("http://localhost:5678/api/works/" + itemId, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (response.ok) {
            // Removal of deleted item from the gallery//
            e.target.parentElement.remove();
        } else {
            console.error("Error deleting item:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}
begin();

//Accessing second modal for edit uploads//
let modal2 = null;

const openModal2 = function (e) {
    e.preventDefault();
    modal2 = document.getElementById("modal2");

    // To nullify style = display:none; in HTML in modal2//
    modal2.style.display = null
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", "true");

    // Closing modal2 window//
    modal2.addEventListener("click", closeModal2);
    const closeButton = modal2.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal2);
    }

    //adding event listener to back button in modal2//
    const backButton = modal2.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", goBack)
    }

    //preventing closure of modal2 window upon click IN modal2 window//
    modal2.querySelector(".modal-content").addEventListener("click", function (e) {
        e.stopPropagation();
    });
};

// Opening modal2 window when 'ajouter une photo' is clicked//
document.getElementById("add-photo-button").addEventListener("click", (e) => openModal2(e));

//creating modal2 close function//
const closeModal2 = function (e) {
    if (modal2 === null) return;
    e.preventDefault();

    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true");
    modal2.removeAttribute("aria-modal");
    modal2.removeEventListener("click", closeModal2);

    const closeButton = modal2.querySelector(".close-button");
    if (closeButton) {
        closeButton.removeEventListener("click", closeModal2);
    }
    modal2 = null;
}

//creating goBAck function//
const goBack = function (e) {
    if (modal2 === null) return;
    e.preventDefault();

    const backButton = modal2.querySelector(".back-button");
    if (backButton) {
        backButton.removeEventListener("click", closeModal2);
    }
    closeModal2(e);
}

//Managing Modal2 upload info//
function addinguploadlistener() {
    const uploadform = document.getElementById("upload-form");
    uploadform.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Creating object for upload//
        const uploadinfo = {
            uploadphotobutton: document.getElementById("upload-photo-button"),
            phototitle: document.getElementById("photo-title").value,
            photocategory: document.getElementById("photo-category").value,
        };

        const fileinput = document.getElementById("file-input")

        //linking uploadphoto button with hidden file input button by adding event listener//
        uploadphotobutton.addEventListener("click", function (e) {
            fileinput.click();
        });

        if (!phototitle || !photocategory || !fileinput) {
            alert("Veuillez remplir tous les champs et sélectionner une photo.");
            return;
        }

        //converting upload info to format json//
        const uploadedform = JSON.stringify(uploadinfo);

        //calling on fetch function//
        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: uploadedform
            });

            if (response.ok) {
                const data = await response.json();
                location.href = "index.html";
            } else {
                const errorData = await response.json();
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error('Erreur:', error);
            errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
            errorMessage.style.display = "block";
        }
    });
}

addinguploadlistener();
