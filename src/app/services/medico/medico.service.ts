import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, httpOptions } from '../../config/config';

@Injectable()
export class MedicoService {

  constructor( public http: HttpClient) { }

  cargarMedicos( ) {

    let url = URL_SERVICIOS + 'doctor/list/';

    return this.http.get( url );
  }

  // -------------------- Busca un Hospital --------------------------- //
  buscarMedico( termino: string) {
    let url = URL_SERVICIOS + 'doctor/list/?q=' + termino;

    return this.http.get( url )
    .map( (resp: any) => resp.results);
 }


 // -------------------- Eliminar un Hospital --------------------------- //
 eliminarMedico( id: string ) {

  let token = httpOptions;
  let url = URL_SERVICIOS + 'doctor/' + id + '/';

  return this.http.delete(url, token);

 }

}
