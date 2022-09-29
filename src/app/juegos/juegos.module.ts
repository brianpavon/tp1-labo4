import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado/ahorcado.component';
import { JuegosComponent } from './pages/juegos.component';
import { MenuJuegosComponent } from './pages/menu-juegos/menu-juegos.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { MaterialModule } from '../material/material.module';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { BuscaminasComponent } from './pages/buscaminas/buscaminas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MenuJuegosComponent,
    JuegosComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    BuscaminasComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    MaterialModule,    
    FormsModule,
  ]
})
export class JuegosModule { }
