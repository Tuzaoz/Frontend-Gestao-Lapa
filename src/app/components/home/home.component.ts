import {Component, OnInit, ViewChild} from '@angular/core';
import {Produto} from "../../models/produto";
import {ProdutoService} from "../../services/produto.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Venda} from "../../models/venda";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private service: ProdutoService
  ) {}
  displayedColumns: string[] = ['cliente', 'produtos', 'valor', 'metodoPag', 'acoes'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // findAll(){
  //   this.service.findAll().subscribe(resposta =>{
  //     this.ELEMENT_DATA = resposta;
  //     this.dataSource = new MatTableDataSource<Produto>(resposta);
  //   })
  // }

  ngOnInit(): void {
  //   this.findAll();
   }

}
const ELEMENT_DATA: Venda[] = [{
  cliente:'João',
  metodoPag: 'Dinheiro',
  valor: 50,
  produtos: ['Produto 1' , 'Prodouto2']}];
