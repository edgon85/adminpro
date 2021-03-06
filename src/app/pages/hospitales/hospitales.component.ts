import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  totalRegistros: string;
  hospitales: Hospital[] = [];
  cargando: boolean = true;

  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(
      () => this.cargarHospitales()
    );
  }


  // -------------------- cargar un Hospitales --------------------------- //
  cargarHospitales() {

    this.cargando = true;
    this._hospitalService.cargarHospitales()
          .subscribe( (resp: any ) => {
            this.totalRegistros = resp.count;
            this.hospitales = resp.results;
            // console.log( resp );
          }
        );

  this.cargando = false;
  }



  // -------------------- Crear un Hospital --------------------------- //
  crearHospital( ) {

    swal({
      title: 'Crear Hospital',
      text: 'Ingrese nombre del hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Nombre Hospital',
          type: 'text',
          name: 'name',
          require: true

        },
      },
      buttons: ['Cancelar', 'Crear'],
    })
    .then((valor: string)  => {
      if (!valor || valor.length === 0) {
        return;
      }

      let data = {
        'name': valor
      };

      this._hospitalService.crearHospital( data ).subscribe( () => this.cargarHospitales());

      swal('Creado!', 'Hospital creado satisfactoriamente', 'success');
    });


  }


  // -------------------- Actualizar un Hospital --------------------------- //
  actualizarHospital( hospital: Hospital) {

    let data = {
      'id': hospital.id,
      'name': hospital.name
    };

    this._hospitalService.actualizaHospital( data ).subscribe(
      resp => this.cargarHospitales()
    );

  }


  // -------------------- Eliminar un Hospital --------------------------- //
  eliminarHospital( id: string) {

    swal({
      title: 'Eliminar',
      text: 'Esta seguro que quiere eliminar el hospital ',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this._hospitalService.borraHospital( id ).subscribe(() => this.cargarHospitales());
        swal('Eliminado!', 'El Hospital fue eliminado correctamente', 'success');
      }
    });
  }


  // -------------------- Buscar un Hospitales --------------------------- //
  buscarHospital( termino: string) {
    this._hospitalService.buscarHospital( termino )
    .subscribe( (hospital: Hospital[]) => {
      this.hospitales = hospital;
    }
      );
  }


  // -------------------- actializar imagen de un Hospital --------------------------- //
  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal('hospital', hospital.id );
  }

}
