import {Component, OnInit, ViewChild} from '@angular/core';
import {Produto} from "../../models/produto";
import {ProdutoService} from "../../services/produto.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Venda} from "../../models/venda";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  ngOnInit(): void {
  //   this.findAll();
   }

}

