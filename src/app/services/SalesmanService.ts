import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { ApiService } from "./ApiService";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class SalesmanService extends ApiService {
    private url: string = this.getEndpoint() + "salesmen/";

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
}