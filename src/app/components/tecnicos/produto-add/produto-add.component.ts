import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProdutoListComponent} from "../produto-list/produto-list.component";

@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.component.html',
  styleUrls: ['./produto-add.component.css']
})
export class ProdutoAddComponent {
  constructor(
    public dialogRef: MatDialogRef<ProdutoListComponent>
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
