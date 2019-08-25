import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { FormControl } from '@angular/forms';
import { Pessoa } from '../pessoa';
import toastr from 'toastr';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  inSalve = false;
  pessoas = new Pessoa();
  id;

  constructor(
    private errorHandler: ErrorHandler,
    private pessoaService: PessoaService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params) => this.id = params.get('id'));
    this.carregarPessoas();
  }

  isEditando() {
    return this.id > 0;
  }

  carregarPessoas() {
    if (this.id != null) {
      return this.pessoaService.buscarPorId(this.id)
      .then(pessoa => {
        this.pessoas = pessoa;
      })
      .catch(erro => this.errorHandler.handleError(erro));
    }
  }

  salvar(form: FormControl) {
    this.isEditando() ? this.atualizarPessoa(form) : this.novaPessoa(form);
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoas)
    .then(pessoa => {
      this.pessoas = pessoa;
      toastr.success(`Lancamento ${pessoa.nome}, atualizado com sucesso!`);
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  novaPessoa(form: FormControl) {
    this.inSalve = true;
    this.pessoaService.adicionar(this.pessoas)
    .then((res) => {
      toastr.success(`Pessoa adicionada com sucesso!`);
      form.reset();
      this.pessoas = new Pessoa();
    })
    .catch(erro => this.errorHandler.handleError(erro))
    .finally(() =>
      this.inSalve = false
    );
  }
}
