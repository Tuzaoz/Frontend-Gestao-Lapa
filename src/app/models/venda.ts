import {Produto} from "./produto";
import {Cliente} from "./cliente";
import {ItemVenda} from "./itemVenda";

export class Venda {
  id?: any;
  nomeCliente: Cliente;
  metodoPagamento: string;
  valor: number;
  itemVenda: ItemVenda[];
  data: string;
}


