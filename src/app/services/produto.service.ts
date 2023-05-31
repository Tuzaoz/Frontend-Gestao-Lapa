import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../config/api.config";
import {Observable} from "rxjs";
import {Produto} from "../models/produto";

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
}
