import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Personajes } from 'src/app/interfaces/personajes';
import { PersonajesService } from 'src/app/services/personajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  
  //unPersonaje:Personajes;
  todosLosPersonajes:Personajes[] = [];
  personajeParaAdivinar !:Personajes;  
  personajesDelJuego:Personajes[] = [];
  imagen:string = '/assets/images/preload.gif';

  constructor(private servPersonajes:PersonajesService,private http:HttpClient) { 

  }

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(){
    this.servPersonajes.todos().subscribe(
      personajes=>{
        //console.log(personajes);
        //Solo agrego los primeros 25, el resto no tiene foto
        for (let i = 0; i < 25; i++) {
          this.todosLosPersonajes.push(personajes[i]);          
        }
        this.personajeParaAdivinar = this.todosLosPersonajes[this.generarIndiceRandom()];
        this.imagen = this.personajeParaAdivinar.image;
        this.agregarFalsos();
        this.personajesDelJuego.push(this.personajeParaAdivinar);
        this.mezclarOpciones();
      });
  }

  generarIndiceRandom(){
    return Math.floor(Math.random() * this.todosLosPersonajes.length);
  }

  agregarFalsos(){    
    
    for (let i = 0; i < 3; i++) {
      let personaje = this.todosLosPersonajes[this.generarIndiceRandom()]
      //No quiero que haya 2 personajes iguales
      while (personaje.name == this.personajeParaAdivinar.name) {
        personaje = this.todosLosPersonajes[this.generarIndiceRandom()]
      }
      this.personajesDelJuego.push(personaje);
    }
  }

  mezclarOpciones(){
    
    for (var i = this.personajesDelJuego.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = this.personajesDelJuego[i];
          this.personajesDelJuego[i] = this.personajesDelJuego[j];
          this.personajesDelJuego[j] = temp;
    }  
  }

  verificarPersonaje(nombre:string){
    nombre == this.personajeParaAdivinar.name ? this.adivinaste() : this.perdiste();
  }

  adivinaste(){ 
    this.arrojarMensaje('¡¡Adivinaste!!');
    //alert('Adivinaste');
    this.restearValores();
    this.iniciarJuego();
  }
  
  perdiste(){    
    Swal.fire(`Perdiste!! Era ${this.personajeParaAdivinar.name}`);
    this.restearValores();
    this.iniciarJuego();
  }

  restearValores(){    
    this.personajesDelJuego = [];
    this.imagen = '/assets/images/preload.gif';
  }

  arrojarMensaje(title:string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
