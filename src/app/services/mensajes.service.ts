import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Mensajes } from '../interfaces/mensajes';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  itemsCollection !: AngularFirestoreCollection<Mensajes>;
  todosLosMensajes !: Observable<Mensajes[]>;  

  constructor(private firestore:AngularFirestore) { 

  }

  guardarMensaje(nuevoMensaje:Mensajes){
    this.firestore.collection('mensajes').add(nuevoMensaje);
  }

  traerTodosLosMensajes(){
    this.itemsCollection = this.firestore.collection<Mensajes>('mensajes');
    return this.todosLosMensajes = this.itemsCollection.valueChanges();
  }
}
