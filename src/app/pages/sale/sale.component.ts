import { Component, inject } from '@angular/core';
import { Sale } from '../../models/sale.model';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { SearchFormComponent } from '../../components/sale/search-form/search-form.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [ CurrencyPipe, SearchFormComponent ],
  templateUrl: './sale.component.html'  
})
export class SaleComponent {
  title = "Ventas";
  http = inject(HttpClient);
  sales: Sale[] = [];

  ngOnInit() {
    this.http.get<Sale[]>("http://localhost:8000/sale")
      .subscribe((data) => {
          this.sales = data;
      })
  }
}
