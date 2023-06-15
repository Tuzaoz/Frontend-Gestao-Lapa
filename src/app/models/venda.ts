import {Produto} from "./produto";
import {Cliente} from "./cliente";

export interface Venda{
  id?:any;
  cliente: Cliente;
  metodoPag: string;
  valor:number;
  produtos: Produto[];
  data: Date;

}
