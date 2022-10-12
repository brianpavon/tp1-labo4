import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Encuesta } from '../interfaces/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  itemsCollection !: AngularFirestoreCollection<Encuesta>;
  todasLasEncuestas !: Observable<Encuesta[]>;  

  constructor(private firestore:AngularFirestore) { }

  guardarEncuesta(nuevaEncuesta:Encuesta){
    this.firestore.collection('encuestas').add(nuevaEncuesta);
  }

  traerTodosLasEncuestas(){
    this.itemsCollection = this.firestore.collection<Encuesta>('encuestas');
    return this.todasLasEncuestas = this.itemsCollection.valueChanges();
  }
}
