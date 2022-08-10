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
renderPage()