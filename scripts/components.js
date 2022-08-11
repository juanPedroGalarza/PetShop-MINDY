const menu = document.getElementById('burguer');
const nav = document.getElementById('nav');
const carrito = document.getElementById('carrito');
const listaCarrito = document.getElementById('listaCarrito');

let contador = 0
menu.addEventListener('click', () =>{
  contador ++
  contador % 2 != 0 ? nav.classList.remove('hidden2') : nav.classList.add('hidden2')
})


let contador2 = 0
carrito.addEventListener('click', () =>{
  contador2 ++
  contador2 % 2 != 0 ? listaCarrito.classList.remove('hidden1') : listaCarrito.classList.add('hidden1')
})