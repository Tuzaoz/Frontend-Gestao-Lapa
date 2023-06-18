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
import {FormControl, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
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
    private http: HttpClient,

  ) {}
  venda: Venda ={
    id: null,
    nomeCliente: null,
    metodoPagamento: '',
    valor:null,
    produto: [],
    data: new Date(),
  }
  // implementação select dinamico
  public produtosDisponiveis: Produto[] = [];
  myControl = new FormControl(null, [Validators.required]);
  filteredOptions: Observable<Produto[]>;
  findProdutos() {
    this.produtoService.findAll().subscribe(resposta => {
        this.produtosDisponiveis = resposta;
      })
  }



  create(): void {
    this.vendaService.create(this.venda).subscribe(() => {
      this.toast.success('Venda cadastrada com sucesso', 'Cadastro');
      this.dialogRef.close()
      this.router.navigate(['home']).then(r => this.router.navigate(['vendas']))
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
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string) {
    return this.produtosDisponiveis.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }
  displayFn(produtos):string{
    return produtos ? produtos.nome : undefined;
  }


}
