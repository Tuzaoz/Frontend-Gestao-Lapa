import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Venda} from "../models/venda";
import {API_CONFIG} from "../config/api.config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor(    private http: HttpClient
  ) { }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/historico`);
  }
  findByRange(min:string, max:string): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/historico/filter?minDate=${min}&maxDate=${min}`);
  }
}
