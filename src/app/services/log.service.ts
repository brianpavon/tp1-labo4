import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private firestore:AngularFirestore ) {

  }

  guardarLog(email : string){
    let date = new Date();
    let dateString = date.toString();
    let arrayLog = {
      email: email,
      fecha_ingreso: dateString
    }
    this.firestore.collection('log').add(arrayLog);
  }
}
