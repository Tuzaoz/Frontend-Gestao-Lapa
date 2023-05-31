import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home/home.component";
import {ProdutoListComponent} from "./components/tecnicos/produto-list/produto-list.component";

const routes: Routes = [
  {
    path: '', component: NavComponent, children:[
      {path:'home',  component: HomeComponent},
      {path:'produtos',  component: ProdutoListComponent}
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
