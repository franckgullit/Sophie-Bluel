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

    let categoriesElement = document.querySelector(".filters");
    categories.forEach(
        category => {
            categories.add(category.name);
            categories.add(category.ID);

            //filter buttons//
            filters = document.createElement("div");
            filters.classlist.add("button");
            gallery.parentNode.insertBefore(filters, gallery);

            // Creating Tous filter button//
            const button = document.createElement("button");
            button.classlist.add("filter-button");
            button.textcontent = "Tous";
            filters.appendChild(button);

            // Adding event listener//
            button.addEventListener("click", () => {
                (gallery.innerHTML = ""), data();

                //adding to DOM//
                filters.appendChild(button);
            })
        })

    //gallery filtering//
    function galleryfiltering(category) {

        const gallery = document.querySelectorAll(".gallery");

        gallery.forEach((category) => {
            const Category = category.getAttribute("category");

        })
    }
}


