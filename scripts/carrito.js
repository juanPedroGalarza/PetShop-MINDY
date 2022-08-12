const menu = document.getElementById('burguer');
const nav = document.getElementById('nav');
menu.addEventListener('click', () => {
    nav.classList.toggle( 'hidden2')
})
  

function printCarrito() {
  const carrito = document.getElementById("carrito")
  carrito.innerHTML=""
    let carritoData = JSON.parse(localStorage.getItem("carrito"))
    carritoData ??= [[], []]
    let productos = carritoData[0]
    let cantidades = carritoData[1]
    productos.forEach((producto, index) => {
        let articulo = document.createElement("div")
        articulo.className = "carrito-elemento overflow-hidden d-flex justify-content-around align-content-center col-sm-10 col-lg-8 flex-wrap "
        articulo.innerHTML =
        `<img src="${producto.imagen}" alt="imagen-producto" class="imgn-carrito w-50">
        <p class="nombre-carrito w-50">${producto.nombre}</p>
        <p class="descripcion-carrito">${producto.descripcion}</p>
        <p class="precio-carrito">$${producto.precio}</p>
        <p class="precio-carrito">Cantidades: ${cantidades[index]}</p>
        <div class = "botones-carrito d-flex flex-row justify-content-center h-25 my-3 w-75">
          <button type="button" class="${producto._id} btn-close cerrar-carrito" aria-label="Close"></button>
        <div>`
        articulo.addEventListener("click", e => {
          if (e.target.classList.contains("btn-close")) {
            productos = productos.filter(prod => prod._id != e.target.classList
              .values().next().value)
            cantidades = cantidades.filter((x, indx) => indx != index)
            carritoData[0] = productos
            carritoData[1] = cantidades
            localStorage.setItem("carrito",JSON.stringify(carritoData))
            printCarrito()
          }
        })
        carrito.appendChild(articulo)
    })
    if (carrito.innerHTML == "") {
        carrito.innerHTML = "<h3>No hay nada en el carrito</h3>"
    } else {
      let total = sacartTotalCarrito(productos, cantidades)
      carrito.appendChild(total)
    }
}
function sacartTotalCarrito(productos,cantidades) {
  let total = productos.reduce((precio, producto,indx) => {
    return precio + (producto.precio * cantidades[indx])
  }, 0)
  let totalElement = document.createElement("div")
  totalElement.className = "d-flex justify-content-between align-content-center col-sm-10 col-lg-8 w-100"
  totalElement.innerHTML = `<button class="comprarTotal p-4 btn btn-primary">Comprar</button>
                            <p class="h-100 d-flex align-items-center fs-4">precio: ${total}$</p>`
  totalElement.addEventListener("click", e => {
    if (e.target.classList.contains("comprarTotal")) {
      alert("gracias por comprar :)")
      localStorage.removeItem("carrito")
      printCarrito()
    }
  })
  return totalElement
}
printCarrito()