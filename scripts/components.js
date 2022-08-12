const menu = document.getElementById('burguer');
const nav = document.getElementById('nav');
const carritoImg = document.querySelector('#carrito');
const listaCarrito = document.getElementById('listaCarrito');
menu.addEventListener('click', () => {
  nav.classList.toggle( 'hidden2')
})
carritoImg.addEventListener('click', () => {
  let carrito = JSON.parse(localStorage.getItem("carrito"))
  carrito ??= [[], []]
  let productos = carrito[0]
  let cantidades = carrito[1]
  let limpiarCarrito = document.createElement("span")
  limpiarCarrito.className = "clear-car d-flex justify-content-center col-sm-10 col-lg-8"
  listaCarrito.innerHTML = ""
  limpiarCarrito.innerHTML = "Limpiar carrito"
  limpiarCarrito.addEventListener("click", e => {
    localStorage.removeItem("carrito")
    listaCarrito.innerHTML = ""
    listaCarrito.appendChild(limpiarCarrito)
  })
  listaCarrito.appendChild(limpiarCarrito)
  productos.forEach((producto, index) => {
    let articulo = document.createElement("div")
    articulo.className = "carrito-element d-flex justify-content-between align-content-center col-sm-10 col-lg-8"
    articulo.innerHTML =
    `<img src="${producto.imagen}" alt="logo petshop" class="img-carrito">
    <p>${producto.nombre}</p>
    <p>$${producto.precio}</p>
    <button type="button" class="${producto._id} btn-close" aria-label="Close"></button>`
    articulo.addEventListener("click", e => {
      if (e.target.classList.contains("btn-close")) {
        productos = productos.filter(prod => prod._id != e.target.classList
          .values().next().value)
        cantidades = cantidades.filter((x, indx) => indx != index)
        carrito[0] = productos
        carrito[1] = cantidades
        localStorage.setItem("carrito",JSON.stringify(carrito))
        if (productos.length < 2) {
          localStorage.removeItem("carrito")
        }
        e.target.parentElement.remove()
      }
    })
    listaCarrito.appendChild(articulo)
  })
  listaCarrito.classList.toggle("hidden1")
})