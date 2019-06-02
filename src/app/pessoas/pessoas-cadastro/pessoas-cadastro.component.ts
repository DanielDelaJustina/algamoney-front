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

  constructor(
    private errorHandler: ErrorHandler,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.inSalve = true;
    this.pessoaService.adicionar(this.pessoas)
    .then((res) => {
      console.log(res);
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
