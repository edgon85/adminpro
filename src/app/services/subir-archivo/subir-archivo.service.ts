import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
@Injectable()
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest(); // inicializar peticion ajax

      // configuracion del form data
      formData.append('img', archivo, archivo.name);

      // configurar la peticion ajax
      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4) {
          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse(xhr.response));
          } else {
            reject( xhr.response );
          }
        }
      };

      let url = URL_SERVICIOS + 'user_profile/' + id + '/';
      let token = localStorage.getItem('token');



      xhr.open('PUT', url, true );
      xhr.setRequestHeader('Authorization', 'JWT ' + token);
      xhr.send( formData );

    });
  }

}
