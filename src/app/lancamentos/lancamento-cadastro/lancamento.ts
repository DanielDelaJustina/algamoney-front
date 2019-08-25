import { Categoria } from 'src/app/categorias/categoria';
import { Pessoa } from 'src/app/pessoas/pessoa';

export class Lancamento {
    id: number;
    descricao: string;
    datavencimento: Date;
    datapagamento: Date;
    valor: number;
    observacao: string;
    tipo: 'DESPESA';
    categoria = new Categoria();
    pessoa = new Pessoa();
}
