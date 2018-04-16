import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Perfil } from '../../models/perfil_usuario.model';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  perfil: Perfil;

  token: string;
  img: string;

  public notificacion = new EventEmitter<any>(); // notificacion para las imagenes

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
    // console.log('Servicio de usuario listo');
  }

  // ---------------------- saber si un usuario esta logueado o no -------------
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  // ----------------------- crea un usuario en el backend ---------------------
  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + 'auth/register/';

    return this.http.post( url, usuario)
                .map( (resp: any) => {
                  swal('Usuario creado', usuario.email, 'success');
                  return resp.usuario;
                });
  }

  // ------------------------ inicio de sesion ----------------------------------
  login( usuario: Usuario, recordar: boolean = false ) {

    let url = URL_SERVICIOS + 'auth/';

    if ( recordar ) {
      localStorage.setItem('email', usuario.username);
    }else {
      localStorage.removeItem('email');
    }

    return this.http.post( url, usuario)
               .map( (resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp );
                console.log( resp );

                 return true;
              });
  }

  // -------------------------- logout del usuario ----------------------------------
  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  //  -------------------------- guardar datos en el storague -------------------------

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  // ---------------------- cargar datos del storage ---------------------------------
  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

// -------------- Carga usuario ------------------------------

cargarPerfil() {
  interface UserResponse {
    user_id: string;
    username: string;
    first_name: string;
    last_name: string;
    correo: string;
    img: string;
    role: string;
  }

  let url = URL_SERVICIOS + 'user_profile/' + localStorage.getItem('id') + '/';

  return this.http.get<UserResponse>( url );

  }


  // --------------------- Actualiza un usuario ------------------------
  actualizarUsuario ( usuario: Usuario ) {

    let token = localStorage.getItem('token');
    let username = JSON.parse( localStorage.getItem('usuario'));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + token
      })
    };


    let url = URL_SERVICIOS + 'user/' + username.username + '/' ;
    console.log('--->' + url );

    return this.http.put(url, usuario, httpOptions )
                    .map( (resp: any) => {
                      this.guardarStorage( resp.id, token, resp);
                      swal('Usuario actualizado', usuario.username, 'success');

                      return true;
                    } );

  }


  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo( archivo, '', id)
      .then( (resp: any) => {
        //  console.log( resp.img );
        this.img = resp.img;
        swal('Imagen Actualizada', this.usuario.username, 'success');
        this.notificacion.emit( resp ); // envia una notificacion a los componentes si hay un cambio

      })
      .catch( resp => {
        console.log( resp);
      });
  }


  cargarUsuarios( page: number = 1) {

    let url = URL_SERVICIOS + 'user_profile/' + '?page=' + page;

    return this.http.get( url );

  }

  buscarUsuarios( termino: string) {
    let url = URL_SERVICIOS + 'user_profile/?q=' + termino;

    return this.http.get( url )
               .map( (resp: any) => resp.results );
  }


  actualizarRole( perfil: Perfil) {
    let token = localStorage.getItem('token');
    // let username = JSON.parse( localStorage.getItem('usuario'));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + token
      })
    };

    // let url = URL_SERVICIOS + 'user_profile/' + localStorage.getItem('id') + '/';
    let url = URL_SERVICIOS + 'user_profile/' + perfil.user_id + '/';

    return this.http.put( url, perfil, httpOptions )
                    .map( resp => {
                      // console.log('----> ' + url );
                      swal('Usuario actualizado', perfil.username, 'success');
                    });

  }

}
