let data = undefined;

async function begin() {
    try {
        // Recupération des données des travaux via l'API
        let response = await fetch("http://localhost:5678/api/works");
        data = await response.json();
        displayGallery(data);
        console.log(data);
    } catch (error) {
        console.error("Error fetching works:", error);
    }
}

function displayGallery(data) {
    let gallery = document.querySelector(".gallery");

    // Emptying Gallery
    gallery.innerHTML = "";

    data.forEach(item => {
        let figureElement = document.createElement("figure");

        // Creating image element
        const imgElement = document.createElement("img");
        imgElement.src = item.imageUrl;

        // Adding created image to figure element
        figureElement.appendChild(imgElement);

        // Creating caption
        const figcaptionElement = document.createElement("h3");
        figcaptionElement.innerText = item.title;

        // Adding caption to figure
        figureElement.appendChild(figcaptionElement);

        // Adding created figures to gallery
        gallery.appendChild(figureElement);
    });
}

begin();

fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => displayCategories(categories))
    .catch(error => console.error("Error fetching categories:", error));

function displayCategories(categories) {
    console.log(categories);

    let filters = document.getElementById("filters");

    // "Tous" button
    createFilterButton("Tous");

    categories.forEach(category => createFilterButton(category.name));
}

function createFilterButton(category) {
    const button = document.createElement("button");
    const textButton = document.createElement("span");
    textButton.textContent = category;
    button.classList.add("filter-button");
    textButton.classList.add("filter-button-txt");
    button.appendChild(textButton);

    // Adding event listener
    button.addEventListener("click", () => {
        filterGallery(category, data);
        setActiveCategory(button);
    });

    let filters = document.getElementById("filters");
    filters.appendChild(button);
}

function filterGallery(category, data) {
    console.log("Filtering by category:", category);
    if (category === "Tous") {
        displayGallery(data);
    } else {
        const filteredGallery = data.filter(item => item.category.name === category);
        displayGallery(filteredGallery);
    }
}

function setActiveCategory(activeButton) {
    const filterButtons = document.querySelectorAll("#filters .filter-button");
    filterButtons.forEach(button => {
        button.classList.remove("active");
    });
    activeButton.classList.add("active");
}
