import { Component } from '@angular/core';
import {Produto} from "../../../models/produto";
import {MatDialogRef} from "@angular/material/dialog";
import {ProdutoListComponent} from "../../produtos/produto-list/produto-list.component";
import {ProdutoService} from "../../../services/produto.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conta-add',
  templateUrl: './conta-add.component.html',
  styleUrls: ['./conta-add.component.css']
})
export class ContaAddComponent {
  produto: Produto ={
    id: null,
    name: '',
    categorias: '',
    quantidade: null,
    valor: null,
  }
  constructor(
    public dialogRef: MatDialogRef<ProdutoListComponent>,
    private produtoService: ProdutoService,
    private toast:    ToastrService,
    private router:          Router,
  ) {}

  create(): void {
    this.produtoService.create(this.produto).subscribe(() => {
      this.toast.success('Produto cadastrado com sucesso', 'Cadastro');
      this.dialogRef.close()
      this.router.navigate(['home']).then(r => this.router.navigate(['produtos']))
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
}
