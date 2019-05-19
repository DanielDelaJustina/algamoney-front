import { Injectable } from '@angular/core';
import toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handle(errorResponse: any) {
    let msg: string;

    if (errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao buscar serviço';
    }
    toastr.error(msg);
  }
}
