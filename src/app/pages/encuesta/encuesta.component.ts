import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  juegoFavorito: string = '';
  juegos: string[] = ['Ahorcado', 'Mayor-Menor', 'Preguntados', 'Buscaminas'];
  formEncuesta : FormGroup;
  usuario : any;
  nuevaEncuesta !: Encuesta;

  constructor(private encSer:EncuestaService,private fb:FormBuilder,private auth : AuthenticationService,private ruteo:Router) {
    this.auth.obtenerUsuarioLogueado().subscribe(
      usuario=>{
        //console.log(usuario);
        this.usuario = usuario;
      }
    );
    this.formEncuesta = this.fb.group({
      'nombre':['',[Validators.required,Validators.pattern('^[A-Za-z ]*'),Validators.minLength(5)]],
      'edad':['',[Validators.required,Validators.min(18),Validators.max(99),Validators.pattern('^[0-9]*')]],
      'telefono':['',[Validators.required,Validators.pattern('^[0-9]*'),Validators.maxLength(10)]],
      'rta1':['',[Validators.required]],
      'rta2':['',[Validators.required]],
      'rta3':['',[Validators.required,Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
  }

  enviarEncuesta(){
    //console.log(this.formEncuesta.value);
    this.nuevaEncuesta = {
      ...this.formEncuesta.value,
      uid:this.usuario.uid,
      mail:this.usuario.email
    }
    //console.log(this.nuevaEncuesta);
    this.encSer.guardarEncuesta(this.nuevaEncuesta);
    Swal.fire({      
      icon: 'success',
      title: 'Encuesta enviada con éxito',
    });
    this.formEncuesta.reset();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ruteo.navigate(['/juegos/menu-juegos'])
    },2000);  
    
    
  }

}
