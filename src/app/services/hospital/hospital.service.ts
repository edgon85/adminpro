import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS, URL_GENERAL } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

declare var swal: any;

@Injectable()
export class HospitalService {

  hospital: Hospital;
  img: string;

  constructor( public http: HttpClient,
               public _subirArchivoService: SubirArchivoService) { }

  // -------------------- Cargar un Hospitales --------------------------- //
  cargarHospitales() {
    let url = URL_SERVICIOS + 'hospital/';

    return this.http.get( url );
  }

  // -------------------- Cargar un Hospital --------------------------- //
  cargarHospital( id: string) {
    let url = URL_SERVICIOS + 'hospital/' + id + '/';

    return this.http.get( url );
  }

  // -------------------- Crear un Hospital --------------------------- //
  crearHospital( hospital: Hospital) {

    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + token
      })
    };

    let url = URL_SERVICIOS + 'hospital/';

    return this.http.post( url, hospital, httpOptions );
  }


  // -------------------- actualiza un Hospital --------------------------- //
  actualizaHospital( hospital: Hospital) {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + token
      })
    };

    let url = URL_SERVICIOS + 'hospital/' + hospital.id + '/';

    return this.http.put( url, hospital, httpOptions)
                    .map( (resp: any) => {
                      swal('Hospital actualizado', hospital.name, 'success');
                    });

  }

  // -------------------- Elimina un Hospital --------------------------- //
  borraHospital( id: string) {

    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + token
      })
    };

    let url = URL_SERVICIOS + 'hospital/' + id + '/';

    return this.http.delete( url, httpOptions );
  }


  // -------------------- Busca un Hospital --------------------------- //
  buscarHospital( termino: string) {
     let url = URL_SERVICIOS + 'hospital/?q=' + termino;

     return this.http.get( url )
     .map( (resp: any) => resp.results);
  }

}
