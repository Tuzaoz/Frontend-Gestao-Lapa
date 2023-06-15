import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavComponent} from "./components/nav/nav.component";
import {ProdutoListComponent} from "./components/produtos/produto-list/produto-list.component";
import {ProdutoAddComponent} from "./components/produtos/produto-add/produto-add.component";
import {ClientesListComponent} from "./components/clientes/clientes-list/clientes-list.component";
import {VendasListComponent} from "./components/vendas/vendas-list/vendas-list.component";

const routes: Routes = [
  {
    path: '', component: NavComponent, children:[
      {path:'vendas',  component: VendasListComponent},
      {path:'produtos',  component: ProdutoListComponent},
      {path: 'produtos/adicionar',component:ProdutoAddComponent},
      {path:'clientes', component: ClientesListComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
