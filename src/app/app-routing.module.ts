import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosModule } from './juegos/juegos.module';
import { ClaseUnoComponent } from './pages/clase-uno/clase-uno.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';

const routes: Routes = [  
  {path:'home', component:HomeComponent},
  {path:'casa', component:HomeComponent},
  {path:'ejercicio-uno',component:ClaseUnoComponent},
  {path:'login',component:LoginComponent},
  {path:'ingreso',component:LoginComponent},
  {path:'quien-soy',component:QuienSoyComponent},
  {path:'juegos',
    loadChildren:()=>import('./juegos/juegos.module').then(m=>JuegosModule)
  },
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'**',component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
