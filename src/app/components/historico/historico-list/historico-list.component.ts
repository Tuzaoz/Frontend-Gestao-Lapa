import {Component, NgModule, OnInit, ViewChild} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HistoricoService} from "../../../services/historico.service";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";


@Component({
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css']
})

export class HistoricoListComponent implements OnInit{
  dataInicio: Date;
  dataFim: Date;
  ELEMENT_DATA: any[] = [];
  constructor(
    private service: HistoricoService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  dataInicioSelecionada(event: MatDatepickerInputEvent<Date>) {
    this.dataInicio = event.value;
    this.aplicarFiltro();
    console.log(this.dataInicio)
  }

  dataFimSelecionada(event: MatDatepickerInputEvent<Date>) {
    this.dataFim = event.value;
    this.aplicarFiltro();
    console.log(this.dataFim)
  }
  aplicarFiltro() {
    if (this.dataInicio && this.dataFim) {
      const dataInicioFiltro = new Date(this.dataInicio);
      dataInicioFiltro.setHours(0, 0, 0, 0);

      const dataFimFiltro = new Date(this.dataFim);
      dataFimFiltro.setHours(23, 59, 59, 999);

      // Acione aqui a sua requisição ao servidor passando o novo range de datas
      this.suaRequisicaoAoServidor(dataInicioFiltro, dataFimFiltro);
    } else {
      // Caso as datas não estejam definidas, exibe todos os dados originais
      this.dataSource = this.dataSource;
    }
  }

  suaRequisicaoAoServidor(dataInicio: Date, dataFim: Date) {
    this.service.findByRange(dataInicio, dataFim).subscribe( resposta =>{
      this.ELEMENT_DATA = resposta;
      let newSource = new MatTableDataSource<any>(resposta);
      this.dataSource = newSource;
    })


  }
}
