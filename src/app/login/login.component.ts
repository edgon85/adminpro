import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;    // maneja el valor del recuerdamen del formulario
  email: string;

  constructor( public router: Router,
               public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();

    // maneja el check recuerdame
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }

  ingresar( forma: NgForm) {

    if ( forma.invalid ) {  // si la forma no es valida que se salga y no haga nada mas
      return;
    }

    let usuario = new Usuario(forma.value.email, null, forma.value.password, null );

    // hace login y redirige al dashboard
    this._usuarioService.login( usuario, forma.value.recuerdame )
                        .subscribe( correcto => this.router.navigate(['/dashboard']));

    // // hace login y muestra los resultados en consola (sin el map en el servicio)
    // this._usuarioService.login( usuario, forma.value.recuerdame )
    //                     .subscribe( resp => {
    //                       console.log( resp );
    //                     });


    // console.log( forma.valid );
    // console.log( forma.value );
    // console.log('ingresando...');
    // this.router.navigate(['/dashboard']);
  }

}
