import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: string;
  correo: string;
  img: string;

  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {

  this.usuario = this._usuarioService.usuario;

  this._usuarioService.cargarUsuario()
                        .subscribe( (data: any) => this.img = data.img);

  this._usuarioService.cargarUsuario()
                        .subscribe( (data: any) => this.correo = data.email);



  }

}
