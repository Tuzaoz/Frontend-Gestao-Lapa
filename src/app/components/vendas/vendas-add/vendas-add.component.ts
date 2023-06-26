import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {NavComponent} from "../../nav/nav.component";
import {MatDialogRef} from "@angular/material/dialog";
import {ClientesListComponent} from "../../clientes/clientes-list/clientes-list.component";
import {ClienteService} from "../../../services/cliente.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Venda} from "../../../models/venda";
import {Produto} from "../../../models/produto";
import {VendaService} from "../../../services/venda.service";
import {VendasListComponent} from "../vendas-list/vendas-list.component";
import {ProdutoService} from "../../../services/produto.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap} from "rxjs";
import {API_CONFIG} from "../../../config/api.config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-vendas-add',
  templateUrl: './vendas-add.component.html',
  styleUrls: ['./vendas-add.component.css']
})
export class VendasAddComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<VendasListComponent>,
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private toast:    ToastrService,
    private router:          Router,
    private fb : FormBuilder,
    private clienteService: ClienteService,
  ) {}
  venda: Venda ={
    id: null,
    nomeCliente: null,
    metodoPagamento: 'Pix',
    itemVenda: [],
    valor:0.0,
    data: this.getFormattedDate(new Date())
  }
  itemVenda;
  idCliente;
  idprodutosSelecionados: any[];
  idproduto: number;
  quantidade:number = 1;
  produtosDisponiveis: any[];
  clientes: any[]
  produtosSelecionados: any[] = [];
  totalProdutosSelecionados:number = 0;
  produtosEnviar: any[] = [];
  filteredClientes: any[];
  filteredOptions: any[];
  pesquisa: FormControl = new FormControl();
  pesquisaCliente: FormControl = new FormControl();
  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  findClientes() {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
      this.filteredClientes = resposta;
    })
  }

  findProdutos() {
    this.produtoService.getData().subscribe(resposta => {
        this.produtosDisponiveis = resposta;
        this.filteredOptions = resposta;
    })
  }
  create(): void {
    const cliente = new Cliente(this.idCliente);
    let produtos: Produto[]=[]
    this.venda.nomeCliente = cliente;
    console.log(this.idproduto);
    this.venda.itemVenda = this.produtosEnviar;
    this.vendaService.create(this.venda).subscribe(() => {
      this.toast.success('Venda cadastrada com sucesso', 'Cadastro');
      this.dialogRef.close()
      this.router.navigate(['contas']).then(r => this.router.navigate(['vendas']))
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }

    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.findProdutos()
    this.findClientes()

    this.pesquisa.valueChanges.subscribe(response => {
      this.filtrarProdutos(response);
    });
    this.pesquisaCliente.valueChanges.subscribe(response => {
      this.filtrarClientes(response);
    });
  }
  filtrarProdutos(value) {
      this.filteredOptions = this.produtosDisponiveis.filter(produto => {
        return produto.nome.toLowerCase().indexOf(value.toLowerCase()) > -1 });

  }
  filtrarClientes(value) {
    this.filteredClientes = this.clientes.filter(cliente => {
      return cliente.nome.toLowerCase().indexOf(value.toLowerCase()) > -1 });

  }
  displayFnClientes(options: any[]): (id: number) => string {
    return (id: number) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.nome : '';
    }
  }
  displayFn(options: any[]): (id: number) => string {
    return (id: number) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.nome : '';
    }
  }


  adicionarProduto() {
    let produto: Produto
    this.produtoService.findById(this.idproduto).subscribe(
      response => {
        produto = response;
        this.totalProdutosSelecionados=0;
        this.produtosSelecionados.push([produto.name, this.quantidade, produto.valor]);
        for (const item of this.produtosSelecionados) {
          this.totalProdutosSelecionados += item[1]*item[2];
        }
        this.produtosEnviar.push({produto: produto, quantidadeProduto: this.quantidade});
        this.idproduto = null;
        this.quantidade = 1;
      }
    )

  }

  excluirItem(i: number) {
    this.produtosSelecionados.splice(i, 1);
    this.produtosEnviar.splice(i, 1);

    this.totalProdutosSelecionados = 0;
    for (const item of this.produtosSelecionados) {
      this.totalProdutosSelecionados += item[1]*item[2];
    }

  }
}
