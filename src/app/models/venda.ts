import {Produto} from "./produto";
import {Cliente} from "./cliente";

export class Venda {
  id?: any;
  nomeCliente: Cliente;
  metodoPagamento: string;
  valor: number;
  produto: Produto[];
  data: Date;
}


