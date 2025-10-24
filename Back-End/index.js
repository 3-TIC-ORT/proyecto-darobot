import { ReadlineParser, SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

// Create a port
const port = new SerialPort({
  path: 'COM3',
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

subscribeGETEvent("medir", enviarAArduino(1))

const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
lectura.on('data', (data) => console.log(data));


startServer()



