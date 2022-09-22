import { Component, OnInit } from '@angular/core';
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

  constructor() {    
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
    this.numeroRandom = this.proximoNumero;
    this.urlImg = `https://deckofcardsapi.com/static/img/${this.numeroRandom}${this.devolverLetra()}.png`;
    Swal.fire(`Ganaste!! El próximo era ${this.proximoNumero}`);
  }
  
  perdiste(){

    //console.log(this.tipoCarta[Math.floor(Math.random() * 2)+1]);
    this.numeroRandom = this.proximoNumero;
    this.urlImg = `https://deckofcardsapi.com/static/img/${this.numeroRandom}${this.devolverLetra()}.png`;
    Swal.fire(`Perdiste!! El próximo era ${this.proximoNumero}`);
  }

  devolverNumeroRandom(min:number,max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  devolverLetra(){
    return this.tipoCarta[this.devolverNumeroRandom(0,3)];
  }

}
