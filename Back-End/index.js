import { ReadlineParser, SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

// Create a port
const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
})
 
port.on("open",()=>{
    console.log("Hola")
    enviarAArduino("1\n")
})
//Conexion con Hardware
function enviarAArduino(mandar){

    port.write(mandar.toString())
} // Enviar info al arduino

subscribeGETEvent("medir",(data) => {
  if(data === true){
    medir()
  }
})

const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
lectura.on('data', (data) => console.log(data));



//subscribePOSTEvent("grafico", medir)
startServer()



