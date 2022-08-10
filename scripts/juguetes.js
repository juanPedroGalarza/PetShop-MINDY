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
getDataArticulos(url)


async function renderPage(){
    let articulos = await getDataArticulos(url)
    let articulosFiltrados = articulos.filter( articulo => articulo.tipo == "Juguete")
    printCards(articulosFiltrados)
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





