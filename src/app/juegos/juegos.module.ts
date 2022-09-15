import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado/ahorcado.component';
import { MenuJuegosComponent } from './pages/ahorcado/menu-juegos/menu-juegos.component';
import { JuegosComponent } from './pages/juegos.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MenuJuegosComponent,
    JuegosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
