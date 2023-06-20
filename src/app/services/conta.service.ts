import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conta} from "../models/conta";
import {API_CONFIG} from "../config/api.config";
import {Venda} from "../models/venda";

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(
    private http: HttpClient
  ) { }
  findAll(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${API_CONFIG.baseUrl}/contas`);
  }

  create(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${API_CONFIG.baseUrl}/contas`, conta);
  }
  findById(id:number): Observable<Conta>{
    return this.http.get<Conta>(`${API_CONFIG.baseUrl}/contas/find/${id}`);
  }
  update(conta: Conta): Observable<Conta>{
    return this.http.put<Conta>(`${API_CONFIG.baseUrl}/contas/${conta.id}`, conta);
  }

  findByDate(date:string): Observable<Conta[]>{
    return this.http.get<Conta[]>(`${API_CONFIG.baseUrl}/contas/filter?date=${date}`)
  }
}
