let modal = null;
let modal2 = null;

// Function to open modal
const openModal = function (e) {
    e.preventDefault();
    modal = document.getElementById("modal");
    modal.style.display = null;  // To nullify style = display:none; in HTML//
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    // Closing modal window//
    modal.addEventListener("click", closeModal);
    const closeButton = document.getElementById("close-button");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
    //preventing closure of modal window upon click IN modal window//
    modal.querySelector(".modal-content").addEventListener("click", (e) => e.stopPropagation());
};

// Function to close modal
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    const closeButton = document.getElementById("close-button");
    if (closeButton) {
        closeButton.removeEventListener("click", closeModal);
    }
    modal = null;
};

// Function to open second modal
const openModal2 = function (e) {
    e.preventDefault();
    modal2 = document.getElementById("modal2");
    modal2.style.display = null; // To nullify style = display:none; in HTML in modal2//
    modal.style.display = "none";
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", "true");
    // Closing second modal window//
    modal2.addEventListener("click", closeModal2);
    const closeButton2 = document.getElementById("close-button2");
    if (closeButton2) {
        closeButton2.addEventListener("click", closeModal2);
    }
    //adding event listener to back button in modal2//
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", goBack);
    }
    //preventing closure of modal window upon click IN modal window//
    modal2.querySelector(".modal-content").addEventListener("click", (e) => e.stopPropagation());
};

// Function to close second modal
const closeModal2 = function (e) {
    if (modal2 === null) return;
    e.preventDefault();
    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true");
    modal2.removeAttribute("aria-modal");
    modal2.removeEventListener("click", closeModal2);
    const closeButton2 = document.getElementById("close-button2");
    if (closeButton2) {
        closeButton2.removeEventListener("click", closeModal2);
    }
    modal2 = null;
};

// Function to go back from second modal
const goBack = function (e) {
    if (modal2 === null) return;
    e.preventDefault();
    const backButton = document.getElementById("back-button");
    modal.style.display = null;
    if (backButton) {
        backButton.removeEventListener("click", closeModal2);
    }
    closeModal2(e);
};

// Function to display modal gallery
function displayModalGallery(data) {
    let modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = ""; // Emptying modal Gallery//
    data.forEach(item => {
        let modalFigureElement = document.createElement("figure");
        // Creating image element//
        const imgModalElement = document.createElement("img");
        imgModalElement.src = item.imageUrl;
        // Adding created image to figure element//
        modalFigureElement.appendChild(imgModalElement);
        // Creating trashicon
        const trashIconElement = document.createElement("i");
        trashIconElement.classList.add("fa-solid", "fa-trash-can");
        // Storing item ID in data attribute//
        trashIconElement.dataset.id = item.id;
        // Adding trashicon to figure//
        modalFigureElement.appendChild(trashIconElement);
        // Adding created figures to modalgallery//
        modalGallery.appendChild(modalFigureElement);
        // Adding event listener to the trash icon//
        trashIconElement.addEventListener("click", (e) => deleteItem(e));
    });
}

// Function to delete an item
async function deleteItem(e) {
    const itemId = e.target.dataset.id;
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.error("Token is not available.");
        return;
    }

    try {
        let response = await fetch(`http://localhost:5678/api/works/${itemId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            e.target.parentElement.remove(); // Removal of deleted item from the gallery//
        } else {
            console.error("Error deleting item:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

// Function to fetch and display works via API
async function begin() {
    try {
        let response = await fetch("http://localhost:5678/api/works");
        let data = await response.json();
        displayModalGallery(data);
    } catch (error) {
        console.error("Error fetching works:", error);
    }
}
begin();

// Function to add upload event listener
function addingUploadListener() {
    const uploadForm = document.getElementById("upload-form");
    if (!uploadForm) return;

    const uploadPhotoButton = document.getElementById("upload-photo-button");
    const fileInput = document.getElementById("file-input");
    const submitphotobutton = document.getElementById("submit-photo-button");

    //linking uploadphoto button with hidden file input button by adding event listener//
    uploadPhotoButton.addEventListener("click", (e) => fileInput.click());

    submitphotobutton.addEventListener("click", async function (event) {
        event.preventDefault();
        const photoTitle = document.getElementById("photo-title").value;
        const photoCategory = document.getElementById("photo-category").value;
        const file = fileInput.files[0];

        if (!photoTitle || !photoCategory || !file) { //ensuring all fields are filled//
            alert("Veuillez remplir tous les champs et sélectionner une photo.");
            return;
        }

        const formData = new FormData();
        formData.append("title", photoTitle);
        formData.append("category", photoCategory);
        formData.append("image", file);

        //calling on fetch function//
        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                body: formData
            });

            if (response.ok) {
                location.href = "index.html";
            } else {
                const errorData = await response.json();
                console.error("Error uploading photo:", errorData);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    });
}
addingUploadListener();

// Event listeners to open modals
// Opening modal window when 'modifier' is clicked//
document.getElementById("edit-button").addEventListener("click", openModal);
// Opening modal2 window when 'ajouter une photo' is clicked//
document.getElementById("add-photo-button").addEventListener("click", openModal2);

