import { ReadlineParser, SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

// Create a port
const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
})
 
port.on("open",()=>{
    console.log("Hola")
    //Borrar el setInterval-Lo unico importante es la funcion
})

//Conexion con Hardware
function enviarAArduino(mandar){
    port.write(mandar.toString() + "\n")
} // Enviar info al arduino
 function medicion(Tipo){
  if (Tipo === "humedad") {
    enviarAArduino("MH")
  };
  if (Tipo === "temperatura") {
    enviarAArduino("MT")
  };
  if (Tipo === "presion") {
    enviarAArduino("MP")
  };
  if (Tipo === "luz") {
    enviarAArduino("ML")
  };
  if (Tipo === "sonido") {
    enviarAArduino("MS")
  };
 
 };
subscribePOSTEvent("medir", medicion)

const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
lectura.on('data', (data) => console.log(data));


startServer()



