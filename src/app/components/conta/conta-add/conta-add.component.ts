import { Component } from '@angular/core';
import {Conta} from "../../../models/conta";
import {MatDialogRef} from "@angular/material/dialog";
import {ContaListComponent} from "../../conta/conta-list/conta-list.component";
import {ContaService} from "../../../services/conta.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conta-add',
  templateUrl: './conta-add.component.html',
  styleUrls: ['./conta-add.component.css']
})
export class ContaAddComponent {
  conta: Conta ={
    id: null,
    nomeConta: '',
    valor: null,
    data: new Date()
  }
  constructor(
    public dialogRef: MatDialogRef<ContaListComponent>,
    private contaService: ContaService,
    private toast:    ToastrService,
    private router:          Router,
  ) {}

  create(): void {
    this.contaService.create(this.conta).subscribe(() => {
      this.toast.success('Conta cadastrado com sucesso', 'Cadastro');
      this.dialogRef.close()
      this.router.navigate(['vendas']).then(r => this.router.navigate(['contas']))
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
