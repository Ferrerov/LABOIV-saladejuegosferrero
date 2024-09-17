import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore);
  coleccion = collection(this.firestore, 'log_ingreso');

  guardarLog(correo_usuario:string, fecha_ingreso:Date){
    const logCreado = {correo_usuario, fecha_ingreso};

    addDoc(this.coleccion, logCreado);
  }
}
