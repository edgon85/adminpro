import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  constructor() { }

  menu: any = [
    {
      titulo: 'principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'ProgressBar', url: '/progress'},
        { titulo: 'Gráficas', url: '/graphics1'},
        { titulo: 'promesas', url: '/promesas'},
        { titulo: 'RxJs', url: '/rxjs'}
      ]
    }
  ];
}
