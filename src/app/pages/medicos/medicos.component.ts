import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico;
  cargando: boolean;

  constructor() { }

  ngOnInit() {
  }

  crearHospital() {

  }

  actualizarMedico() {

  }

  eliminarMedico() {

  }


  buscarMedico( termino: string ) {

  }

  actualizarImagen( medico: Medico ) {

  }

}
