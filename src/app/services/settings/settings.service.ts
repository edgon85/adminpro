import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    termaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document,  ) {
    this.cargarAjustes();
   }

  guardarAjustes ( ) {
    // console.log('Guardado al localstorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes () {

    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargado del localstorage');

      this.aplicarTema( this.ajustes.tema );
    }else {
      // console.log('Usando valores por defecto');
      this.aplicarTema( this.ajustes.tema);

    }
  }

  aplicarTema( tema: string ) {

    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.termaUrl = url;

    this.guardarAjustes();
  }

}

 interface Ajustes {
   termaUrl: string;
   tema: string;
  }
