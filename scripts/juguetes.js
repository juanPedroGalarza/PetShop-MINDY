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
    pintarOfertaRandom(articulosFiltrados)
    eventos(articulosFiltrados)
    eventosBotones(articulosFiltrados)
}
function pintarOfertaRandom(articulos) {
    let articulosOferta = articulos.filter(articulo => articulo.stock < 3)
    let random = Math.floor(Math.random() * articulosOferta.length)
    let articulo = articulosOferta[random]
    let divOferta = document.querySelector(".oferta-del-dia")
    let cardOferta = document.createElement("div")
    cardOferta.className = "card-oferta d-flex w-100 flex-row flex-wrap align-items-center card"
    cardOferta.innerHTML = 
    `<img class="col-12 col-lg-6 img-details" src="${articulo.imagen}" alt="EventImage">
    <div class="border-0 p-0 col-12 col-lg-6">
        <div class="card-header">
            <div class="card-title">
                <p class="titulo-oferta">${articulo.nombre}</p>
            </div>
        </div>
        <div class="card-body">
            <p class="precio-oferta text-dark card-text">$${articulo.precio}</p>
        </div>
        <div class="card-footer">
            <p class="card-text descripcion-oferta text-dark">Recomendado para tu mascota</p>
            <button  class="d-flex mt-3 ms-1 mb-3 btn btn-secondary botonDetalles" id="${articulo._id}">Comprar</button>
        </div>
    </div>`
    divOferta.appendChild(cardOferta)
}

function printCards(arrayData) {
    cardsContainer.innerHTML= ""
    arrayData.forEach(producto => {
    let newCard = document.createElement("div")
    newCard.className = "justify-content-center card-articulo"
    newCard.innerHTML=`
    <div class="card w-100 h-100">
            
    <img src="${producto.imagen}" >
    <div>
    <div class="card-body h-50" >
            <p class="card-title text-center text-dark fs-5">${producto.nombre}</p>
    </div>
    <div class="d-flex align-items-center justify-content-around">
        <p  class="card-link text-dark fs-6">$${producto.precio}</p>
    <button  class="d-flex btn btn-secondary botonDetalles fs-6" id="${producto._id}">Comprar</button>
</div>`
        cardsContainer.appendChild(newCard)
        });
        if( cardsContainer.innerHTML == '' ){
            cardsContainer.appendChild(printMessageNotFound())
        }
    }

const filtroTexto = document.getElementById('buscador');
const filtroRange = document.getElementById('rango-precio-max');


function printMessageNotFound(){
    let caja = document.createElement('div');
    caja.innerHTML = '<h4>Producto no encontrado, actualice los filtros.</h4>';
    return caja
}


function filterByText(arrData, query){
    let arrFilteredOut = arrData.filter( title => title.nombre.toLowerCase().includes(query.value.toLowerCase()));
    return arrFilteredOut;
}

function filterByRange(arrData, query){
    let listaPrecios = [];
    arrData.forEach( e => listaPrecios.push(e.precio) );
    let precioMax = Math.max(...listaPrecios);
    let precioMin = Math.min(...listaPrecios);
    filtroRange.max = precioMax;
    filtroRange.min = precioMin;
    let filtro = arrData.filter( d => d.precio >= query.value ? d : false );
    return filtro;
}

function eventos(arrData){
    filtroRange.addEventListener('input', e => { 
        let filtradoRango = filterByRange(arrData, filtroRange);
        let filtradoTexto = filterByText(filtradoRango, filtroTexto);
        printCards(filtradoTexto);
        // if (filtradoTexto.length === 0) {
        //     printCards(printMessageNotFound())
        // }
        
    });

    filtroTexto.addEventListener('input', ( e ) => {
        let filtradoRango = filterByRange(arrData, filtroRange);
        let filtradoTexto = filterByText(filtradoRango, filtroTexto);
        printCards(filtradoTexto);
        // if (filtradoTexto.length === 0) {
        //     printCards(printMessageNotFound())
        // }
    });
}

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

function modal(producto){
    
    let modal = document.createElement("div")
    modal.id = "modal"
    let cantidadContainer = document.createElement("select")
    for (let i = 0; i < producto.stock; i++) {
        let opcion = document.createElement("option")
        if (i == 0) {
            opcion.selected = "true"
        }
        opcion.value = `${i + 1}`
        opcion.innerHTML = `${i + 1}`
        opcion.name = "cantidad"
        cantidadContainer.appendChild(opcion)
    }
    modal.className= "modal-card d-flex m-auto align-items-center modalPosition"
   
        modal.innerHTML = `
        <div class="modal-content container-sm  m-auto"  >
        
              <div class="modal-header d-flex text-center" >
                <h5 class="modal-tittle text-dark  fs-2 container-fluid" id="modalTittle">Detalles del producto</h5>
                <button type="button" class="btn-close m-3 close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body d-flex flex-column">
                <img src=${producto.imagen} class="container-sm  m-auto d-flex justify-content-center imgModal">
                <div class="d-flex flex-column align-items-center">
                <h4 class="mt-4 m-3 fs-3">${producto.nombre}</h4>
                <dl>
                  <dd class="text-dark m-3 fs-4">${producto.descripcion}</dd>
                  <dd class="text-dark fs-2 d-flex justify-content-center">Costo: $${producto.precio}</dd>
                </dl>
                
                </div>
              </div>
              <div class="modal-footer d-flex justify-content-center">
              <select name="select" id="cantidadStock" required="true">
              ${cantidadContainer.innerHTML}
              </select>
                <button type="button" class="btn btn-secundary close-modal m-3">Cerrar</button>
                <button type="button" class="${producto._id} btn btn-comprar close-modal m-3">Añadir al carrito</button>
              </div>
              </div>
            </div>
          
        </div>`
    // let i = productos
    modal.addEventListener("click", e => {
        if (e.target.classList.contains("close-modal")) {
            if (e.target.classList.contains("btn-comprar")) {
                let carrito = JSON.parse(localStorage.getItem("carrito"))
                carrito ??= [[],[]]
                let articulos = carrito[0]
                let cantidades = carrito[1]
                let id = e.target.classList.values().next().value
                console.log(id)
                if (articulos.some(articulo => articulo._id == id)) {
                    console.log("bien")
                    let articulo = articulos.find(art => art._id == id)
                    let indexProducto = articulos.indexOf(articulo)
                    articulos = articulos.filter(art => art != articulo)
                    cantidades = cantidades.filter((n, indx) => {
                        return indx != indexProducto
                    })
                    console.log(articulo)
                }
                let cantidad = document.getElementById("cantidadStock").value
                articulos.push(producto)
                cantidades.push(cantidad)
                carrito[0] = articulos
                carrito[1] = cantidades
                localStorage.setItem("carrito",JSON.stringify(carrito))
            }
            document.getElementById("modal-fachero").removeChild(document.getElementById("modal"))
        }
    })
    return modal
}

renderPage()


