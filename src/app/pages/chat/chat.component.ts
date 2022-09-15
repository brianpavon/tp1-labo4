import { Component, OnInit } from '@angular/core';
import { Mensajes } from 'src/app/interfaces/mensajes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensajeNuevo:string = '';
  arrayMensajes:Mensajes[]=[];  
  isLogged:boolean = false;
  chatOn:boolean = false;
  usuarioLogueado : any;

  constructor(private authService:AuthenticationService ,private servMsj:MensajesService ) { 
  }
  
  ngOnInit(): void {
    this.authService.obtenerUsuarioLogueado().subscribe(
      user=>{        
        user ? this.isLogged = true : this.isLogged = false;
        this.usuarioLogueado = user;
      }
    )
    this.cargarMensajes();    
  }

  ngAfterViewChecked():void{
    this.scrollAlUltimo();
  }


  enviarMensaje(){
    if(this.mensajeNuevo == '') return;
    //console.log(this.mensajeNuevo);
    let date = new Date();
    let dateString = date.toString();
    //sacamos el nombre del mail
    let indice = this.usuarioLogueado.email.indexOf("@");    
    let nombre = this.usuarioLogueado.email.substring(0, indice);

    let nuevoMsj ={
      id:this.arrayMensajes.length+1,
      nombre: nombre,
      emisor:this.usuarioLogueado.uid,
      texto: this.mensajeNuevo,
      fecha: dateString
    }    
    this.servMsj.guardarMensaje(nuevoMsj);
    this.mensajeNuevo = "";
    setTimeout(() => {
      this.scrollAlUltimo();
    }, 20);
  }

  activateChat(){
    this.chatOn = true;
  }
  closeChat(){
    this.chatOn = false;
  }

  scrollAlUltimo(){
    let todosLosMsj:any = document.getElementsByClassName('msjChat');    
    let ultimoMsj :any = todosLosMsj[(todosLosMsj.length - 1)];
    let posicionSuperior;
    if(ultimoMsj){
      posicionSuperior = ultimoMsj.offsetTop;
    }

    //@ts-ignore
    document.getElementById('contenedorMsj')?.scrollTop = posicionSuperior;
  }

  cargarMensajes(){
    this.servMsj.traerTodosLosMensajes().subscribe(
      mensajes=>{
        //console.log(mensajes);
        this.arrayMensajes = mensajes;
        this.ordenarMensajes();        
      }
    )    
  }

  ordenarMensajes(){
   
    this.arrayMensajes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      
      return 0;
    });
  }


}
