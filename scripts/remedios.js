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
    eventos(articulosFiltrados)
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
    cardsContainer.innerHTML= ""
    arrayData.forEach(producto => {
    let newCard = document.createElement("div")
    newCard.className = "border border-1 p-3 shadow justify-content-center card-articulo"
    newCard.innerHTML=`
        <div class="card shadow">
            
            <img src="${producto.imagen}" >
            <div>
            <div class="card-body " >
                    <p class="card-title text-center text-dark">${producto.nombre}</p>
                    
            </div>
            <div class="card-body d-flex justify-content-around align-items-center align-self-center">
                    <p  class="card-link text-dark">Precio: $${producto.precio}</p>  
                    <button  class="d-flex  mb-3 btn btn-secondary">Comprar</button>
            </div>
        </div>`
        cardsContainer.appendChild(newCard)
        });
        if( cardsContainer.innerHTML == '' ){
            cardsContainer.appendChild(printMessageNotFound())
        }
    }
    
    
renderPage()

const filtroTexto = document.getElementById('buscador');
const filtroRange = document.getElementById('rango-precio-max');

function printMessageNotFound(){
    let caja = document.createElement('div');
    caja.innerHTML = '<h4>Producto no encontrado, actualice los filtros.</h4>';
    return caja
}

console.log(printMessageNotFound())

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
renderPage()