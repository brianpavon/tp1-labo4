import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mail:string = '';
  pass:string = '';
  esNuevo:boolean = false;

  constructor(private routes:Router,private auth:AuthenticationService,public usuarioLogueado:UserService,private logServ:LogService) { }

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
    }
  }
  async registrar(email: string, password: string) {
    try {
      await this.auth.register(email, password);
      this.auth.authSuccess('Registro exitoso!');
      this.logServ.guardarLog(email);      
      this.redirigirHome();
    } catch (error: any) {
      //console.log(error);      
      this.auth.thrownErrorsRegister(error.code);      
    }
  }

  ingresoRapido(){
    //console.log(this.mail + this.pass);
    this.mail = 'test@mail.com';
    this.pass = '654321';     
  }

}
