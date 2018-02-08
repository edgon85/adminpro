import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  token: string;
  usuario: User;

  constructor( public http: HttpClient) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  estaLogueado() {

    return ( this.token.length > 5 ) ? true : false;

  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  crearUsuario ( usuario: User) {

    let url = URL_SERVICIOS + '/user/';

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success');
                return resp.usuario;
              });
  }

  guardarStorague( token: string) {
    localStorage.setItem('token', token);

    this.token = token;
  }


  login ( usuario: User, recordar: boolean = false ) {

    if ( recordar) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/api/v1/auth/';

    return this.http.post( url, usuario ).
        map( (resp: any) => {
          // localStorage.setItem('token', resp.token);
          this.guardarStorague(resp.token);

          return true;
        });
  }
}
