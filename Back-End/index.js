import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import { SerialPort } from "serialport";
import {ReadlineParser} from "@serialport/parser-readline"


let port = new SerialPort({
    path: "COM4", 
    baudRate: 9600, // Debe coincidir con el dispositivo
  });

 
port.on("open",()=>{
    console.log("HOla")
})

function enviarAArduino(mandar){
    port.write(mandar.toString())

} // Enviar info al arduino

enviarAArduino(1)
const lectura = port.pipe(new ReadlineParser()) //Leer info de arduino

startServer();