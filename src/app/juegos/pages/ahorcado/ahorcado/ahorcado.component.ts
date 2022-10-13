import { Component, OnInit } from '@angular/core';
import { Resultados } from 'src/app/interfaces/resultados';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResultadosService } from 'src/app/services/resultados.service';
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
  aciertos : number = 0;
  vecesJugadas : number = 0;
  usuario : any;
  resultadoJuego !: Resultados;
  constructor(private resServ : ResultadosService,private auth : AuthenticationService) {
    this.auth.obtenerUsuarioLogueado().subscribe(
      user=>{
        //console.log(user);
        this.usuario = user;
      }
    )
    
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
    this.vecesJugadas++;
    Swal.fire({
      title: 'Perdiste, la próxima quizás ganas. La palabra era: '+this.palabraRandom+'.\nQuerés seguir jugando?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) {
        //console.log("mandar resultados");
        this.guardarResultados();
      }
    })
    this.palabraRandom = '';
    this.palabraElegida=[];
    this.palabraCodificada='';    
    this.cantLetras = 0;
    this.cargarJuego();
  }
  winner(){
    this.vecesJugadas++;
    this.aciertos++;
    Swal.fire({
      title: 'Ganaste!! Crack del ahorcado!!\nQuerés seguir jugando?',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonColor: '#d33',      
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) {
        //console.log("mandar resultados");
        this.guardarResultados();
      }
    });
    this.palabraRandom = '';
    this.palabraElegida=[];
    this.palabraCodificada='';    
    this.cantLetras = 0;
    this.cargarJuego();
  }

  guardarResultados(){
    //console.log(`aciertos ${this.aciertos} intentos ${this.vecesJugadas}`);
    let date = new Date();
    let dateString = date.toString();
    this.resultadoJuego = {
      uid: this.usuario.uid,
      mail: this.usuario.email,
      fecha: dateString,
      juego: 'Ahorcado',
      aciertos: this.aciertos,
      intentos: this.vecesJugadas
    }
    //console.log(this.resultadoJuego);
    this.resServ.guardarResultado(this.resultadoJuego);
  }
  
}
