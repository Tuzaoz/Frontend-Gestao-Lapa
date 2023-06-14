import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProdutoListComponent} from "../produto-list/produto-list.component";
import {ProdutoService} from "../../../services/produto.service";
import {Produto} from "../../../models/produto";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit{
  produto: Produto ={
    id: null,
    name: '',
    categorias: '',
    quantidade: null,
    valor: null,
  }
  constructor( public dialogRef: MatDialogRef<ProdutoListComponent>,
               private produtoService: ProdutoService,
               private toast:    ToastrService,
               private router:          Router,
               @Inject(MAT_DIALOG_DATA) public data: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.produtoService.findById(this.data).subscribe(resposta => {
      this.produto.id = resposta.id;
      this.produto.name = resposta.name;
      this.produto.valor = resposta.valor;
      this.produto.quantidade = resposta.quantidade;
      switch (resposta.categorias) {
        case 'RAÇÕES':
          this.produto.categorias = '0';
          break;
        case 'GRANEL':
          this.produto.categorias = '1';
          break;
        case 'ACESSÓRIOS':
          this.produto.categorias = '2';
          break;
        case 'MEDICAMENTOS':
          this.produto.categorias = '3';
          break;
        case 'INSETICIDAS':
          this.produto.categorias = '4';
          break;
        case 'VERMÍFUGO':
          this.produto.categorias = '5';
          break;
        case 'ANTIPULGAS':
          this.produto.categorias = '6';
          break;
        default:
      }
    })
  }
}
