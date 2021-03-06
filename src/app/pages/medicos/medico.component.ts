import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _hospitalService: HospitalService,
              public _medicoService: MedicoService,
              public router: Router,
              public activateRoute: ActivatedRoute, // lee el id que le manda a la url
              public _modalUploadService: ModalUploadService
            ) {
              activateRoute.params.subscribe(
                params => {
                  let id = params['id'];  // ese id es el que se coloco en la ruta 'medico/:id'

                  if ( id !== 'nuevo' ) {
                    this.cargarMedico( id );
                  }

                });
            }

  ngOnInit( ) {

   this.cargarHospitales();

   this._modalUploadService.notificacion.subscribe(resp => {
    //  console.log( resp );
     this.medico.img = resp.img;
   });
  }

  // -------------------- Cargar Médicos --------------------------- //
  cargarHospitales() {

    this._hospitalService.cargarHospitales()
          .subscribe( (resp: any ) => {
            this.hospitales = resp.results;
          }
        );
  }

  guardarMedico( f: NgForm ) {

    console.log( JSON.stringify( f.value));


    if ( f.invalid ) {
      return;
    }

    if ( this.medico.id ) {
      let medico = {
        'id': this.medico.id,
        'first_name': this.medico.first_name,
        'last_name': this.medico.last_name,
        'hospital': this.medico.hospital
      };

      this._medicoService.actualizarMedico( medico )
      .subscribe((resp: any ) => {
        swal('Médico Actualizado correctamente', medico.first_name, 'success');

      });

    }else {
      this._medicoService.crearMedico( this.medico )
          .subscribe((resp: any) => {
            swal('Médico Creado', this.medico.first_name + ' ' + this.medico.last_name, 'success');

            this.medico.id = resp.id;
            this.router.navigate(['/medico', this.medico.id]);
          });
    }
  }

  cambiarHospital( id: string ) {

    this._hospitalService.cargarHospital( id )
    .subscribe( hospital => this.hospital = hospital );

  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
        .subscribe(
          (resp: any) => {
            this.medico = resp;
            this.cambiarHospital(resp.hospital);
          });
  }


  cambiarFotografia() {
    this._modalUploadService.mostrarModal('doctor', this.medico.id);
  }
}
