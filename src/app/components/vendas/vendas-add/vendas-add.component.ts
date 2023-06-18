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
  public produtosDisponiveis: any[];
  filteredOptions: any[];
  formGroup : FormGroup;
  pesquisa: FormControl = new FormControl();


  findProdutos() {
    this.produtoService.getData().subscribe(resposta => {
        this.produtosDisponiveis = resposta;
        this.filteredOptions = resposta;
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
    // this.initForm()
    this.findProdutos()

    this.pesquisa.valueChanges.subscribe(response => {
      console.log('data is ', response);
      this.filtrarProdutos(response);
    });
  }
  filtrarProdutos(value) {
      this.filteredOptions = this.produtosDisponiveis.filter(produto => {
        return produto.nome.toLowerCase().indexOf(value.toLowerCase()) > -1 });

  }

  displayFn(options: any[]): (id: number) => string {
    return (id: number) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.nome : '';
    }
  }

  // private initForm() {
  //   this.formGroup = this.fb.group({
  //     'pesquisa' : ['']
  //   })
  //   this.formGroup.get('pesquisa').valueChanges.subscribe(response => {
  //     console.log('data is ', response);
  //     this.filtrarProdutos(response);
  //   })
  // }
}
