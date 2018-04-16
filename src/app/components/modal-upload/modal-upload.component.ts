import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  img: string;
  imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadSevice: ModalUploadService) {
  }

  ngOnInit() {
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, '', this._modalUploadSevice.id)
    .then( (resp: any) => {

      console.log( resp );
      this._modalUploadSevice.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga!!');
    });
  }

  cerrarModal( ) {
    this.imagenTemp = null;
    this.subirImagen = null;

    this._modalUploadSevice.ocultarModal();
  }


  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal( 'Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error' );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // esto jscript puro y hace que aparezca la imagen en el preload
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

}
