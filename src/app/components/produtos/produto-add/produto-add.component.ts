import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProdutoListComponent} from "../produto-list/produto-list.component";
import {Produto} from "../../../models/produto";
import {ProdutoService} from "../../../services/produto.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.component.html',
  styleUrls: ['./produto-add.component.css']
})
export class ProdutoAddComponent {
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
