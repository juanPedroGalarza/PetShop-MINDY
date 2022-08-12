const menu = document.getElementById('burguer');
const nav = document.getElementById('nav');
menu.addEventListener('click', () => {
    nav.classList.toggle( 'hidden2')
})
  

function printCarrito() {
    const carrito = document.getElementById("carrito")
    let carritoData = JSON.parse(localStorage.getItem("carrito"))
    carritoData ??= [[], []]
    let productos = carritoData[0]
    let cantidades = carritoData[1]
    productos.forEach((producto, index) => {
        let articulo = document.createElement("div")
        articulo.className = "carrito-elemento d-flex justify-content-between align-content-center col-sm-10 col-lg-8"
        articulo.innerHTML =
        `<img src="${producto.imagen}" alt="imagen-producto" class="imgn-carrito">
        <p class="nombre-carrito">${producto.nombre}</p>
        <p class="descripcion-carrito">${producto.descripcion}</p>
        <p class="precio-carrito">$${producto.precio}</p>
        <div class = "botones-carrito">
        <button type="button" class="${producto._id} btn-close cerrar-carrito" aria-label="Close"></button>
        <button type="button" class="${producto._id} btn comprar-carrito" aria-label="Comprar">Comprar</button>
        <div>`
        articulo.addEventListener("click", e => {
          if (e.target.classList.contains("btn-close")) {
            productos = productos.filter(prod => prod._id != e.target.classList
              .values().next().value)
            cantidades = cantidades.filter((x, indx) => indx != index)
            carritoData[0] = productos
            carritoData[1] = cantidades
            localStorage.setItem("carrito",JSON.stringify(carritoData))
            if (productos.length < 2) {
              localStorage.removeItem("carrito")
            }
            e.target.parentElement.remove()
          }
        })
        carrito.appendChild(articulo)
    })
    if (carrito.innerHTML == "") {
        carrito.innerHTML = "<h3>No hay nada en el carrito</h3>"
    }
}

printCarrito()