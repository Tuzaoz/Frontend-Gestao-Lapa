import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
//componentes do projeto
import { NavComponent } from './components/nav/nav.component';
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProdutoListComponent } from './components/produtos/produto-list/produto-list.component';
import {ToastrModule} from "ngx-toastr";
import { ProdutoAddComponent } from './components/produtos/produto-add/produto-add.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {ClientesListComponent} from "./components/clientes/clientes-list/clientes-list.component";
import { ProdutoUpdateComponent } from './components/produtos/produto-update/produto-update.component';
import { ClienteAddComponent } from './components/clientes/cliente-add/cliente-add.component';
import { ClienteUpdateComponent } from './components/clientes/cliente-update/cliente-update.component';
import { VendasListComponent } from './components/vendas/vendas-list/vendas-list.component';
import { VendasAddComponent } from './components/vendas/vendas-add/vendas-add.component';
import { VendasUpdateComponent } from './components/vendas/vendas-update/vendas-update.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CurrencyPipe, DatePipe, NgFor} from "@angular/common";
import { ContaListComponent } from './components/conta/conta-list/conta-list.component';
import { ContaAddComponent } from './components/conta/conta-add/conta-add.component';
import { ContaUpdateComponent } from './components/conta/conta-update/conta-update.component';
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {HistoricoListComponent} from "./components/historico/historico-list/historico-list.component";



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    ProdutoListComponent,
    ProdutoAddComponent,
    ClientesListComponent,
    ProdutoUpdateComponent,
    ClienteAddComponent,
    ClienteUpdateComponent,
    VendasListComponent,
    VendasAddComponent,
    VendasUpdateComponent,
    ContaListComponent,
    ContaAddComponent,
    ContaUpdateComponent,
    HistoricoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterOutlet,
    AppRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    CurrencyPipe,
    DatePipe,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [DatePipe,
    MatDatepickerModule,
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
