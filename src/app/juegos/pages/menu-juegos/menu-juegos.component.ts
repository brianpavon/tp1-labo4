import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-juegos',
  templateUrl: './menu-juegos.component.html',
  styleUrls: ['./menu-juegos.component.css']
})
export class MenuJuegosComponent implements OnInit {
  gamesOn:boolean;
  userLogged:boolean;
  constructor(private user:UserService,private auth:AngularFireAuth) {
    this.gamesOn = false;
    this.userLogged = false;
    auth.authState.subscribe(user=>{
      user ? this.userLogged = true : this.userLogged = false;
      user ? this.gamesOn = true : this.gamesOn = false;
    })
     
  }

  ngOnInit(): void {
  }
  activateGames(status:boolean){
    status  ? this.gamesOn = true : this.gamesOn = false;    
  }

}
