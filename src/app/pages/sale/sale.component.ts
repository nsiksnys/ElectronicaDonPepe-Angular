import { Component, inject } from '@angular/core';
import { Sale } from '../../models/sale.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SearchFormComponent } from '../../components/sale/search-form/search-form.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, SearchFormComponent ],
  templateUrl: './sale.component.html'  
})
export class SaleComponent {
  title = "Ventas";
  http = inject(HttpClient);
  sales: Sale[] = [];

  ngOnInit() {
    this.http.get<any>("http://localhost:8000/api/sales")
      .subscribe((data) => {
          this.sales = data['member'];
      });
  }

  // Send a GET request searching between two dates
  // If successful, update the sales array
  getSearchFormInput(formInput: any){
    //console.log("La busqueda es entre " + formInput.from + " hasta " + formInput.to);
    this.http.get<any>("http://localhost:8000/api/sales", { params: {'salesDate[after]': formInput.from, 'salesDate[before]': formInput.to} })
      .subscribe((data) => {
          this.sales = data['member'];
      });
  }
}
