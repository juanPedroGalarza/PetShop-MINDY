let nombre = document.getElementById("input-nombre")
let telefono = document.getElementById("input-tel")
let comentario = document.getElementById("comentario")
let enviar = document.getElementById("enviar")
let selectorMascotas = document.querySelectorAll("input[type = 'radio']")
let arrayMascotas = Array.from(selectorMascotas)
let resultadoContainer = document.getElementById("resultadoContainer")
let form = document.querySelector(".form-contact")


function printResultado(){
    let checkeada = arrayMascotas.filter(mascota => mascota.checked)
    let mascotaCheckeada = checkeada.map(mascota => mascota.value)
    if (nombre.value === '' || telefono.value === '' || mascotaCheckeada.length === 0 || comentario.value === '') {
    resultadoContainer.innerHTML = ''
    let resultado = document.createElement('div')
    resultado.className = "resultadoContacto"
    resultado.innerHTML = 'Por favor complete todos los campos'  
    resultadoContainer.appendChild(resultado)  
    }else{
    resultadoContainer.innerHTML = ''
    let resultado = document.createElement('div')
    resultado.className = "resultadoContacto"
    resultado.innerHTML = `<p>Recibimos tu mensaje con los siguientes datos:<p>
    <p>Nombre y Apellido: ${nombre.value}<p>
         <p>Teléfono: ${telefono.value}<p>
         <p>Mascota: ${mascotaCheckeada}<p>
         <p>Comentario: ${comentario.value}<p>`
    resultadoContainer.appendChild(resultado)
}}


enviar.addEventListener("click",()=>{
    printResultado()
    event.preventDefault()
    form.reset()
    resultadoContainer.removeChild(resultado)
})


