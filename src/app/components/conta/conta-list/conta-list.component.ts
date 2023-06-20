import {Component, ViewChild} from '@angular/core';
import {Conta} from "../../../models/conta";
import {ContaService} from "../../../services/conta.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContaAddComponent} from "../../conta/conta-add/conta-add.component";
import {ContaUpdateComponent} from "../../conta/conta-update/conta-update.component";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {GRI_DATE_FORMATS} from "../../vendas/vendas-list/vendas-list.component";

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS },
  ]
})
export class ContaListComponent {

  ELEMENT_DATA: Conta[] = [];
  constructor(
    private service: ContaService,
    public dialog: MatDialog,

    private readonly adapter: DateAdapter<Date>

  ) {this.adapter.setLocale("pt-BR")}
  displayedColumns: string[] = ['id','nomeConta', 'valor', 'data', 'acoes'];
  dataSource = new MatTableDataSource<Conta>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  dataBusca:string;
  dataHead: string;


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
  formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  formatDate2(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.dataBusca = this.formatDate2(event.value.toISOString());
    this.aplicarFiltro();
    console.log(this.dataBusca);
  }
  aplicarFiltro(){
    this.service.findByDate(this.dataBusca).subscribe(response =>{
        this.ELEMENT_DATA = [];
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataHead = this.formatDate(this.dataBusca);
      }


    )
  }

}
