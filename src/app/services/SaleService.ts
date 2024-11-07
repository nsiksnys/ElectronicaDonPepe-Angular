import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { Sale } from "../models/sale.model";
import { ApiService } from "./ApiService";

@Injectable({ providedIn: 'root' })
export class SaleService extends ApiService {
  private url: string = this.getEndpoint() + "sales/";
  constructor(private http: HttpClient) { super(); }

  getUrl(): string {
    return this.url;
  }

  getAll(): Observable<ApiGetCollectionRequest> {
    return this.http.get<ApiGetCollectionRequest>(this.url);
  }

  search(params: any): Observable<ApiGetCollectionRequest> {
    return this.http.get<ApiGetCollectionRequest>(this.url, { params: params });
  }

  create(params: any): Observable<Sale> {
    let customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json'); // Content-Type has to be application/ld+json
    return this.http.post<Sale>(this.url, params, { headers: customHeader });
  }
}