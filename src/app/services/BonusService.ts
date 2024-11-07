import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGetCollectionRequest } from "../models/apiGetCollectionRequest.model";
import { ApiService } from "./ApiService";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class BonusService extends ApiService {
    private url: string = this.getEndpoint() + "bonuses/";

    constructor(private http: HttpClient) { super(); }

    getUrl(): string {
        return this.url;
    }
    
    getAll(): Observable<ApiGetCollectionRequest> {
        return this.http.get<ApiGetCollectionRequest>(this.url);
    }

    calculate(params: any): Observable<ApiGetCollectionRequest> {
        return this.http.get<ApiGetCollectionRequest>(this.getEndpoint() + "bonus/calculate", { params: params });
    }
}