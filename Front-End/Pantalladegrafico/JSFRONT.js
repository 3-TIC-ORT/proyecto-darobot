const button = document.getElementById("inicio")

console.log(button)

button.addEventListener("click", function cambiarpagina(){
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
})

const botones = document.querySelectorAll(".botonera button");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    if (boton.classList.contains("activo")) {
      boton.classList.remove("activo");
    } else {
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
    }
  });
});

const selector = document.getElementById("selectordeunidades")
{}

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

    const chartBaseConfig = (titulo) => ({
        animationEnabled: true,
        theme: "light2",
        title: { text: titulo, fontSize: 20 },
        axisX: { labelFontSize: 14, labelFontColor: "#333" },
        axisY: { labelFontSize: 14, labelFontColor: "#333" },
        toolTip: { shared: true },
        legend: { fontSize: 14, cursor: "pointer" },
        data: []
    });

    select.addEventListener("change", dibujarGrafico);

    function dibujarGrafico(){
        const opcion = select.value;
        if (opcion === "vacio") {
            container.innerHTML = "";
            return;
        }
        container.innerHTML = "";
        chart = new CanvasJS.Chart("chartContainer", chartBaseConfig("Datos de " + opcion));
        let series = [];

        if (opcion === "Temperatura") {
            series = [{ type: "line", color: "#007bff", dataPoints: temperaturas }];
            socket.off("sensorDataTemperatura");
            socket.on("sensorDataTemperatura", (obj) => {
                series[0].dataPoints.push(obj);
                if (series[0].dataPoints.length > 20) series[0].dataPoints.shift();
                chart.render();
            });
        }

        if (opcion === "Luz") {
            series = [{ type: "line", color: "#28a745", dataPoints: luz }];
            socket.off("sensorDataLuz");
            socket.on("sensorDataLuz", (obj) => {
                series[0].dataPoints.push(obj);
                chart.render();
            });
        }

        if (opcion === "Humedad") {
            series = [{ type: "line", color: "#17a2b8", dataPoints: humedad }];
            socket.off("sensorDataHumedad");
            socket.on("sensorDataHumedad", (obj) => {
                series[0].dataPoints.push(obj);
                if (series[0].dataPoints.length > 20) series[0].dataPoints.shift();
                chart.render();
            });
        }

        if (opcion === "Presion") {
            series = [{ type: "line", color: "#ffc107", dataPoints: presion }];
            socket.off("sensorDataPresion");
            socket.on("sensorDataPresion", (obj) => {
                series[0].dataPoints.push(obj);
                chart.render();
            });
        }

        if (opcion === "Sonido") {
            series = [{ type: "line", color: "#dc3545", dataPoints: sonido }];
            socket.off("sensorDataSonido");
            socket.on("sensorDataSonido", (obj) => {
                series[0].dataPoints.push(obj);
                chart.render();
            });
        }

        chart.options.data = series;
        chart.render();
    }
}

subscribeRealTimeEvent("nuevasTemperaturas", (nuevasTemperaturas) =>{
    temperaturas = nuevasTemperaturas
    dibujarGrafico()
})

subscribeRealTimeEvent("nuevasLuces", (nuevasLuces) =>{
    luces = nuevasLuces
    dibujarGrafico()
})

subscribeRealTimeEvent("nuevasHumedades", (nuevasHumedades) =>{
    humedades = nuevasHumedades
    dibujarGrafico()
})
subscribeRealTimeEvent("nuevosSonidos", (nuevosSonidos) =>{
    sonidos = nuevosSonidos
    dibujarGrafico()
})
subscribeRealTimeEvent("nuevasPresiones", (nuevasPresiones) =>{
    presiones = nuevasPresiones
    dibujarGrafico()
})
connect2server();