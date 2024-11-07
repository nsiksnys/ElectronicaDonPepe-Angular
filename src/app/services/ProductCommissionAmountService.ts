import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { productCommissionAmount } from "../models/productCommissionAmount.model";
import { ApiService } from "./ApiService";

@Injectable({ providedIn: 'root' })
export class ProductCommissionAmountService extends ApiService {
  private url: string = this.getEndpoint() + "product_commission_amounts/";

  // Content-Type has to be application/ld+json
  private customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json');

  constructor(private http: HttpClient) { super(); }

  getUrl(): string {
    return this.url;
  }

  getAll(): Observable<ApiGetCollectionRequest> {
    return this.http.get<ApiGetCollectionRequest>(this.url);
  }

  create(params: any): Observable<productCommissionAmount> {
    return this.http.post<productCommissionAmount>(this.url, params, { headers: this.customHeader });
  }

  edit(id: any, params: any): Observable<productCommissionAmount> {
    return this.http.put<productCommissionAmount>(this.url + id, params, {headers: this.customHeader });
  }
}