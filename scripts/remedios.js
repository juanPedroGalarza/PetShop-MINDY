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
    eventosBotones(articulosFiltrados)

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
                   
            <button  class="d-flex  mb-3 btn btn-secondary botonDetalles" id="${productos._id}">Detalles</button>
            <button  class="d-flex  mb-3 btn btn-secondary">Comprar</button>
        </div>`
        cardsContainer.appendChild(newCard)
        });
    }
renderPage()






function eventosBotones(productos) {
    let containerModal = document.getElementById("modal-fachero")
    let botones =Array.from(document.querySelectorAll(".botonDetalles"));
        botones.forEach(boton =>{
        boton.addEventListener("click", (e)=>{
           
           let datosProductos =productos.find( producto => producto._id === e.target.id)
    
            containerModal.appendChild(modal(datosProductos))
         })
    })
}

function modal(productos){
    
    let modal = document.createElement("div")
    modal.className= "modal-card"
        modal.innerHTML = `
        <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-tittle text-dark" id="modalTittle">Detalles del producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <img src=${productos.imagen}  style="width: 100%; height: 300px">
                <h4 class="mt-4">${productos.nombre}</h4>
                <dl>

                  <dd class="text-dark">${productos.descripcion}</dd>
                  <dd class="text-dark">Costo: $${productos.precio}</dd>
                </dl>
                <ul></ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button href="#" class="btn btn-danger">Añadir al carrito</button>
              </div>
            </div>
          </div>
        </div>`
    return modal
}


 
  
 
