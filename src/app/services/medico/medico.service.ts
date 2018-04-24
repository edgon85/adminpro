import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS, httpOptions } from '../../config/config';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  constructor( public http: HttpClient) { }

  // -------------------- Cargar Medicos --------------------------- //
  cargarMedicos( ) {

    let url = URL_SERVICIOS + 'doctor/list/';

    return this.http.get( url );
  }

  // -------------------- Cargar un Medico --------------------------- //
 cargarMedico( id: string) {

  let url = URL_SERVICIOS + 'doctor/' + id + '/';

  return this.http.get( url );

 }

  // -------------------- Busca un Medico --------------------------- //
  buscarMedico( termino: string) {
    let url = URL_SERVICIOS + 'doctor/list/?q=' + termino;

    return this.http.get( url )
    .map( (resp: any) => resp.results);
 }


 // -------------------- Eliminar un Medico --------------------------- //
 eliminarMedico( id: string ) {

  let token = httpOptions;
  let url = URL_SERVICIOS + 'doctor/' + id + '/';

  return this.http.delete(url, token);

 }

 // -------------------- Crear un Medico --------------------------- //

 crearMedico( medico: Medico) {

  let token = httpOptions;
  let url = URL_SERVICIOS + 'doctor/';

  return this.http.post( url, medico, token);
 }

}
