import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  img: string;

  constructor( public _sidebar: SidebarService,
               public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;        // obtengo los datos del usuario

    this._usuarioService.cargarPerfil()                 // obtengo la imagen
                        .subscribe( (data: any) => this.img = data.img);

    // actualiza el componente para cambiar la imagen
    this._usuarioService.notificacion.subscribe(
      resp => this._usuarioService.cargarPerfil()
      .subscribe( (data: any) => this.img = data.img)
    );

  }

}
