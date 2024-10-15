import { Component, inject } from '@angular/core';
import { Sale } from '../../models/sale.model';
import { Product } from '../../models/product.model';
import { Salesman } from '../../models/salesman.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SearchFormComponent } from '../../components/sale/search-form/search-form.component';
import { SaleAddComponent } from "../../components/sale/add/add.component";

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, SearchFormComponent, SaleAddComponent ],
  templateUrl: './sale.component.html'  
})
export class SaleComponent {
  title = "Ventas";
  http = inject(HttpClient);
  sales: Sale[] = [];
  products: Product[] = [];
  salespeople: Salesman[] = [];
    
  // Get sales, products and salesman from the endpoint
  ngOnInit() {
    this.http.get<any>("http://localhost:8000/api/sales")
      .subscribe((data) => {
          this.sales = data['member'];
      });
   
      this.http.get<any>("http://localhost:8000/api/products")
      .subscribe((data) => {
          this.products = data['member'];
      });
    
      this.http.get<any>("http://localhost:8000/api/salesmen")
      .subscribe((data) => {
          this.salespeople = data['member'];
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

  // Send a POST request to create a new sale.
  // If successful, add the new Sale object to the sales array.
  addNewSale(formInput: any){
    // This is what we need to send the post request
    let customPostHeader = new HttpHeaders().set('Content-Type', 'application/ld+json');
    let newSaleSalesman = "http://localhost:8000/api/salesmen/" + formInput.salesman;
    let newSaleProducts: string[] = [];

    // These are buttons we may use later
    let modalCloseButton:any = <any>document.getElementById("addSaleModalClose");
    let modalResetFormButton:any = <any>document.getElementById("addSaleModalFormReset");

    formInput.products.forEach((element: string) => {
      newSaleProducts.push("http://localhost:8000/api/products/" + element)
    });
    this.http.post<Sale>("http://localhost:8000/api/sales",
      {
        salesDate: new Date(formInput.date),
        products: newSaleProducts,
        salesman: newSaleSalesman,
        total: 0
      },
      { headers: customPostHeader } // Content-Type has to be application/ld+json
    ).subscribe((data) => {
        this.sales.push(data); // if successful, add the new Sale object
        modalCloseButton.click(); // close the modal
        modalResetFormButton.click(); // reset the form
    });
  }
}
