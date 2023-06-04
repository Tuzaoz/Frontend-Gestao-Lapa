import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../config/api.config";
import {Observable} from "rxjs";
import {Produto} from "../models/produto";
import {ProdutoAddComponent} from "../components/tecnicos/produto-add/produto-add.component";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }
  findAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos`);
  }

  create(produto: Produto): Observable<Produto> {
  return this.http.post<Produto>(`${API_CONFIG.baseUrl}/produtos`, produto);
  }
}
