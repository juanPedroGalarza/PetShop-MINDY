const menu = document.getElementById('burguer');
const nav = document.getElementById('nav');
const carrito = document.getElementById('carrito');
const listaCarrito = document.getElementById('listaCarrito');
menu.addEventListener('click', () => {
  nav.classList.toggle('hidden2')
})

carrito.addEventListener('click', () =>{
  listaCarrito.classList.toggle("hidden1")
})