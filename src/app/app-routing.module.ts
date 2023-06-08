import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {ProdutoListComponent} from "./components/produtos/produto-list/produto-list.component";
import {ProdutoAddComponent} from "./components/produtos/produto-add/produto-add.component";

const routes: Routes = [
  {
    path: '', component: NavComponent, children:[
      {path:'home',  component: HomeComponent},
      {path:'produtos',  component: ProdutoListComponent},
      {path: 'produtos/adicionar',component:ProdutoAddComponent}
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
