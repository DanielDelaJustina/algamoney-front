import { Component, OnInit, ErrorHandler } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from './lancamento';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import toastr from 'toastr';

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

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
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

  salvar(form: FormControl) {
    this.inSalve = true;
    this.lancamentoService.adicionar(this.lancamentos)
    .then((res) => {
      console.log(res);
      toastr.success(`Lancamento ${res.descricao} - ${res.id} adicionado com sucesso!`);
      form.reset();
      this.lancamentos = new Lancamento();
    })
    .catch(erro => this.errorHandler.handleError(erro))
    .finally(() =>
      this.inSalve = false
    );
  }

}
