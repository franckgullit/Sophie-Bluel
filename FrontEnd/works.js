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
            
                gallery.appendChild(figureElement)
            }
        )
        })





