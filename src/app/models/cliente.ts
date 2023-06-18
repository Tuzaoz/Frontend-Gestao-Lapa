export class Cliente {
  id: number;
  nome: string;
  fone: string;
  dataCriacao: Date;
  dataAniversario: string;
  vendas?: any[];

  constructor(id: number) {
    this.id = id;
  }
}
