import { Timestamp } from "@angular/fire/firestore";

export interface LogIngresoInterface {
    correo_usuario:string;
    fecha_ingreso:Timestamp
}
