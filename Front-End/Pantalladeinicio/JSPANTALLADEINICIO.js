const button1 = document.getElementById("Medicion")
const button2 = document.getElementById("Panel")

console.log(button1)

button1.addEventListener("click", function cambiarpagina(){
  window.location.href = "../Pantalladegrafico/HTMLFRONT.html";
})
button2.addEventListener("click", function cambiarpagina(){
  window.location.href = "../Paneldecontrol/panel.html";
})

const colorboton = document.getElementById("contenedor-botones")

boton.addEventListener("click", function(){
  boton.style.backgroundColor = "lightblue";
})