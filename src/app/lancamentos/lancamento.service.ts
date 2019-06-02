import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Lancamento } from './lancamento-cadastro/lancamento';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
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
      params: new HttpParams()
              .set('descricao', filtro.descricao ? filtro.descricao : '')
              .set('page', filtro.pagina.toString())
              .set('size', filtro.itensPorPagina.toString())
              .set('dataVencimentoDe', filtro.dataVencimentoInicio ?
                  moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') : '1900-01-01')
              .set('dataVencimentoAte', filtro.dataVencimentoFim ?
                  moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') : '2999-01-01')
    };
    return this.http.get(`${this.lancamentosURL}?resumo`, httpOptions)
      .toPromise();
  }

  excluir(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };
    return this.http.delete(`${this.lancamentosURL}/${id}`, httpOptions)
    .toPromise();
  }

  adicionar(lancamento: Lancamento): Promise<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.post(this.lancamentosURL,
                          JSON.stringify(lancamento),
                          httpOptions)
    .toPromise()
    .then();
  }
}
