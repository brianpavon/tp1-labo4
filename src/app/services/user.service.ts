import { Injectable,EventEmitter,Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() obtenerUsuarios: EventEmitter<any> = new EventEmitter();
  email : string | undefined;
  
  constructor() { }
}
