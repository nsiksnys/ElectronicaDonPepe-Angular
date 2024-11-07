import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { saleCommissionAmount } from "../models/saleCommissionAmount.model";
import { ApiService } from "./ApiService";

@Injectable({ providedIn: 'root' })
export class SaleCommissionAmountService extends ApiService {
  private url: string = this.getEndpoint() + "sale_commission_amounts/";

  // Content-Type has to be application/ld+json
  private customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json');

  constructor(private http: HttpClient) { super(); }

  getUrl(): string {
    return this.url;
  }

  getAll(): Observable<ApiGetCollectionRequest> {
    return this.http.get<ApiGetCollectionRequest>(this.url);
  }

  create(params: any): Observable<saleCommissionAmount> {
    return this.http.post<saleCommissionAmount>(this.url, params, { headers: this.customHeader });
  }

  edit(id: any, params: any): Observable<saleCommissionAmount> {
    return this.http.put<saleCommissionAmount>(this.url + id, params, {headers: this.customHeader });
  }
}