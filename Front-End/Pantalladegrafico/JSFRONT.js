const button = document.getElementById("inicio")

console.log(button)

button.addEventListener("click", function cambiarpagina(){
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
})

const selector = document.getElementById("selectordeunidades")
if (selector.value === "Temperatura"){

}

window.onload = function () {
  const select = document.getElementById("selectordeunidades");
  const container = document.getElementById("chartContainer");
  let chart;

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
          title: { text: "Datos del " + opcion },
          data: []
      });

      if (opcion === "Temperatura") {
          chart.options.data = [{
              type: "line",
              dataPoints: [
                  { label: "Lunes", y: 22 },
                  { label: "Martes", y: 25 },
                  { label: "Miércoles", y: 28 },
                  { label: "Jueves", y: 26 },
                  { label: "Viernes", y: 24 }
              ]
          }];
      }

      if (opcion === "Luz") {
          chart.options.data = [{
              type: "column",
              dataPoints: [
                  { label: "Mañana", y: 300 },
                  { label: "Tarde", y: 600 },
                  { label: "Noche", y: 150 }
              ]
          }];
      }

      if (opcion === "Humedad") {
          chart.options.data = [{
              type: "line",
              dataPoints: [
                  { label: "Enero", y: 70 },
                  { label: "Febrero", y: 65 },
                  { label: "Marzo", y: 80 },
                  { label: "Abril", y: 75 }
              ]
          }];
      }

      if (opcion === "Presion") {
          chart.options.data = [{
              type: "area",
              dataPoints: [
                  { label: "Altura 0m", y: 1013 },
                  { label: "500m", y: 954 },
                  { label: "1000m", y: 898 },
                  { label: "1500m", y: 845 }
              ]
          }];
      }

      if (opcion === "Sonido") {
          chart.options.data = [{
              type: "pie",
              showInLegend: true,
              legendText: "{label}",
              dataPoints: [
                  { label: "Ambiente", y: 40 },
                  { label: "Tráfico", y: 35 },
                  { label: "Máquinas", y: 25 }
              ]
          }];
      }

      chart.render();
  });
}
