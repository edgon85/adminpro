import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor( public http: HttpClient) {
    console.log('Servicio de usuario listo');
  }

  // crea un usuario en el backend
  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + 'auth/register/';

    return this.http.post( url, usuario)
                .map( (resp: any) => {
                  swal('Usuario creado', usuario.email, 'success');
                  return resp.usuario;
                });
  }

  // inicio de sesion
  login( usuario: Usuario, recordar: boolean = false ) {

    let url = URL_SERVICIOS + 'auth/';

    return this.http.post( url, usuario);
  }
}
