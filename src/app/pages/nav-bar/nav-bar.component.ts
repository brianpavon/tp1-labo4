import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  usuarioLogueado : boolean | undefined;
  mailUsuario : string | undefined;
  constructor(private auth:AngularFireAuth,public authService:AuthenticationService) { 
    this.auth.authState.subscribe(user=>{
      if(user){
        this.usuarioLogueado = true;
        this.mailUsuario = user.email ? user.email : "";
      }else{
        this.usuarioLogueado = false;
      }
    })
  }

  ngOnInit(): void {
  }

}
