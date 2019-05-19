import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import toastr from 'toastr';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [];
  total: number;
  filtro = new LancamentoFiltro();
  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService) {  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then((data) => {
        this.lancamentos = data.content;
        this.total = data.totalElements;
      }
    )
    .catch((error) => {
      this.errorHandler.handle(error);
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento) {

    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o registro?',
      accept: () => {
        this.lancamentoService.excluir(lancamento.id)
        .then(() => {
          this.grid.first = 0;
          this.pesquisar(0);
          toastr.success('Exclussão realizada com sucesso!');
        })
        .catch((error) => {
          this.errorHandler.handle(error);
        });
      }
    });
  }
}
