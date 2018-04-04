import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: Usuario;

  usuario: string;
  correo: string;
  nombre: string;
  apellido: string;

  constructor( public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;
    this._usuarioService.cargarUsuario().subscribe( (data: any) => {
                            this.correo = data.email;
                            this.nombre = data.first_name;
                            this.apellido = data.last_name;
                          });
  }

  ngOnInit() {


  }

  guardar( usuario: Usuario) {
    // console.log( usuario );

    this.user = usuario;

    this._usuarioService.actualizarUsuario( this.user )
                        .subscribe( resp => {
                          // console.log( resp );
                        });

  }

}
