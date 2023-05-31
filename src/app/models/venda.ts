import {Produto} from "./produto";

export interface Venda{
  id?:any;
  cliente:string;
  metodoPag: string;
  valor:number;
  produtos: string[];

}
