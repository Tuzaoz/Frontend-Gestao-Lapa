import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientesListComponent} from "../../clientes/clientes-list/clientes-list.component";
import {ClienteService} from "../../../services/cliente.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Cliente} from "../../../models/cliente";
import {NavComponent} from "../../nav/nav.component";

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit{
  cliente: Cliente ={
    id: null,
    nome: '',
    fone: '',
    dataCriacao: new Date(),
    dataAniversario: '',
  }
  constructor(public dialogRef: MatDialogRef<ClientesListComponent>,
              private clienteService: ClienteService,
              private toast:    ToastrService,
              private router:          Router,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  update(): void {
    this.clienteService.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'Atualização');
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
  ngOnInit(): void {
    this.clienteService.findById(this.data).subscribe(resposta => {
      this.cliente.id = resposta.id;
      this.cliente.nome = resposta.nome;
      this.cliente.fone = resposta.fone;
      this.cliente.dataAniversario = resposta.dataAniversario;
    })
  }

}
