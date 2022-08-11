async function getDataArticulos(url) {
    try {
        let res = await fetch(url)
        const articulos = await res.json()
        return articulos.response
    } catch (error) {
        console.log(error)
    }
}
async function renderPage() {
    let articulos = await getDataArticulos("https://apipetshop.herokuapp.com/api/articulos")
    let articulosFiltrados = articulos.filter(articulo=> articulo.tipo == "Medicamento")
    pintarOfertaRandom(articulosFiltrados)
    printCards(articulosFiltrados)
}
function pintarOfertaRandom(articulos) {
    let articulosOferta = articulos.filter(articulo => articulo.stock < 3)
    let random = Math.floor(Math.random() * articulosOferta.length)
    let articulo = articulosOferta[random]
    let divOferta = document.querySelector(".oferta-del-dia")
    let cardOferta = document.createElement("div")
    cardOferta.className = "card-oferta d-flex flex-row flex-wrap align-items-center card"
    cardOferta.innerHTML = 
    `<img class="col-12 col-md-6 img-details" src="${articulo.imagen}" alt="EventImage">
    <div class="border-0 p-0 col-12 col-md-6">
        <div class="card-header">
            <div class="card-title">
                <p class="titulo-oferta">${articulo.nombre}</p>
            </div>
        </div>
        <div class="card-body">
            <p class="card-text precio-oferta text-dark">$${articulo.precio}</p>
        </div>
        <div class="card-footer">
            <p class="card-text descripcion-oferta text-dark">Recomendado para tu mascota</p>
        </div>
    </div>`
    divOferta.appendChild(cardOferta)
}

function printCards(arrayData) {
    const cardsContainer = document.getElementById("cardsContainer")
    cardsContainer.innerHTML= ""
    arrayData.forEach(productos => {
    let newCard = document.createElement("div")
    newCard.className = "border border-1 p-3 shadow justify-content-center card-articulo"
    newCard.innerHTML=`
        <div class="card shadow">
            
            <img src="${productos.imagen}" >
            <div>
            <div class="card-body " >
                    <p class="card-title text-center text-dark">${productos.nombre}</p>
                    
            </div>
            <div class="card-body d-flex justify-content-around align-items-center align-self-center">
                    <p  class="card-link text-dark">Precio: $${productos.precio}</p>  
                    <button  class="d-flex  mb-3 btn btn-secondary">Comprar</button>
            </div>
        </div>`
        cardsContainer.appendChild(newCard)
        });
    }
renderPage()