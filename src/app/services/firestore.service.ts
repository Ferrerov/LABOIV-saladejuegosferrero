import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, doc, collectionData, Timestamp } from '@angular/fire/firestore';
import { LogIngresoInterface } from '../interfaces/logIngreso.interface';
import { from, Observable } from 'rxjs';
import { MensajeInterface } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore);
  coleccionLogs = collection(this.firestore, 'log_ingreso');
  coleccionMensajes = collection(this.firestore, 'mensajes');
  //mensajesRef = doc(this.firestore, 'mensajes');
  mensajesSig = signal<MensajeInterface[]>([]);

  guardarLog(correo_usuario:string, fecha_ingreso:Date){
    const logCreado = {correo_usuario, fecha_ingreso};

    addDoc(this.coleccionLogs, logCreado);
  }

  guardarMensaje(uidUsuario:string, mensaje:string){
    const mensajeCreado = {uidUsuario, mensaje};

    addDoc(this.coleccionMensajes, mensajeCreado);
  }

  leerMensajes(){
    return getDocs(this.coleccionMensajes).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }

  getLogs():Observable<LogIngresoInterface[]>{
    return collectionData(this.coleccionLogs) as Observable<LogIngresoInterface[]>;
  }

  getMensajes():Observable<MensajeInterface[]>{
    return collectionData(this.coleccionMensajes) as Observable<MensajeInterface[]>;
  }

  addMensaje(uid:string, usuario:string, mensaje:string, fecha_envio:Date):Observable<string>{
    const mensajeCreado = {mensaje, usuario ,uid, fecha_envio};
    const promesa = addDoc(this.coleccionMensajes, mensajeCreado).then((response) => response.id);
    return from(promesa);
  }

}
