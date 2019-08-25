import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from './pessoa';

export class PessoasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasURL = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoasFiltro): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      }),
      params: new HttpParams()
              .set('nome', filtro.nome ? filtro.nome : '')
              .set('page', filtro.pagina.toString())
              .set('size', filtro.itensPorPagina.toString())
    };
    return this.http.get(`${this.pessoasURL}`, httpOptions)
      .toPromise();
  }

  listarTodas(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };
    return this.http.get(`${this.pessoasURL}`, httpOptions)
      .toPromise();
  }

  excluir(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.delete(`${this.pessoasURL}/${id}`, httpOptions)
    .toPromise();
  }

  mudarStatus(id: number, ativo: boolean) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })};

    return this.http.put(`${this.pessoasURL}/${id}/ativo`, ativo,  httpOptions )
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.post(this.pessoasURL,
                          JSON.stringify(pessoa),
                          httpOptions)
    .toPromise()
    .then();
  }

  atualizar(pessoa: Pessoa): Promise<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.put(`${this.pessoasURL}/${pessoa.id}`,
                          JSON.stringify(pessoa),
                          httpOptions)
    .toPromise()
    .then();

  }

  buscarPorId(id: number): Promise<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };
    return this.http.get(`${this.pessoasURL}/${id}`, httpOptions)
    .toPromise();
  }
}
