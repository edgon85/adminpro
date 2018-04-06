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


  constructor( public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {


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

}
