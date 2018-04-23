import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class MedicoService {

  constructor( public http: HttpClient) { }

  cargarMedicos( ) {

    let url = URL_SERVICIOS + 'doctor/list/';

    return this.http.get( url );
  }

}
