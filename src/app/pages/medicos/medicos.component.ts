import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean;
  totalRegisto: string;

  constructor( public _medicosService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  // -------------------- Cargar Médicos --------------------------- //
  cargarMedicos() {
    this._medicosService.cargarMedicos()
      .subscribe( (resp: any) => {
        this.totalRegisto = resp.count;
        this.medicos = resp.results;
      });
  }

  crearMedico() {

  }

  actualizarMedico() {

  }

  // -------------------- Eliminar un Medico --------------------------- //
  eliminarMedico( id: string) {

    swal({
      title: 'Eliminar',
      text: 'Esta seguro que quiere eliminar Médico ',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this._medicosService.eliminarMedico( id ).subscribe( () => this.cargarMedicos());
        swal('Eliminado!', 'Médico fue eliminado correctamente', 'success');
      }
    });


  }


  // -------------------- Buscar un Médico --------------------------- //
  buscarMedico( termino: string) {

    this._medicosService.buscarMedico( termino )
        .subscribe( (medico: Medico[]) => this.medicos = medico );
  }

  actualizarImagen( medico: Medico ) {

  }

}
