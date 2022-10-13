import { Component, ElementRef, ViewChild } from '@angular/core';
import { Resultados } from 'src/app/interfaces/resultados';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';


let arrayPiezzasGlobal :any;
let numPiezasDescubiertas : number = 0;
let intentos : number = 0;
let aciertos : number = 0;
let resultadoJuego !: Resultados
let usuario : any;
let resServ !: ResultadosService
@Component({
  selector: 'app-buscaminas',
  templateUrl: './buscaminas.component.html',
  styleUrls: ['./buscaminas.component.css']
})
export class BuscaminasComponent {      
      dificultadPlayer = 0;
      contenido: String = "";
      arrayPiezas = [];

      constructor(private auth : AuthenticationService,private rServ : ResultadosService){
        this.auth.obtenerUsuarioLogueado().subscribe(
          user=>{
            usuario = user;
          }
        )
        resServ = rServ;
      }

      // Link
      @ViewChild('contenido') contenedor!: ElementRef;
      @ViewChild('btnIniciar') btnIniciar!: ElementRef;
      @ViewChild('configuracion') panelConfiguracion!: ElementRef;
      @ViewChild('reset') btnReset!: ElementRef;

      resetJuego(){
        this.btnReset.nativeElement.style.visibility = "hidden";
        this.contenedor.nativeElement.removeChild(document.getElementById('tabla'));
        this.panelConfiguracion.nativeElement.style.visibility = "visible";
      }

      mostrarConfiguracion() {
        this.btnIniciar.nativeElement.style.visibility = "hidden";
        this.panelConfiguracion.nativeElement.style.visibility = "visible";
      }

      iniciarJuego(dificultad: number) {
        this.panelConfiguracion.nativeElement.style.visibility = "hidden";
        //this.panelBotonera.nativeElement.style.visibility = "visible";

        let piezas = 0;
        let bombas = 0;

        switch (dificultad) {
          case 0:
            // Facil
            piezas = 25;
            bombas = 5;
            break;
          case 1:
            // Normal
            piezas = 49;
            bombas = 15;
            break;
          case 2:
            // Dificil
            piezas = 64;
            bombas = 30;
            break;
        }

        // Inicializamos Array
        let arrayPiezas = new Array(piezas);        
        //console.log(arrayPiezas);
        
        arrayPiezas = this.colocarBombas(arrayPiezas, bombas);
        
        arrayPiezas = this.checkBombas(arrayPiezas, piezas);
        //console.log("RESULTADO");
        //console.log(arrayPiezas);

        // Guardamos partida actual en Global (Para acceder desde el Controladorcelda)
        arrayPiezzasGlobal = arrayPiezas;

        // Oculta botón Iniciar partida
        this.btnIniciar.nativeElement.style.display = "none";

        this.armarCampoDeMinas(arrayPiezas);
      }

      
      armarCampoDeMinas(arrayPiezas:number[]) {
        let cuadrado = Math.sqrt(arrayPiezas.length);

        let tableBase = document.createElement('table');
        tableBase.setAttribute("id","tabla");
        let tbody = document.createElement('tbody');
        let numPieza = 0;

        for (let i = 0; i < cuadrado; i++) {
          let fila = document.createElement('tr');

          for (let c = 0; c < cuadrado; c++) {
            let columna = document.createElement('td');
            columna.id = "pieza" + numPieza;
            columna.addEventListener("click", ControladorCelda);
            columna.style.backgroundImage = "url(\"assets/images/Bloque1.gif\")"
            columna.style.backgroundSize = "contain";
            columna.classList.add('columna');

            numPieza++;
            fila.appendChild(columna);
          }

          tbody.appendChild(fila);
        }
        tableBase.appendChild(tbody);
        this.contenedor.nativeElement.appendChild(tableBase);
      }
      
      colocarBombas(arrayPiezas:number[], numBombas:number) {

        // Generar posicones de bombas
        //let fruits: string[]
        let posicionesbombas : number[] = [];
        for (let i = 0; i < numBombas; i++) {
          let aleatorio = -1;
          let valido = false;

          while (!valido) {
            aleatorio = Math.floor((Math.random() * arrayPiezas.length));
            //console.log(aleatorio);
            
            if (!posicionesbombas.includes(aleatorio)) {
              valido = true;
            }
          }
          posicionesbombas.push(aleatorio);
        }

        console.log("Coloco bombas en las posiciones: " + posicionesbombas);

        // Colocar bombas
        for (let i = 0; i < posicionesbombas.length; i++) {
          arrayPiezas[posicionesbombas[i]] = -1;
        }

        return arrayPiezas;
      }      

      checkBombas(arrayPiezas:number[], numPiezas:number) {
        // Comenzamos comprobación
        let cuadrado = Math.sqrt(numPiezas);

        // Analizamos cada pieza 
        for (let i = 0; i < arrayPiezas.length; i++) {
          let contadorBomba = 0;

          // Descartamos que sea bomba
          if (arrayPiezas[i] != -1) {
            // No hay bomba 
            let izquierda: boolean = true; 
            let derecha: boolean = true;
            let arriba: boolean = true;
            let abajo: boolean = true;

            // Habilitamos izquierda ?
            //console.log(`i ${i} cuadrado es ${cuadrado}`);
            
            if (Math.floor(i / cuadrado) != Math.floor((i - 1) / cuadrado)) {
              izquierda = false;
              //console.log("#" + i + " Izquierda desactivado\n" + Math.floor(i / cuadrado) + " vs " + Math.floor((i - 1) / cuadrado));
            }

            // Habilitamos derecha ?
            if (Math.floor(i / cuadrado) != Math.floor((i + 1) / cuadrado)) {
              derecha = false;
              //console.log("#" + i + " Derecha desactivado\n" + Math.floor(i / cuadrado) + " vs " + Math.floor((i + 1) / cuadrado));
            }

            // Habilitamos arriba ?
            if ((i - cuadrado) == undefined) {
              arriba = false;
              //console.log("#" + i + " Arriba desactivado");
            }

            // Habilitamos abajo ?
            if ((i + cuadrado) == undefined) {
              abajo = false;
              //console.log("#" + i + " Abajo desactivado");
            }

            // Checkea en todas las direcciones habilitadas

            // Izquierda
            if (izquierda && arrayPiezas[(i - 1)] == -1) {               
              contadorBomba++ 
            }
            // Derecha
            if (derecha && arrayPiezas[(i + 1)] == -1) {               
              contadorBomba++ 
            }
            // Arriba
            if (arriba && arrayPiezas[(i - cuadrado)] == -1) { 
              contadorBomba++               
            }
            // Arriba Izquierda
            if (arriba && izquierda && arrayPiezas[(i - cuadrado - 1)] == -1) { 
              contadorBomba++               
            }
            // Arriba Derecha
            if (arriba && derecha && arrayPiezas[(i - cuadrado + 1)] == -1) { 
              contadorBomba++               
            }
            // Abajo
            if (abajo && arrayPiezas[(i + cuadrado)] == -1) { 
              contadorBomba++               
            }
            // Abajo Izquierda
            if (abajo && izquierda && arrayPiezas[(i + cuadrado - 1)] == -1) { 
              contadorBomba++               
            }
            // Abajo Derecha
            if (abajo && derecha && arrayPiezas[(i + cuadrado + 1)] == -1) { 
              contadorBomba++              
            }
          } else {
            // Es la bomba :O
            contadorBomba = -1;
          }
          arrayPiezas[i] = contadorBomba;
          //console.log(`${contadorBomba} + ${arrayPiezas[i]}`);
        }

        return arrayPiezas;
      }

      


}

function ganaste(){
  numPiezasDescubiertas = 0
  intentos++;
  aciertos++;
  Swal.fire({
      position: 'center',
      title: 'Ganaste!!\nQuerés seguir jugando?',
      imageUrl: 'assets/images/happy.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonColor: '#d33',      
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) {        
        guardarResultados();
      }
    });
    //@ts-ignore    
  document.getElementById('reset').style.visibility = "visible";
  
}

function perdiste(){
  numPiezasDescubiertas = 0
  intentos++;
  setTimeout(() => {    
    Swal.fire({
      position: 'center',
      title: 'Perdiste!\nQuerés seguir jugando?',      
      imageUrl: 'assets/images/dead.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonColor: '#d33',      
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) {        
        guardarResultados();
      }
    });
    
    //@ts-ignore    
    document.getElementById('reset').style.visibility = "visible";
  }, 2200);
}

/**
 * Controlador de la piezza con sus metodos y comprobaciones
 */
function ControladorCelda(this:any) {
	//console.log(this.id);
	// Obtenemos número de la pieza
	let numeroPieza = this.id.replace("pieza", "");

	// BOMBA
	let listadoBombas = [];

	// Posiciones de las bombas
	for (let b = 0; b < arrayPiezzasGlobal.length; b++) {
		// Sacar las piezas donde hay bomba realmente
		if (arrayPiezzasGlobal[b] == -1) {
			listadoBombas.push(b);
		}
	}

	// Realizamos comprobaciones
	if (arrayPiezzasGlobal[numeroPieza] == -1) {
		// Aplicar bomba a las piezas
		for (let a = 0; a < listadoBombas.length; a++) {
      //@ts-ignore
      document.getElementById("pieza" + listadoBombas[a]).style.backgroundImage = "url('assets/images/explosion.gif')";
      //@ts-ignore
      document.getElementById("pieza" + listadoBombas[a]).style.backgroundSize = "contain";
      
		}

		// Eliminar todos los click
		let celdas = document.getElementsByTagName("td");
		for (let i = 0; i < celdas.length; i++) {
			celdas[i].removeEventListener("click", ControladorCelda);
		}
    perdiste();
		// Fin		
	} else {

		this.textContent = arrayPiezzasGlobal[numeroPieza];
		this.style.backgroundImage = "url('assets/images/bloque2.png')"
		this.style.backgroundSize = "contain";
		this.style.fontSize = "2em";
    //console.log(numPiezasDescubiertas);    
    numPiezasDescubiertas++;
    //console.log(numPiezasDescubiertas);
		// Comprobamos que ha ganado
		if (numPiezasDescubiertas == (arrayPiezzasGlobal.length - listadoBombas.length)){
      let celdas = document.getElementsByTagName("td");
      for (let i = 0; i < celdas.length; i++) {
        celdas[i].removeEventListener("click", ControladorCelda);
      }
      ganaste();
		}
	}

	// Quitamos propiedad click
	this.removeEventListener("click", ControladorCelda);
	this.removeEventListener("contextmenu", ControladorCelda);
}

function guardarResultados(){
  //console.log(usuario);
  
  let date = new Date();
  let dateString = date.toString();
  resultadoJuego = {
    uid: usuario.uid,
    mail: usuario.email,
    fecha: dateString,
    juego: 'Buscaminas',
    aciertos: aciertos,
    intentos: intentos
  }    
  resServ.guardarResultado(resultadoJuego);
}


