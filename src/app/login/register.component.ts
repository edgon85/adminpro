import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;  // trabaja el formulario de registro

  constructor( public _usuarioService: UsuarioService) { }

  sonIguales( campo1: string, campo2: string ) { // valida las contraseñas

    // tslint:disable-next-line:no-shadowed-variable
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {  // si son iguales deja pasar
        return null;
      }

      return {
        sonIguales: true
      };

    };
  }

  ngOnInit() {
    init_plugins(); // inicia el plugin

    this.forma = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      username: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }

  registrarUsuario() {

    if ( this.forma.invalid ) {    // Si la forma es invalida no retorna nada
      return;
    }

    if ( !this.forma.value.condiciones ) {
      console.log('Debe aceptar las condiciones');
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    console.log('forma valida ', this.forma.valid);
    console.log(this.forma.value);

    // obtener los datos del usuario desde el formulario
    let usuario = new Usuario(
      this.forma.value.username,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.password2
    );

    // llamamos el servicio crear usuario y todo el json de la api se guarda en resp
    this._usuarioService.crearUsuario(usuario)
                .subscribe( resp => {
                  console.log(resp);
                });
  }

}
