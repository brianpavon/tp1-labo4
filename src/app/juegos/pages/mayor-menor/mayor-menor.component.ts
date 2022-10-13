import { Component, OnInit } from '@angular/core';
import { Resultados } from 'src/app/interfaces/resultados';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  numeroRandom:number;
  proximoNumero:number = 0;
  urlImg : string = "https://deckofcardsapi.com/static/img/";
  tipoCarta : string[] = ['D','C','H','S'];
  resultadoJuego !: Resultados;
  usuario : any;
  aciertos : number = 0;
  intentos : number = 0;

  constructor(private auth :AuthenticationService,private resServ : ResultadosService) {
    this.auth.obtenerUsuarioLogueado().subscribe(
      user=>{
        this.usuario = user;
      }
    )
    this.numeroRandom = this.devolverNumeroRandom(2,9);

    this.urlImg = this.urlImg+`${this.numeroRandom}${this.devolverLetra()}.png`;    
  }

  ngOnInit(): void {
  }

  esMayor(){
    //console.log(`${this.devolverLetra()}`);
    //this.numeroRandom = Math.floor(Math.random() * 9)+1;
    this.proximoNumero = this.devolverNumeroRandom(2,9);
    //si son iguales tiro de nuevo el random
    while(this.numeroRandom == this.proximoNumero)  this.proximoNumero = this.devolverNumeroRandom(2,9);
    this.numeroRandom < this.proximoNumero ? this.ganaste() : this.perdiste();
  }
  esMenor(){
    //this.numeroRandom = Math.floor(Math.random() * 9)+1;
    this.proximoNumero = this.devolverNumeroRandom(2,9);
    //si son iguales tiro de nuevo el random
    while(this.numeroRandom == this.proximoNumero)  this.proximoNumero = this.devolverNumeroRandom(2,9);
    this.numeroRandom > this.proximoNumero ? this.ganaste() : this.perdiste();
  }

  ganaste(){
    //console.log(this.tipoCarta[Math.floor(Math.random() * 2)+1]);
    this.aciertos++;
    this.intentos++;
    this.numeroRandom = this.proximoNumero;
    this.urlImg = `https://deckofcardsapi.com/static/img/${this.numeroRandom}${this.devolverLetra()}.png`;
    Swal.fire({
      title:`Ganaste!! El próximo era ${this.proximoNumero}\nQuerés seguir jugando?`,
      icon:'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonColor: '#d33',      
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) {        
        this.guardarResultados();
      }
    });
  }
  
  perdiste(){
    this.intentos++;
    //console.log(this.tipoCarta[Math.floor(Math.random() * 2)+1]);
    this.numeroRandom = this.proximoNumero;
    this.urlImg = `https://deckofcardsapi.com/static/img/${this.numeroRandom}${this.devolverLetra()}.png`;
    Swal.fire({
      title:`Perdiste!! El próximo era ${this.proximoNumero}.\nQuerés seguir jugando?`,
      icon:'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonColor: '#d33',      
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) {        
        this.guardarResultados();
      }
    });
  }

  devolverNumeroRandom(min:number,max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  devolverLetra(){
    return this.tipoCarta[this.devolverNumeroRandom(0,3)];
  }

  guardarResultados(){    
    let date = new Date();
    let dateString = date.toString();
    this.resultadoJuego = {
      uid: this.usuario.uid,
      mail: this.usuario.email,
      fecha: dateString,
      juego: 'Mayor-Menor',
      aciertos: this.aciertos,
      intentos: this.intentos
    }    
    this.resServ.guardarResultado(this.resultadoJuego);
  }

}
