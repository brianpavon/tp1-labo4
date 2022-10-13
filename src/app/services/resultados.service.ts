import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Resultados } from '../interfaces/resultados';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  itemsCollection !: AngularFirestoreCollection<Resultados>;
  todasLosResultados !: Observable<Resultados[]>;  

  constructor(private firestore:AngularFirestore,private ruteo : Router) { }

  guardarResultado(nuevaResultado:Resultados){
    this.firestore.collection('resultados').add(nuevaResultado);
    setTimeout(() => {
      this.ruteo.navigateByUrl('/juegos/menu-juegos')      
    }, 1000);
  }

  traerTodosLosResultados(){
    this.itemsCollection = this.firestore.collection<Resultados>('resultados');
    return this.todasLosResultados = this.itemsCollection.valueChanges();
  } 

}
