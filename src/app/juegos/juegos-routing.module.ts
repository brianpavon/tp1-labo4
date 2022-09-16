import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado/ahorcado.component';
import { JuegosComponent } from './pages/juegos.component';
import { MenuJuegosComponent } from './pages/menu-juegos/menu-juegos.component';

const routes: Routes = [
  {path:'',component:JuegosComponent,
    children:[
      {path:'menu-juegos',component:MenuJuegosComponent},
      {path:'ahorcado',component:AhorcadoComponent},
      {path:'**',redirectTo:'menu-juegos'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
