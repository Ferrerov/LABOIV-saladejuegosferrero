import { Timestamp } from "@angular/fire/firestore";

export interface ResultadoInterface {
    usuario:string;
    juego: string;
    puntaje: number;
    fecha_jugado: Timestamp;
    orden: string;    
}
