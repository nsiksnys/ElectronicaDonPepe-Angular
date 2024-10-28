import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { awardAmount } from '../../models/awardAmount.model';
import { productCommissionAmount } from '../../models/productCommissionAmount.model';
import { saleCommissionAmount } from '../../models/saleCommissionAmount.model';
import { Product } from '../../models/product.model';
import { productCommissionAmountComponent } from '../../components/amount/product/product.component';
import { saleCommissionAmountComponent } from '../../components/amount/sale/sale.component';
import { awardAmountComponent } from '../../components/amount/award/award.component';

@Component({
  selector: 'app-amount',
  standalone: true,
  imports: [ productCommissionAmountComponent, saleCommissionAmountComponent, awardAmountComponent ],
  templateUrl: './amount.component.html',
})
export class AmountComponent {
  title = "Montos";
  http = inject(HttpClient);
  awardAmounts: awardAmount[] = [];
  productCommissionAmounts: productCommissionAmount[] = [];
  saleCommissionAmounts: saleCommissionAmount[] = [];
  productsWithoutCommission: Product[] = [];

  // Get amounts from the endpoint
  ngOnInit() {
    this.http.get<any>("http://localhost:8000/api/award_amounts")
      .subscribe((data) => {
          this.awardAmounts = data['member'];
      });
   
      this.http.get<any>("http://localhost:8000/api/product_commission_amounts")
      .subscribe((data) => {
          this.productCommissionAmounts = data['member'];
      });
    
      this.http.get<any>("http://localhost:8000/api/sale_commission_amounts")
      .subscribe((data) => {
          this.saleCommissionAmounts = data['member'];
      });
      
      // we need this to create new product commissions
      this.http.get<any>("http://localhost:8000/api/products", { params: {'exists[commissionAmount]': false } } )
      .subscribe((data) => {
          this.productsWithoutCommission = data['member'];
      });
  }

  sendProductCRequest(formInput: any) {
    // These are buttons we will use later
    let modalCloseButton:any = <any>document.getElementById("productsModalClose");
    let modalResetFormButton:any = <any>document.getElementById("productsFormReset");

    // Request body
    let requestBody = {
      product: "http://localhost:8000/api/products/" + formInput.product,
      amount: Number.parseFloat(formInput.amount)
    }

    if (formInput.operation == "post") {
      this.sendPostRequest("http://localhost:8000/api/product_commission_amounts",requestBody)
        .subscribe((data) => {
          this.productCommissionAmounts.push(data); // if successful, add the new object
          this.productsWithoutCommission.splice(formInput.index,1); // remove the product from the array
      });
    }
    
    if (formInput.operation == "put") {
      this.sendPutRequest("http://localhost:8000/api/product_commission_amounts/" + this.productCommissionAmounts[formInput.index].id, requestBody)
        .subscribe((data) => {
          this.productCommissionAmounts[formInput.index] = data; // if successful, replace the object
      });
    }
    modalCloseButton.click(); // close the modal
    modalResetFormButton.click(); // reset the form
  }

  sendSaleCRequest(formInput: any) {
    // These are buttons we will use later
    let modalCloseButton:any = <any>document.getElementById("salesModalClose");
    let modalResetFormButton:any = <any>document.getElementById("salesFormReset");

    // Request body
    let requestBody = {
      min: this.saleCommissionAmounts[formInput.index].min,
      max: this.saleCommissionAmounts[formInput.index].max,
      amount: Number.parseFloat(formInput.amount)
    }

    this.sendPutRequest("http://localhost:8000/api/sale_commission_amounts/" + this.saleCommissionAmounts[formInput.index].id, requestBody)
      .subscribe((data) => {
        this.productCommissionAmounts[formInput.index] = data; // if successful, replace the object
    });

    modalCloseButton.click(); // close the modal
    modalResetFormButton.click(); // reset the form
  }

  sendAwardRequest(formInput: any) {
    // These are buttons we will use later
    let modalCloseButton:any = <any>document.getElementById("awardsModalClose");
    let modalResetFormButton:any = <any>document.getElementById("awardsFormReset");

    // Request body
    let requestBody = {
      campaign: this.awardAmounts[formInput.index].campaign,
      amount: Number.parseFloat(formInput.amount)
    }

    this.sendPutRequest("http://localhost:8000/api/award_amounts/" + this.awardAmounts[formInput.index].id, requestBody)
      .subscribe((data) => {
        this.awardAmounts[formInput.index] = data; // if successful, replace the object
    });

    modalCloseButton.click(); // close the modal
    modalResetFormButton.click(); // reset the form
  }

  sendPostRequest(url: string, body: any) {
    let customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json'); // Content-Type has to be application/ld+json
    return this.http.post<any>(url, body, { headers: customHeader });
  }

  sendPutRequest(url: string, body: any) {
    let customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json'); // Content-Type has to be application/ld+json
    return this.http.put<any>(url, body, { headers: customHeader });
  }
}
