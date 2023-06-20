import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../models/produto";
import {API_CONFIG} from "../config/api.config";
import {Venda} from "../models/venda";

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(
    private http: HttpClient
  ) {
  }

  findHoje(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${API_CONFIG.baseUrl}/vendas/hoje`);
  }
  create(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${API_CONFIG.baseUrl}/vendas`, venda);
  }
  findById(id:number): Observable<Venda>{
    return this.http.get<Venda>(`${API_CONFIG.baseUrl}/vendas/${id}`);
  }
  update(produto: Venda): Observable<Venda>{
    return this.http.put<Venda>(`${API_CONFIG.baseUrl}/vendas/${produto.id}`, produto);
  }

  findByDate(date:string): Observable<Venda[]>{
    return this.http.get<Venda[]>(`${API_CONFIG.baseUrl}/vendas/filter?date=${date}`)
  }

}
