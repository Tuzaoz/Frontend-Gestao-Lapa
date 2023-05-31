import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Produto} from "../../../models/produto";
import {ProdutoService} from "../../../services/produto.service";
import {MatDialog} from "@angular/material/dialog";
import {ProdutoAddComponent} from "../produto-add/produto-add.component";

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit{
   ELEMENT_DATA: Produto[] = [];
  constructor(
    private service: ProdutoService,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = ['name', 'categoria', 'quantidade', 'valor', 'acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  openDialog(): void {
    const dialogRef = this.dialog.open(ProdutoAddComponent, {width: '500px'});
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Produto>(resposta);
    })
  }

  ngOnInit(): void {
    this.findAll();
  }
}

