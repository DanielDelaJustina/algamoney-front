import { Component, OnInit, ErrorHandler } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from './lancamento';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import toastr from 'toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  inSalve = false;
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamentos = new Lancamento();
  id;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandler,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();

    this.router.paramMap.subscribe((params) => this.id = params.get('id'));

    this.carregarLancamento();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => {
        return {label: c.nome, value: c.id };
      });
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.content.map(c => {
        return {label: c.nome, value: c.id };
      });
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  carregarLancamento() {
    if (this.id != null) {
      this.lancamentoService.buscarPorId(this.id)
      .then(lancamento => {
        this.lancamentos = this.lancamentoService.converterStringsParaDatas([lancamento])[0];
      })
      .catch(erro => this.errorHandler.handleError(erro));
    }
  }

  isEditando() {
    return this.id > 0;
  }

  salvar(form: FormControl) {
    this.isEditando() ? this.atualizarLancamento(form) : this.novoLancamento(form);
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamentos)
    .then(lancamento => {
      this.lancamentos = this.lancamentoService.converterStringsParaDatas([lancamento])[0];
      toastr.success(`Lancamento ${lancamento.descricao}, atualizado com sucesso!`);
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  novoLancamento(form: FormControl) {
    this.inSalve = true;
    this.lancamentoService.adicionar(this.lancamentos)
    .then((res) => {
      console.log(res);
      toastr.success(`Lancamento ${res.descricao}, adicionado com sucesso!`);
      form.reset();
      this.lancamentos = new Lancamento();
    })
    .catch(erro => this.errorHandler.handleError(erro))
    .finally(() =>
      this.inSalve = false
    );
  }

}
