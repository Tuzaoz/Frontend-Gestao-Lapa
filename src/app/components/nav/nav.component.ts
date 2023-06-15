import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

const dataAtual: Date = new Date();
const dia: number = dataAtual.getDate();
const mes: number = dataAtual.getMonth() + 1; // Os meses começam do zero, então adicionamos 1
const ano: number = dataAtual.getFullYear();

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  constructor(private router: Router,) {
  }
  ngOnInit(): void {
    this.router.navigate(['home'])
  }
  public static hoje = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString()}`
}
