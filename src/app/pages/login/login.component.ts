import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mail:string = '';
  pass:string = '';
  esNuevo:boolean = false;

  constructor(private routes:Router,private auth:AuthenticationService,public usuarioLogueado:UserService,private firestore:AngularFirestore) { }

  ngOnInit(): void {
  }

  redirigirHome(){
    this.routes.navigate(['home']);
  }

  async login(email: string, password: string) {
    try {
      await this.auth.login(email, password);
      this.auth.authSuccess('Bienvenido nuevamente!');      
      this.redirigirHome();
      this.usuarioLogueado.email = email;
    } catch (error: any) {
      this.auth.thrownErrorsLogin(error.code);
      /*if(error.code == "auth/user-not-found"){
        this.isNew = true;
      }*/
    }
  }
  async registrar(email: string, password: string) {
    try {
      await this.auth.register(email, password);
      this.auth.authSuccess('Registro exitoso!');
      //this.saveLog(email);
      let date = new Date();
      let dateString = date.toString();
      let arrayLog = {
        email: email,
        fecha_ingreso: dateString
      }
      await this.firestore.collection('log').add(arrayLog);
      this.redirigirHome();
    } catch (error: any) {
      console.log(error);
      
      this.auth.thrownErrorsRegister(error.code);      
    }
  }

  ingresoRapido(){
    //console.log(this.mail + this.pass);
    this.mail = 'test@mail.com';
    this.pass = '654321';     
  }

  async saveLog(email:string){
    let date = new Date();
    let dateString = date.toString();
    let arrayLog ={
      email: email,
      fecha_ingreso: dateString
    }
    await this.firestore.collection('log').add(arrayLog);
  }

}
