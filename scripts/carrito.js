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
        articulo.className = "carrito-elemento"
        articulo.innerHTML =
        `<img src="${producto.imagen}" alt="imagen-producto" class="imgn-carrito">
        <p class="nombre-carrito">${producto.nombre}</p>
        <p class="precio-carrito">$${producto.precio}</p>
        <p class="precio-carrito">Cantidad: ${cantidades[index]}</p>
        <div class = "botones-carrito">
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
  totalElement.className = "d-flex justify-content-end align-content-center col-sm-10 col-lg-8 w-100 gap-4"
  totalElement.innerHTML = 
    `<p class="text-center total-carrito">Total: ${total}$</p>
    <button class="comprarTotal btn">Comprar</button>`
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