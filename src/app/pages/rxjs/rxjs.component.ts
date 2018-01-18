import { Component, OnInit } from '@angular/core';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {


      this.regresaObservable()
        .subscribe(
        numero => console.log('Subs', numero ),
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino'));
  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {

      let contador = 0;

      let intervalo = setInterval( () => {
        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Auxilio');
        // }

      }, 1000);

    })
    .retry(2)
    .map((res: any) => {
      return res.valor;
    }).filter( (valor, index) => {

      if ( (valor % 2) === 1) {
        // return impar
        return true;
      }else {
        // par
        return false;
      }

      console.log('filter', valor, index);
      return true;
    });
  }

}
