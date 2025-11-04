import { ReadlineParser, SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";
// Create a port
const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
});
 
port.on("open",()=>{
    console.log("Hola")
});

//Conexion con Hardware
function enviarAArduino(mandar){
    port.write(mandar.toString() + "\n")
}; // Enviar info al arduino
 function medicion(Tipo){
  if (Tipo === "humedad") {
    enviarAArduino("RH")
  }
  if (Tipo === "temperatura") {
    enviarAArduino("RT")
  }

  if (Tipo === "luz") {
    enviarAArduino("RL")
  }
  if (Tipo === "sonido") {
    enviarAArduino("RM")
  }
  else {
    console.log("error")
  };
 };

 function movimiento(direccion){
  if (direccion === "delante") {
    enviarAArduino("W")
  }
  if (direccion === "atras") {
    enviarAArduino("S")
  }

  if (direccion === "derecha") {
    enviarAArduino("D")
  }
  if (direccion === "izquierda") {
    enviarAArduino("A")
  }
  else {
    console.log("error")
  };
 };
//subscribePOSTEvent("medir", medicion);
//subscribePOSTEvent("movimiento", movimiento);
const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
lectura.on('data', (data) => {
  // Aca va todo el HW
  let devOn = data.trim() === "on";
  let tipo = data.substring(0, 2);
  let valor = data.substring(2, );
  console.log(tipo, valor)
    let devolucion = JSON.stringify(data, null, 2);
    fs.writeFileSync("Back-End/datosprueba.json", devolucion);
    return {ok:true};
});


startServer()