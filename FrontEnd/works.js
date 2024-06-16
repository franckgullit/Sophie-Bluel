//recuperation des donnees des travaux via l'API//

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

    const categories = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];

    categories.forEach(
        category => {

            //filter buttons//
            const button = document.createElement("filter-button");
            button.textContent = "category";
            button.addEventListener("click", () => {
                filterGallery(category, gallery);
                setActiveCategory(button);
            });

            filters.appendChild(button);
        });

    //Tous button//
    const Tousbutton = filters.querySelector("button");
    Tousbutton.classList.add("active");
}

//Gallery filtering//
function filterGallery(category, gallery) {
    if (category === "Tous") {
        displayGallery(gallery);
    } else {
        const filteredGallery = gallery.filters(gallery => gallery.category.name === category);
        displayGallery(filteredGallery);
    }

}







