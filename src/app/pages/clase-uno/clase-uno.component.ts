import { Component, OnInit } from '@angular/core';
import { Numero } from 'src/app/class/numero';

@Component({
  selector: 'app-clase-uno',
  templateUrl: './clase-uno.component.html',
  styleUrls: ['./clase-uno.component.css']
})
export class ClaseUnoComponent implements OnInit {
  miNumero:Numero;
  
  constructor() { 
    this.miNumero = new Numero;
  }

  ngOnInit(): void {
  }

}
