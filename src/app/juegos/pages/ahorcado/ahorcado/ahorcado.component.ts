import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  letras:string[]=[];
  letrasUsadas : string[]=[];
  palabras:string[] = ['PARRILLA','OTORRINOLARINGOLOGO','PASTILLA','RINOCERONTE','TRAUMATOLOGIA','FACIL','PEZ'];
  intentos:number = 0;  
  palabraRandom:string = '';
  palabraElegida:string[]=[];
  palabraCodificada:string='';
  cantLetras:number = 0;
  constructor() { 
    //this.letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  }

  ngOnInit(): void {
    this.cargarJuego();
  }

  cargarLetras(){
    this.letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.letrasUsadas = [];
  }

  cargarJuego(){
    this.cargarLetras();
    this.intentos = 6;
    const quePalabra = Math.floor(Math.random() * (this.palabras.length -1));
    //console.log(quePalabra);
    
    this.palabraRandom = this.palabras[quePalabra];
    this.cantLetras = this.palabraRandom.length;
    //console.log(`longitud: ${this.palabraRandom.length}`);
    for (let i = 0; i < this.palabraRandom.length; i++) {
      //console.log(`letra: ${this.palabraRandom[i]}`);
      this.palabraElegida.push('_')
    }
    this.palabraCodificada = this.palabraElegida.join(' ');
  }

  verifyLetter(letra:string){
    
    //Agrego las letras que se van usando    
    this.letrasUsadas.push(letra);
    //y saco las que ya se usaron
    this.letras = this.letras.filter(item => item !== letra);
    if(this.palabraRandom.includes(letra)){
      for (let i = 0; i < this.palabraRandom.length; i++) {
        //console.log(`letra ${this.palabraRandom[i]}`);
        //console.log(this.palabraCodificada[i]);
        if(this.palabraRandom[i] == letra){
          this.palabraElegida[i] = letra;
          this.cantLetras--;
        }
      } 
      this.palabraCodificada = this.palabraElegida.join(' ');     
    }else{
      this.intentos--;
    }
    if(this.cantLetras == 0)  this.winner();
    if(this.intentos == 0)  this.loser();
  }

  loser(){
    Swal.fire({
      title: 'Perdiste, la próxima quizás ganas. La palabra era: '+this.palabraRandom,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    });
    this.palabraRandom = '';
    this.palabraElegida=[];
    this.palabraCodificada='';    
    this.cantLetras = 0;
    this.cargarJuego();
  }
  winner(){
    Swal.fire({
      title: 'Ganaste!! Crack del ahorcado!!',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'      
    });
    this.palabraRandom = '';
    this.palabraElegida=[];
    this.palabraCodificada='';    
    this.cantLetras = 0;
    this.cargarJuego();
  }


}
