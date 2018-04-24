import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS, URL_GENERAL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: any, tipo: string = 'user_profile'): any {

    let url = URL_GENERAL + 'media/Images/';

    if ( !img ) {
      return url + 'None/no-img.jpg';
    }

    if ( img.indexOf('http') >= 0 || img.indexOf('https') >= 0) {
      return img;
    }

    switch ( tipo ) {

      case 'user_profile':
        url += 'User/' + img;
        // http://127.0.0.1:8000/media/Images/User/gorrito_Wnddviz.jpg

        console.log(url);
      break;

      case 'hospital':
        url += 'Hospital/' + img;
      break;

      case 'doctor':
        url += 'Doctor/' + img;
      break;

      default:
        console.log('Tipo de imagen no existe');
        url += 'None/no-img.jpg';
        console.log(url);
    }

    return url;

  }

}
