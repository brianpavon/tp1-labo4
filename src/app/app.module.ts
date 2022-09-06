import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { ClaseUnoComponent } from './pages/clase-uno/clase-uno.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { HomeComponent } from './pages/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    NavBarComponent,
    ClaseUnoComponent,
    QuienSoyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
