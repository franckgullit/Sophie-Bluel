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

let modalData = undefined;
// managing modal content//
async function begin() {
    try {
        // Recupération des données des travaux via l'API
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
    const token = localStorage.getItem("authToken",data.token);

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
