const button = document.getElementById("inicio")

console.log(button)

button.addEventListener("click", function cambiarpagina(){
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
})

const selector = document.getElementById("selectordeunidades")
if (selector.value === "Temperatura"){

}

let temperaturas = [
    { label: "Lunes", y: 22 },
    { label: "Martes", y: 25 },
    { label: "Miércoles", y: 28 },
    { label: "Jueves", y: 26 },
    { label: "Viernes", y: 24 }
]

let luz = [
    { label: "Mañana", y: 300 },
    { label: "Tarde", y: 600 },
    { label: "Noche", y: 150 }
]

let humedad = [
    { label: "Enero", y: 70 },
    { label: "Febrero", y: 65 },
    { label: "Marzo", y: 80 },
    { label: "Abril", y: 75 }
]

let presion = [
    { label: "Altura 0m", y: 1013 },
    { label: "500m", y: 954 },
    { label: "1000m", y: 898 },
    { label: "1500m", y: 845 }
]

let sonido = [
    { label: "Ambiente", y: 40 },
    { label: "Tráfico", y: 35 },
    { label: "Máquinas", y: 25 }
]

window.onload = function () {
  const select = document.getElementById("selectordeunidades");
  const container = document.getElementById("chartContainer");
  let chart;
  const socket = io("http://localhost:3000");

  select.addEventListener("change", function () {
      const opcion = select.value;
      if (opcion === "vacio") {
          container.innerHTML = "";
          return;
      }
      container.innerHTML = "";
      chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "light2",
          title: { text: "Datos de " + opcion },
          data: []
      });

      if (opcion === "Temperatura") {
          chart.options.data = [{ type: "line", dataPoints: temperaturas }];
          socket.on("sensorDataTemperatura", (obj) => {
              chart.options.data[0].dataPoints.push(obj);
              if (chart.options.data[0].dataPoints.length > 20) {
                  chart.options.data[0].dataPoints.shift();
              }
              chart.render();
          });
      }

      if (opcion === "Luz") {
          chart.options.data = [{ type: "column", dataPoints: luz }];
          socket.on("sensorDataLuz", (obj) => {
              chart.options.data[0].dataPoints.push(obj);
              chart.render();
          });
      }

      if (opcion === "Humedad") {
          chart.options.data = [{ type: "line", dataPoints: humedad }];
          socket.on("sensorDataHumedad", (obj) => {
              chart.options.data[0].dataPoints.push(obj);
              if (chart.options.data[0].dataPoints.length > 20) {
                  chart.options.data[0].dataPoints.shift();
              }
              chart.render();
          });
      }

      if (opcion === "Presion") {
          chart.options.data = [{ type: "area", dataPoints: presion }];
          socket.on("sensorDataPresion", (obj) => {
              chart.options.data[0].dataPoints.push(obj);
              chart.render();
          });
      }

      if (opcion === "Sonido") {
          chart.options.data = [{
              type: "pie",
              showInLegend: true,
              legendText: "{label}",
              dataPoints: sonido
          }];
          socket.on("sensorDataSonido", (obj) => {
              chart.options.data[0].dataPoints.push(obj);
              chart.render();
          });
      }

      chart.render();
  });
}
