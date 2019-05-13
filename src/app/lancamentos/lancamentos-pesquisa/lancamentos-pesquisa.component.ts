import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent  implements OnInit {

  lancamentos = [];
  total: number;
  filtro = new LancamentoFiltro();

  constructor(private lancamentoService: LancamentoService) {  }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.lancamentoService.pesquisar(this.filtro)
      .then((data) => {
        this.lancamentos = data.content;
        this.total = data.totalElements;
      }
    );
  }
}
