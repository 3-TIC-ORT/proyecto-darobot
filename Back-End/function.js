import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import { SerialPort } from "serialport";

let port = new SerialPort({
    path: "COM3", 
    baudRate: 9600, // Debe coincidir con el dispositivo
  });

  function puerto(){
    port.on = console.log("datos recibidos")
  }
  