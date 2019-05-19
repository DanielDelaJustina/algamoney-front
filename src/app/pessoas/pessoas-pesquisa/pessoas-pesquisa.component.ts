import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoasFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import toastr from 'toastr';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [];
  total: number;
  filtro = new PessoasFiltro();
  @ViewChild('tabela') grid;

  constructor(private pessoasService: PessoaService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService) {  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoasService.pesquisar(this.filtro)
      .then((data) => {
        this.pessoas = data.content;
        this.total = data.totalElements;
      }
    );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(pessoa) {

    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o registro?',
      accept: () => {
        this.pessoasService.excluir(pessoa.id)
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

  mudarStatus(pessoa) {
    this.pessoasService.mudarStatus(pessoa.id, !pessoa.ativo)
      .then(() => {
        toastr.success('Mudança de status foi realizada com sucesso!');
        pessoa.ativo = !pessoa.ativo;
      }
    )
    .catch((error) => {
      this.errorHandler.handle(error);
    });
  }
}
