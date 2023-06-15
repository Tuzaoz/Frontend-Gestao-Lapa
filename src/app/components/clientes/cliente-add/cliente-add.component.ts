import { Component } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {MatDialogRef} from "@angular/material/dialog";
import {ClienteService} from "../../../services/cliente.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ClientesListComponent} from "../clientes-list/clientes-list.component";
import {NavComponent} from "../../nav/nav.component";

@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styleUrls: ['./cliente-add.component.css']
})
export class ClienteAddComponent {
  cliente: Cliente ={
    id: null,
    nome: '',
    fone: '',
    dataCriacao: new Date(),
    dataAniversario: NavComponent.hoje,
  }
  constructor(
    public dialogRef: MatDialogRef<ClientesListComponent>,
    private clienteService: ClienteService,
    private toast:    ToastrService,
    private router:          Router,
  ) {}

  create(): void {
    this.clienteService.create(this.cliente).subscribe(() => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.dialogRef.close()
      this.router.navigate(['home']).then(r => this.router.navigate(['clientes']))
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
