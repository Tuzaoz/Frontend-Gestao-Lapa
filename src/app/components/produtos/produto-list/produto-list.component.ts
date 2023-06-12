import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Produto} from "../../../models/produto";
import {ProdutoService} from "../../../services/produto.service";
import {MatDialog} from "@angular/material/dialog";
import {ProdutoAddComponent} from "../produto-add/produto-add.component";
import {MatSort} from "@angular/material/sort";
import {ProdutoUpdateComponent} from "../produto-update/produto-update.component";
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-tecnico-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

   ELEMENT_DATA: Produto[] = [];
  constructor(
    private service: ProdutoService,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = ['id','name', 'categoria', 'quantidade', 'valor', 'acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  openDialog(): void {
    const dialogRef = this.dialog.open(ProdutoAddComponent, {width: '500px'});
  }
  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(ProdutoUpdateComponent, {width: '500px',
    data: id});
  }
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Produto>(resposta)
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

