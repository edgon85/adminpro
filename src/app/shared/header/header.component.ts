import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  // usuario: string;
  // correo: string;
  img: string;

  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {

  this.usuario = this._usuarioService.usuario;    // datos del usuario

  this._usuarioService.cargarPerfil()             // obtiene la imagen
                        .subscribe( (data: any) => {
                        this.img = data.img;
                        });

  // actualiza el componente para cambiar la imagen
  this._usuarioService.notificacion.subscribe(
    resp => this._usuarioService.cargarPerfil()
    .subscribe( (data: any) => {
    this.img = data.img;
    })
  );

  }

}
