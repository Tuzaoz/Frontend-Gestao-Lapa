import {Component, OnInit, ViewChild} from '@angular/core';
import {Venda} from "../../../models/venda";
import {VendaService} from "../../../services/venda.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {VendasAddComponent} from "../../vendas/vendas-add/vendas-add.component";
import {VendasUpdateComponent} from "../../vendas/vendas-update/vendas-update.component";
import {Produto} from "../../../models/produto";
import {ProdutoService} from "../../../services/produto.service";

@Component({
  selector: 'app-vendas-list',
  templateUrl: './vendas-list.component.html',
  styleUrls: ['./vendas-list.component.css']
})
export class VendasListComponent implements OnInit{
  ELEMENT_DATA: Venda[] = [];
  constructor(
    private service: VendaService,
    public dialog: MatDialog,
  ) {}
  displayedColumns: string[] = ['id','cliente', 'produtos', 'valor', 'metodoPag', 'acoes'];
  dataSource = new MatTableDataSource<Venda>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort


  openDialog(): void {
    const dialogRef = this.dialog.open(VendasAddComponent, {width: '500px'});
  }
  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(VendasUpdateComponent, {width: '500px',
      data: id});
  }
  findHoje(){
    this.service.findHoje().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Venda>(resposta)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    this.findHoje();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
