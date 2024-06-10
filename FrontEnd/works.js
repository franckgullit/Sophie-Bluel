//recuperation des donnees des travaux via l'API

fetch("http://localhost:5678/api/works",)
    .then(response => response.json())
    .then(data => {
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
    })

//recuperation des differentes Categories via API
fetch("http://localhost:5678/api/categories",)
    .then(response => response.json())
    .then(category => {
        console.log(category)

// adding object 'categories' to table
category.unshift({
    id: 0,
    name: "Tous",
});

    let categoriesElements = document.getElementById("works-categories");
    category.forEach(
        category =>{
    let div = document.createElement("div");
    div.classList.add("category-item");
    div.innerText = category.name;
    div.dataset.id = category.id;
    categoriesElements.appendChild(div);
   }) })
