const cardsContainer = document.getElementById("cardsContainer")
let url = "https://apipetshop.herokuapp.com/api/articulos"

async function getDataArticulos(url) {
    try {
        let res = await fetch(url)
        let articulos = await res.json()
        return articulos.response
    } catch (error) {
        console.log(error)
    }
}

async function renderPage(){
    let articulos = await getDataArticulos(url)
    let articulosFiltrados = articulos.filter( articulo => articulo.tipo == "Juguete")
    printCards(articulosFiltrados)
}
function pintarOfertaRandom(articulos) {
    let random = Math.floor(Math.random() * articulos.length)
    let articulo = articulos[random]
    let divOferta = document.querySelector(".oferta-del-dia")
    console.log(divOferta)
    let cardOferta = document.createElement("div")
    cardOferta.className = "card-oferta d-flex flex-row flex-wrap align-items-center card"
    cardOferta.innerHTML = 
    `<img class="col-12 col-lg-6 img-details" src="${articulo.imagen}" alt="EventImage">
    <div class="border-0 p-0 col-12 col-lg-6">
        <div class="card-header">
            <div class="card-title">
                <p>${articulo.nombre}</p>
            </div>
        </div>
        <div class="card-body">
            <p class="card-text">$${articulo.precio}</p>
        </div>
        <div class="card-footer">
            <p class="card-text">Recomendado para tu mascota</p>
        </div>
    </div>`
    divOferta.appendChild(cardOferta)
}

function printCards(arrayData) {
    cardsContainer.innerHTML= ""
    arrayData.forEach(producto => {
    let newCard = document.createElement("div")
    newCard.className = "cards border border-1  p-3 m-4  shadow justify-content-center"
    newCard.style.width = "20rem"
    newCard.style.height = "30rem"
    newCard.innerHTML=`
        <div class="card shadow" style="width: 100%; height: 28rem;">
            
            <img src="${producto.imagen}" style="height: 250px; width: 100%" >
               
            <div class="card-body " >
                    <h5 class="card-title text-center text-dark">${producto.nombre}</h5>
                    
            </div>
            <div class="card-body d-flex justify-content-around align-items-center align-self-center">
                    <p  class="card-link text-dark">Precio: $${producto.precio}</p>  
                    <button  class="card-link text-dark">Comprar</button>    
            </div>    

            
        </div>`
        cardsContainer.appendChild(newCard)
        });
    }
    
    renderPage()





