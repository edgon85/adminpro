import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean;
  totalRegisto: string;

  hospital: string;

  constructor( public _medicosService: MedicoService,
               public _hopitalService: HospitalService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos()
      .subscribe( (resp: any) => {
        this.totalRegisto = resp.count;
        this.medicos = resp.results;

        console.log( resp. results );

      });
  }

  crearMedico() {

  }

  actualizarMedico() {

  }

  eliminarMedico() {

  }


  buscarMedico( termino: string ) {

  }

  actualizarImagen( medico: Medico ) {

  }

  cargarHospital( id: string ) {
    this._hopitalService.obtrenerHospital( id ).subscribe(
      resp => {
        console.log( resp );
      }
    );
  }

}
