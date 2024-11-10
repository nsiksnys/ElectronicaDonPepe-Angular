import { environment } from "../../environments/environment";
export class ApiService {
    private endpoint = environment.apiUrl; // api endpoint from .env file

    getEndpoint(){
        return this.endpoint;
    }
}