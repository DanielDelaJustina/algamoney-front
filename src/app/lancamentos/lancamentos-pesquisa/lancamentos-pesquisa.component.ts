import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent  implements OnInit {

  lancamentos = [];
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  constructor(private lancamentoService: LancamentoService) {  }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    const lancamentoFiltro: LancamentoFiltro = {descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim };

    this.lancamentoService.pesquisar(lancamentoFiltro)
      .then((data) => {
        this.lancamentos = data.content;
      }
    );
  }
}
