let nombre = document.getElementById("input-nombre")
let telefono = document.getElementById("input-tel")
let comentario = document.getElementById("comentario")
let enviar = document.getElementById("enviar")
let selectorMascotas = document.querySelectorAll("input[type = 'radio']")
let arrayMascotas = Array.from(selectorMascotas)
let resultadoContainer = document.getElementById("resultadoContainer")


function printResultado(){
    let checkeada = arrayMascotas.filter(mascota => mascota.checked)
    let mascotaCheckeada = checkeada.map(mascota => mascota.value)
    console.log(mascotaCheckeada)
    resultadoContainer.innerHTML = ''
    let resultado = document.createElement('div')
    resultado.className = "resultadoContacto"
    resultado.innerHTML = `<p>Nombre y Apellido: ${nombre.value}<p>
         <p>Teléfono: ${telefono.value}<p>
         <p>Mascota: ${mascotaCheckeada}<p>
         <p>Comentario: ${comentario.value}<p>`
    resultadoContainer.appendChild(resultado)
}


enviar.addEventListener("click",()=>{
    printResultado()
})


