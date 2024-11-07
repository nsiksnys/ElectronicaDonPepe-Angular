import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { awardAmount } from "../models/awardAmount.model";
import { ApiService } from "./ApiService";

@Injectable({ providedIn: 'root' })
export class AwardAmountService extends ApiService {
  private url: string = this.getEndpoint() + "award_amounts/";

  constructor(private http: HttpClient) { super(); }

  getUrl(): string {
    return this.url;
  }

  getAll(): Observable<ApiGetCollectionRequest> {
    return this.http.get<ApiGetCollectionRequest>(this.url);
  }

  edit(id: any, params: any): Observable<awardAmount> {
    let customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json'); // Content-Type has to be application/ld+json
    return this.http.put<awardAmount>(this.url + id, params, {headers: customHeader});
  }
}