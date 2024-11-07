import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { Observable } from "rxjs";
import { ApiService } from "./ApiService";

@Injectable({providedIn: 'root'})
export class ProductService extends ApiService {
    private url: string = this.getEndpoint() + "products/";

    constructor(private http: HttpClient) { super() }

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