import {Component, ViewChild} from '@angular/core';
import {Conta} from "../../../models/conta";
import {ContaService} from "../../../services/conta.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContaAddComponent} from "../../conta/conta-add/conta-add.component";
import {ContaUpdateComponent} from "../../conta/conta-update/conta-update.component";

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css']
})
export class ContaListComponent {

  ELEMENT_DATA: Conta[] = [];
  constructor(
    private service: ContaService,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = ['id','nomeConta', 'valor', 'data', 'acoes'];
  dataSource = new MatTableDataSource<Conta>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  openDialog(): void {
    const dialogRef = this.dialog.open(ContaAddComponent, {width: '500px'});
  }
  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(ContaUpdateComponent, {width: '500px',
      data: id});
  }
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Conta>(resposta)
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
