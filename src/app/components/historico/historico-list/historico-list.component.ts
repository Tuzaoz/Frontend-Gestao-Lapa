import {Component, NgModule, OnInit, ViewChild} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HistoricoService} from "../../../services/historico.service";
import {CurrencyPipe, DatePipe, formatDate} from "@angular/common";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatDateFormats, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS, DateAdapter} from '@angular/material/core';

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
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS },
  ]
})
export class HistoricoListComponent implements OnInit{
  dataInicio: string;
  dataFim: string;
  ELEMENT_DATA: any[] = [];
  constructor(
    private service: HistoricoService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private readonly adapter: DateAdapter<Date>
  ) {this.adapter.setLocale("pt-BR")}
  displayedColumns: string[] = ['data', 'total_pix','total_dinheiro',  'total_cartao_cred','total_cartao_deb','total_venda', 'total_conta' ];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<any>(resposta);
      this.dataSource.sort = this.sort;

    })
  }
  calcularTotal(): number {
    let total = 0;
    for (const dado of this.ELEMENT_DATA) {
      total += dado.total_venda;
    }
    return total;
  }
  calcularTotalPix(): number {
    let total = 0;
    for (const dado of this.ELEMENT_DATA) {
      total += dado.total_pix;
    }
    return total;
  }
  calcularTotalDinheiro(): number {
    let total = 0;
    for (const dado of this.ELEMENT_DATA) {
      total += dado.total_dinheiro;
    }
    return total;
  }
  calcularTotalCredito(): number {
    let total = 0;
    for (const dado of this.ELEMENT_DATA) {
      total += dado.total_cartao_cred;
    }
    return total;
  }
  calcularTotalDeb(): number {
    let total = 0;
    for (const dado of this.ELEMENT_DATA) {
      total += dado.total_deb;
    }
    return total;
  }
  calcularTotalConta(): number {
    let total = 0;
    for (const dado of this.ELEMENT_DATA) {
      total += dado.total_conta;
    }
    return total;
  }

  ngOnInit(): void {

    this.findAll();

  }
  formatDate2(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
  addEventInicio(event: MatDatepickerInputEvent<Date>) {
    this.dataInicio = this.formatDate2(event.value.toISOString());
    console.log(this.dataInicio);
  }
  addEventFim(event: MatDatepickerInputEvent<Date>) {
    this.dataFim = this.formatDate2(event.value.toISOString());
    console.log(this.dataFim);
  }
  aplicarFiltro(){
    console.log(`Aplica Filtro dataInicio ${this.dataInicio} dataFim ${this.dataFim}` )
    this.service.findByRange(this.dataInicio, this.dataFim).subscribe(response =>{
      this.ELEMENT_DATA = [];
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<any>(response);

      }


    )
  }
}
