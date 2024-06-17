//recuperation des donnees des travaux via l'API//
let data=[]
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => displayGallery(data))
function displayGallery(data) {
    console.log(data)

    let gallery = document.querySelector(".gallery");
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

    let filters = document.getElementById("filters");

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

//adding event listener
    button.addEventListener("click", () => {
        filterGallery(category, data);
    });

    filters.appendChild(button);
}

function setactivecategory(category){

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







