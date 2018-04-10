import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  page: number = 1;
  totalRegistros: number = 0;
  paginator: number = 5;



  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this._usuarioService.cargarUsuarios( this.page )
                        .subscribe( (resp: any) => {
                          console.log( resp );
                          this.totalRegistros = resp.count;
                          this.usuarios = resp.results;
                        } );
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

}
