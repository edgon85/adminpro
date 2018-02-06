import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor( public http: HttpClient) {
    // console.log('Servicio de usuario listo');
  }


  crearUsuario ( usuario: User) {

    let url = URL_SERVICIOS + '/user/';

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success');
                return resp.usuario;
              });
  }


  login ( usuario: User, recordar: boolean = false ) {

    let url = URL_SERVICIOS + '/api/v1/auth/';

    if ( recordar) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }


    return this.http.post( url, usuario ).
        map( (resp: any) => {
          localStorage.setItem('token', resp.token);

          return true;
        });
  }
}
