import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogged:boolean;
  constructor(private auth:AngularFireAuth) { 
    this.userLogged = false;
    auth.authState.subscribe(user=>{
      user ? this.userLogged = true : this.userLogged = false;      
    })
  }

  ngOnInit(): void {
  }

}
