import { HttpHeaders } from '@angular/common/http';

export const URL_SERVICIOS   = 'http://127.0.0.1:8000/api/';
export const URL_GENERAL     = 'http://127.0.0.1:8000/';


let token = localStorage.getItem('token');

export const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + token
      })
    };
