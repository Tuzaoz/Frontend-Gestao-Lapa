import {Component, OnInit, ViewChild} from '@angular/core';
import {Produto} from "../../../models/produto";
import {ProdutoService} from "../../../services/produto.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProdutoAddComponent} from "../../produtos/produto-add/produto-add.component";
import {ProdutoUpdateComponent} from "../../produtos/produto-update/produto-update.component";
import {Cliente} from "../../../models/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {ClienteAddComponent} from "../cliente-add/cliente-add.component";

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit{
  ELEMENT_DATA: Cliente[] = [];
  constructor(
    private service: ClienteService,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = ['id','nome', 'fone', 'dataAniversario', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  openDialog(): void {
    const dialogRef = this.dialog.open(ClienteAddComponent, {width: '500px'});
  }
  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(ProdutoUpdateComponent, {width: '500px',
      data: id});
  }
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(resposta)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {

    this.findAll();


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

