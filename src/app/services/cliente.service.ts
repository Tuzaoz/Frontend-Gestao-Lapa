import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente";
import {API_CONFIG} from "../config/api.config";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/cliente`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/cliente`, cliente);
  }
  findById(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/cliente/find/${id}`);
  }
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/cliente/${cliente.id}`, cliente);
  }
}
