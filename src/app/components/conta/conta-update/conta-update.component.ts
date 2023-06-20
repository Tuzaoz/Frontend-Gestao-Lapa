import {Component, Inject} from '@angular/core';
import {Conta} from "../../../models/conta";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContaListComponent} from "../../conta/conta-list/conta-list.component";
import {ContaService} from "../../../services/conta.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conta-update',
  templateUrl: './conta-update.component.html',
  styleUrls: ['./conta-update.component.css']
})
export class ContaUpdateComponent {
  conta: Conta ={
    id: null,
    nomeConta: '',
    valor: null,
    data: ''
  }
  constructor( public dialogRef: MatDialogRef<ContaListComponent>,
               private contaService: ContaService,
               private toast:    ToastrService,
               private router:          Router,
               @Inject(MAT_DIALOG_DATA) public data: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  update(): void {
    this.contaService.update(this.conta).subscribe(() => {
      this.toast.success('Conta atualizado com sucesso', 'Atualização');
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
  ngOnInit(): void {
    this.contaService.findById(this.data).subscribe(resposta => {
      this.conta.id = resposta.id;
      this.conta.nomeConta = resposta.nomeConta;
      this.conta.valor = resposta.valor;
      this.conta.data = resposta.data;
    })
  }

}
