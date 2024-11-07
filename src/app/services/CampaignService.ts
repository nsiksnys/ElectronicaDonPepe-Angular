import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { Campaign } from "../models/campaign.model";
import { ApiService } from "./ApiService";

@Injectable({ providedIn: 'root' })
export class CampaignService extends ApiService {
  private url: string = this.getEndpoint() + "campaigns/";

  // Content-Type has to be application/ld+json
  private customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json');

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

  create(params: any): Observable<Campaign> {
    return this.http.post<Campaign>(this.url, params, { headers: this.customHeader });
  }

  edit(id: any, params: any): Observable<Campaign> {
    return this.http.put<Campaign>(this.url + id, params, {headers:this. customHeader});
  }
}