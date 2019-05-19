import { Injectable } from '@angular/core';
import toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handle(errorResponse: any) {
    let msg = '';

    if (errorResponse.status >= 400 && errorResponse.status <= 499) {
        msg = errorResponse.error.length > 0 ? errorResponse.error[0].msgUser : '' ;
    }

    msg = msg === '' ? 'Erro ao buscar serviço' : msg;
    toastr.error(msg);
  }
}
