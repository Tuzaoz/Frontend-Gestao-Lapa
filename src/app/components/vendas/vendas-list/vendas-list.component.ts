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
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats} from "@angular/material/core";

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};
@Component({
  selector: 'app-vendas-list',
  templateUrl: './vendas-list.component.html',
  styleUrls: ['./vendas-list.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS },
  ]
})
export class VendasListComponent implements OnInit{
  ELEMENT_DATA: Venda[] = [];
  constructor(
    private service: VendaService,
    public dialog: MatDialog,
    private readonly adapter: DateAdapter<Date>
  ) {this.adapter.setLocale("pt-BR")}
  displayedColumns: string[] = ['id','nomeCliente', 'produto', 'valor', 'metodoPagamento', 'acoes'];
  dataSource = new MatTableDataSource<Venda>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  dataHead:string = this.formatDate(this.formatDate2(new Date().toISOString()));
  dataBusca:string

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
  }
  aplicarFiltro(){
    this.service.findByDate(this.dataBusca).subscribe(response =>{
        this.ELEMENT_DATA = [];
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataHead = '';
        this.dataHead = this.formatDate(this.dataBusca);

      }


    )
  }

  calcularNumeroVendas(): number {
    let cont = 0;
    for (const dado of this.ELEMENT_DATA) {
      cont++
    }
    return cont;
  }
  calcularTotal(): number {
    let total = 0;

    for (const dado of this.ELEMENT_DATA) {
      total += dado.valor;

    }

    return total;
  }
}
