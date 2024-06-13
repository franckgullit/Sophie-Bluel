//recuperation des donnees des travaux via l'API

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => displayGallery(data)) 
    function displayGallery(data){
        console.log(data)

        let gallery = document.querySelector(".gallery");
        data.forEach(
            item => {
                let figureElement = document.createElement("figure");

                //creating image element
                const imgElement = document.createElement("img");
                imgElement.src = item.imageUrl;

                //adding created image to figure element
                figureElement.appendChild(imgElement);

                //creating caption
                const figcaptionElement = document.createElement("h3");
                figcaptionElement.innerText = item.title;

                //adding caption to figure
                figureElement.appendChild(figcaptionElement)

                // adding created figures to gallery
                gallery.appendChild(figureElement)
            })
    }

//recuperation des differentes Categories via API
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => displaycategories(categories))
    function displaycategories(categories){
        console.log(categories)

        //filter buttons
        filters = document.createElement("div");
        filters.classList.add("button");
        anybutton = document.createElement("button");
        button.classlist.add("filter-button");
        anyButton.textContent = "Tous";
        filters.appendChild(anybutton);

        let categoriesElement = document.querySelector(".category");
        categories.forEach(
            category => {
                button = document.createElement("button");
                button.textContent = category;
                div.innerText = category.name;
                div.dataset.id = category.id;

        //adding categories to div containing buttons
                categoriesElement.appendChild(div);
                button.addEventListener("click", () => {
                    filter-button(category);
                })
            })
    }




