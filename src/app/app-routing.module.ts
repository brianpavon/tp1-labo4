import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ClaseUnoComponent } from './pages/clase-uno/clase-uno.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'home', component:BienvenidoComponent},
  {path:'casa', component:BienvenidoComponent},
  {path:'ejercicio-uno',component:ClaseUnoComponent},
  {path:'login',component:LoginComponent},
  {path:'ingreso',component:LoginComponent},
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'**',component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
