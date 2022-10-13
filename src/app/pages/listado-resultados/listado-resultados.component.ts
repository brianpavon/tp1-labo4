import { Component, OnInit } from '@angular/core';
import { Resultados } from 'src/app/interfaces/resultados';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.css']
})
export class ListadoResultadosComponent implements OnInit {
  todosLosResultados : Resultados[] = [];
  displayedColumns: string[] = ['mail', 'juego', 'intentos', 'aciertos','fecha'];

  constructor(private resServ : ResultadosService) { }

  ngOnInit(): void {
    this.traerResultados()
  }

  traerResultados(){
    this.resServ.traerTodosLosResultados().subscribe(
      resultados=>{
        resultados.forEach(element => {
          //console.log(element.mail.split('@')[0]);
          //element.mail = element.mail.split('@')[0];
          
          //console.log(element.fecha);
          //formateo fecha
          let date = new Date(element.fecha)
          let mes = date.getMonth()+1;
          element.fecha = date.getDate()+"/"+mes+"/"+date.getFullYear();
          //console.log(element.fecha);          
        });
        this.todosLosResultados = resultados;
      }
    )
  }

}
