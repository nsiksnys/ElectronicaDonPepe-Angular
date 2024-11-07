export class ApiService {
    private endpoint = "http://localhost:8000/api/"; // api endpoint from .env file

    getEndpoint(){
        return this.endpoint;
    }
}