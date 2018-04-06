import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  img: string;
  imagenTemp: string;

  constructor( public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {

    this._usuarioService.cargarPerfil()             // obtiene la imagen
                        .subscribe( (data: any) => {
                        this.img = data.img;
                        });

  }

  guardar( usuario: Usuario) {
    // console.log( usuario );
    let username = JSON.parse( localStorage.getItem('usuario'));

    // this.usuario.username = usuario.username;
    this.usuario.username = username.username;
    this.usuario.email  = usuario.email;
    this.usuario.first_name = usuario.first_name;
    this.usuario.last_name = usuario.last_name;

    this._usuarioService.actualizarUsuario( this.usuario )
                        .subscribe( resp => {
                          // console.log( resp );
                        });

  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal( 'Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error' );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // esto jscript puro y hace que aparezca la imagen en el preload
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario.id);
  }

}
