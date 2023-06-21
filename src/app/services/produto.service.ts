import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../config/api.config";
import {forkJoin, map, Observable} from "rxjs";
import {Produto} from "../models/produto";
import {ProdutoAddComponent} from "../components/produtos/produto-add/produto-add.component";

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
  findById(id:number): Observable<Produto>{
    return this.http.get<Produto>(`${API_CONFIG.baseUrl}/produtos/${id}`);
  }
  update(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${API_CONFIG.baseUrl}/produtos/${produto.id}`, produto);
  }

  getData(){
    return this.http.get(`${API_CONFIG.baseUrl}/produtos`)
      .pipe(
        map((response:[]) => response.map(produto => ({ id: produto['id'], nome: produto['name'] })))
      )
  }

  getDataByID(id:number){
    return this.http.get(`${API_CONFIG.baseUrl}/produtos//${id}`)
      .pipe(
        map((response:[]) => response.map(produto => ({ id: produto['id'], nome: produto['name'], valor:  produto['valor'] })))
      )
  }
  findProdutosById(id: number[]):Observable<Produto[]>{
    const requests: Observable<Produto>[] = id.map(id => this.findById(id));
    return forkJoin(requests)
}
}
