const button = document.getElementById("inicio")

console.log(button)

button.addEventListener("click", function cambiarpagina(){
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
})

let chart; // guardamos el gráfico actual

function crearGrafico(tipo) {
  // limpiar canvas anterior
  document.getElementById("contenedor").innerHTML = "<canvas id='miGrafico'></canvas>";
  let ctx = document.getElementById("miGrafico").getContext("2d");

  // destruir gráfico previo si existe
  if (chart) {
    chart.destroy();
  }

  if (tipo === "grafico1") {
    // 👉 acá pegás el código de tu gráfico 1
  }

  if (tipo === "grafico2") {
    // 👉 acá pegás el código de tu gráfico 2
  }

  if (tipo === "grafico3") {
    // 👉 acá pegás el código de tu gráfico 3
  }
}

// escuchar cambios en el select
document.getElementById("selector").addEventListener("change", function () {
  let opcion = this.value;
  if (opcion) {
    crearGrafico(opcion);
  } else {
    document.getElementById("contenedor").innerHTML = "";
  }
});
