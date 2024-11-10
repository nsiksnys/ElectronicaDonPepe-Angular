import { Component } from '@angular/core';
import { Sale } from '../../models/sale.model';
import { Product } from '../../models/product.model';
import { Salesman } from '../../models/salesman.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SearchFormComponent } from '../../components/sale/search-form/search-form.component';
import { SaleAddComponent } from "../../components/sale/add/add.component";
import { SaleShowComponent } from "../../components/sale/show/show.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { SaleService } from '../../services/SaleService';
import { ProductService } from '../../services/ProductService';
import { SalesmanService } from '../../services/SalesmanService';
import { AlertComponent } from '../../components/alert/alert.component';
import { ErrorHandlerService } from '../../services/ErrorHandlerService';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, SearchFormComponent, SaleAddComponent, SaleShowComponent, ModalComponent, AlertComponent ],
  templateUrl: './sale.component.html'  
})
export class SaleComponent {
  title = "Ventas";
  sales: Sale[] = [];
  products: Product[] = [];
  salespeople: Salesman[] = [];
  errorMessage = "";

  // modal attributes
  newSaleModal = {
    name: "addSale",
    title: "Registrar venta",
    button: "Agregar"
  };

  showSaleModal = {
    name: "showSale",
    title: "Detalles de venta",
  };

  constructor(private saleService: SaleService, private productService: ProductService, private salespeopleService: SalesmanService, private errorHandlerService: ErrorHandlerService) {}

  // Get sales, products and salesman from the endpoint
  ngOnInit() {
    this.saleService.getAll()
      .subscribe({
        next: (data) => { this.sales = data.member },
        error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });

    this.productService.getAll()
      .subscribe({
        next: (data) => { this.products = data.member },
        error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });

    this.salespeopleService.getAll()
      .subscribe({
        next: (data) => { this.salespeople = data.member },
        error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });
  }

  // Send a GET request searching between two dates
  // If successful, update the sales array
  getSearchFormInput(formInput: any){
    //console.log("La busqueda es entre " + formInput.from + " hasta " + formInput.to);
    this.saleService.search({'salesDate[after]': formInput.from, 'salesDate[before]': formInput.to})
      .subscribe({
        next: (data) => { this.sales = data.member },
        error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });
  }

  // Send a POST request to create a new sale.
  // If successful, add the new Sale object to the sales array.
  addNewSale(formInput: any){
    // This is what we need to send the post request
    let newSaleSalesman = this.salespeopleService.getUrl() + formInput.salesman;
    let newSaleProducts: string[] = [];

    // These are buttons we may use later
    let modalCloseButton:any = <any>document.getElementById("addSaleModalClose");
    let modalResetFormButton:any = <any>document.getElementById("addSaleModalFormReset");

    formInput.products.forEach((element: string) => {
      newSaleProducts.push(this.productService.getUrl() + element)
    });
    this.saleService.create({
        salesDate: new Date(formInput.date),
        products: newSaleProducts,
        salesman: newSaleSalesman,
        total: 0
      })
      .subscribe({
        next: (data) => {
          this.sales.push(data); // if successful, add the new Sale object
          modalCloseButton.click(); // close the modal
          modalResetFormButton.click(); // reset the form
        },
        error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });
  }
}
