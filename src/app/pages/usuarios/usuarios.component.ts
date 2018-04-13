import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Perfil } from '../../models/perfil_usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Perfil[] = [];
  page: number = 1;
  totalRegistros: number = 0;
  paginator: number = 5;

  cargando: boolean = true;



  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.page )
                        .subscribe( (resp: any) => {
                          console.log( resp );
                          this.totalRegistros = resp.count;
                          this.usuarios = resp.results;
                        } );

    this.cargando = false;
  }

  siguiente( ) {

    if (this.paginator <= this.totalRegistros) {
      this.page += 1;
      console.log( 'page' + this.page);
      this.paginator += 5;
      console.log( 'paginator ' +  this.paginator );
      this.cargarUsuarios();
    }

  }

  anterior() {
    if (this.paginator >= this.totalRegistros) {
      this.page -= 1;
      console.log( 'page' + this.page);
      this.paginator -= 5;
      console.log( 'paginator ' +  this.paginator );
      this.cargarUsuarios();
    }
  }

  buscarUsuario( termino: string) {
    console.log( termino );
    this._usuarioService.buscarUsuarios( termino )
                        .subscribe( (usuarios: Usuario[]) => {
                          // console.log( usuario );
                          this.usuarios = usuarios;
                        } );
  }

  guardarUsuario( perfil: Perfil ) {

    let data = JSON.stringify(perfil.role);

    let role = {
      'username': perfil.username,
      'user_id': perfil.user_id,
      'role': perfil.role};

    // console.log( data );


    this._usuarioService.actualizarRole( role ).subscribe();

    // console.log( '------> ' + perfil);
  }
}
