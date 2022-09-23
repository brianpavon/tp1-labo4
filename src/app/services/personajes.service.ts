import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Personajes } from '../interfaces/personajes';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  urlApi:string = 'https://hp-api.herokuapp.com/api/characters'

  constructor(private http:HttpClient) { 

  }

  todos():Observable<Personajes[]>{
    return this.http.get<Personajes[]>(this.urlApi);
  }

}
