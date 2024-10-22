import { Timestamp } from "@angular/fire/firestore";

export interface EncuestaInterface {
    uid:string;
    nombre:string;
    apellido:string;
    edad:number;
    telefono:string;
    calidadJuegos:string;
    juegosSeleccionados:string[];
    sugerencia:string;
    fecha_carga:Timestamp
}