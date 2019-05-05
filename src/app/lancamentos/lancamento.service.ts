import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  lancamentosURL = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      }),
      params: new HttpParams().set('descricao', filtro.descricao ? filtro.descricao : '')
              .set('dataVencimentoDe', filtro.dataVencimentoInicio ?
               moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') : '1900-01-01')
              .set('dataVencimentoAte', filtro.dataVencimentoFim ?
               moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') : '2999-01-01')
    };
    return this.http.get(`${this.lancamentosURL}?resumo`, httpOptions)
      .toPromise();
  }
}
