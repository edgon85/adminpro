import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS, URL_GENERAL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: any, tipo: string = 'usuario'): any {

    let url = URL_GENERAL + 'media/';

    if ( !img ) {
      return url + 'Images/None/no-img.jpg';
    }

    if ( img.indexOf('http') >= 0 || img.indexOf('https') >= 0) {
      return img;
    }

    // switch ( tipo ) {

    //   case 'Usuario':
    //     url += 'Images/User/' + img;
    //     // http://127.0.0.1:8000/media/http://127.0.0.1:8000/media/Images/User/gorrito_Wnddviz.jpg

    //     console.log(url);
    //   break;

    //   case 'Hospital':
    //     url += 'Images/Hospital/' + img;
    //   break;

    //   case 'Doctor':
    //     url += 'Images/Doctor/' + img;
    //   break;

    //   default:
    //     console.log('Tipo de imagen no existe');
    //     url += 'Images/None/no-img.jpg';
    //     console.log(url);
    // }

    return url;

  }

}
