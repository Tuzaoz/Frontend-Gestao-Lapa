export interface Cliente {
  id: number;
  nome: string;
  fone: string;
  dataCriacao: Date;
  dataAniversario: string;
  vendas?: any[];
}
