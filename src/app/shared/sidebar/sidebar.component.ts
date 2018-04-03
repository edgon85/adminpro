import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: string;
  correo: string;
  img: string;

  constructor( public _sidebar: SidebarService,
               public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;

    this._usuarioService.cargarUsuario()
                        .subscribe( (data: any) => this.img = data.img);

    this._usuarioService.cargarUsuario()
                        .subscribe( (data: any) => this.correo = data.email);
  }

}
