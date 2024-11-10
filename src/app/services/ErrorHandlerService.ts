import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    private errorMessage = "Hubo un error. Por favor intente nuevamente más tarde."

    handle(error: Error): string {
        // Log the error
        console.error(error.message);
        // return error message to display
        return this.errorMessage;
    }
}