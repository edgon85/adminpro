import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '', '');

  constructor(public _hospitalService: HospitalService,
              public _medicoService: MedicoService) { }

  ngOnInit( ) {

   this.cargarHospitales();
  }

  // -------------------- cargar un Hospitales --------------------------- //
  cargarHospitales() {

    this._hospitalService.cargarHospitales()
          .subscribe( (resp: any ) => {
            this.hospitales = resp.results;
          }
        );
  }

  guardarMedico( f: NgForm ) {

    console.log( 'valid: ' + f.valid );
    console.log( 'value: ' + JSON.stringify( f.value ));

    if ( f.invalid ) {
      return;
    }

    this._medicoService.crearMedico( this.medico )
        .subscribe((resp: any) => {
          console.log( resp );
          swal('Médico Creado', this.medico.first_name, 'success');
        });

  }
}
