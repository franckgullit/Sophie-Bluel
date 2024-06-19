
//recuperation des donnees des travaux via l'API//
const response = await fetch("http://localhost:5678/api/works");
const data = await response.json();
displayGallery(data);
console.log(data)

function displayGallery(data) {

    let gallery = document.querySelector(".gallery");

    // Emptying Gallery//
    gallery.innerHTML = "";

    data.forEach(

        item => {
            let figureElement = document.createElement("figure");

            //creating image element//
            const imgElement = document.createElement("img");
            imgElement.src = item.imageUrl;

            //adding created image to figure element//
            figureElement.appendChild(imgElement);

            //creating caption//
            const figcaptionElement = document.createElement("h3");
            figcaptionElement.innerText = item.title;

            //adding caption to figure//
            figureElement.appendChild(figcaptionElement)

            // adding created figures to gallery//
            gallery.appendChild(figureElement)
        })
}

//recuperation des differentes Categories via API//
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => displaycategories(categories))
function displaycategories(categories) {
    console.log(categories)

    let filter = document.getElementById("filters");

    //Tous button//
    createfilterbutton("Tous")

    categories.forEach(
        category =>
            createfilterbutton(category.name)
    );
}

//filter buttons//
function createfilterbutton(category) {
    const button = document.createElement("button");
    const textbutton = document.createElement("span");
    textbutton.textContent = category;
    button.classList.add("filter-button")
    textbutton.classList.add("filter-button-txt")
    button.appendChild(textbutton)

    //adding event listener//
    button.addEventListener("click", () => {
        filterGallery(category, data);
    });

    filters.appendChild(button);
}

//Gallery filtering//
function filterGallery(category, data) {
    if (category === "Tous") {
        displayGallery(data);
    } else {
        const filteredGallery = data.filter(item => item.category.name === category);
        displayGallery(filteredGallery);
    }
}

//setting active category//
function setactivecategory(activebutton) {
    const filters = document.querySelectorAll("filters filter-button");
    filters.forEach(button => {
        button.classList.remove("active");
    });
    activebutton.classlist.add("active");

}

