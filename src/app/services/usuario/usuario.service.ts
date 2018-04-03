import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: string;
  token: string;
  img: string;
  id: string;

  constructor( public http: HttpClient,
               public router: Router ) {
    this.cargarStorage();
    // console.log('Servicio de usuario listo');
  }

  // saber si un usuario esta logueado o no
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
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

    if ( recordar ) {
      localStorage.setItem('email', usuario.username);
    }else {
      localStorage.removeItem('email');
    }

    return this.http.post( url, usuario)
               .map( (resp: any) => {
                //  localStorage.setItem('id', resp.id);
                //  localStorage.setItem('token', resp.token);
                //  localStorage.setItem('usuario', resp.user);
                this.guardarStorage(resp.id, resp.token, resp.user);

                 return true;
              });
  }

  // logout del usuario
  logout() {
    this.token = '';
    this.usuario = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  // guardar datos en el storague
  guardarStorage(id: string, token: string, usuario: string) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', usuario);

    this.id = id;
    this.usuario = usuario;
    this.token = token;
  }

  // cargar datos del storage
  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = localStorage.getItem('usuario');
      this.id = localStorage.getItem('id');
    } else {
      this.token = '';
      this.usuario = '';
    }
  }

  cargarUsuario() {
    interface UserResponse {
      img: string;
      correo: string;
    }

    let url = URL_SERVICIOS + 'user_profile/' + localStorage.getItem('id') + '/';

    // console.log( url );
    return this.http.get<UserResponse>( url );

  }
}
