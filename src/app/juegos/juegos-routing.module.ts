import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado/ahorcado.component';
import { BuscaminasComponent } from './pages/buscaminas/buscaminas.component';
import { JuegosComponent } from './pages/juegos.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { MenuJuegosComponent } from './pages/menu-juegos/menu-juegos.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';

const routes: Routes = [
  {path:'',component:JuegosComponent,
    children:[
      {path:'menu-juegos',component:MenuJuegosComponent},
      {path:'ahorcado',component:AhorcadoComponent},
      {path:'mayor-menor',component:MayorMenorComponent},
      {path:'preguntados',component:PreguntadosComponent},
      {path:'buscaminas',component:BuscaminasComponent},      
      {path:'**',redirectTo:'menu-juegos'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
