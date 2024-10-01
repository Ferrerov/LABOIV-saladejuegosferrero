import { Timestamp } from "@angular/fire/firestore";

export interface MensajeInterface {
    uid:string;
    usuario:string;
    mensaje:string;
    fecha_envio: Timestamp;
}
