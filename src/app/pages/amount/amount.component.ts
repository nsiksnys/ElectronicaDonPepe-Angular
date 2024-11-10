import { Component } from '@angular/core';
import { awardAmount } from '../../models/awardAmount.model';
import { productCommissionAmount } from '../../models/productCommissionAmount.model';
import { saleCommissionAmount } from '../../models/saleCommissionAmount.model';
import { Product } from '../../models/product.model';
import { ProductCommissionAmountIndexComponent } from '../../components/amount/product/index/product-index.component';
import { SaleCommissionAmountIndexComponent } from '../../components/amount/sale/index/sale-index.component';
import { AwardAmountIndexComponent } from '../../components/amount/award/index/award-index.component';
import { ProductService } from '../../services/ProductService';
import { AwardAmountService } from '../../services/AwardAmountService';
import { ProductCommissionAmountService } from '../../services/ProductCommissionAmountService';
import { SaleCommissionAmountService } from '../../services/SaleCommissionAmountService';
import { AlertComponent } from '../../components/alert/alert.component';
import { ErrorHandlerService } from '../../services/ErrorHandlerService';

@Component({
  selector: 'app-amount',
  standalone: true,
  imports: [ ProductCommissionAmountIndexComponent, SaleCommissionAmountIndexComponent, AwardAmountIndexComponent, AlertComponent ],
  templateUrl: './amount.component.html',
})
export class AmountComponent {
  title = "Montos";
  awardAmounts: awardAmount[] = [];
  productCommissionAmounts: productCommissionAmount[] = [];
  saleCommissionAmounts: saleCommissionAmount[] = [];
  productsWithoutCommission: Product[] = [];
  errorMessage: string = "";

  constructor(private productService: ProductService, private awardAmountService: AwardAmountService, private productCommissionAmountService: ProductCommissionAmountService, private saleCommissionAmountService: SaleCommissionAmountService, private errorHandlerService: ErrorHandlerService) { }

  // Get amounts from the endpoint
  ngOnInit() {
    this.awardAmountService.getAll().subscribe({
      next: (data) => { this.awardAmounts = data.member },
      error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });

    this.productCommissionAmountService.getAll().subscribe({
      next: (data) => { this.productCommissionAmounts = data.member },
      error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });
    
    this.saleCommissionAmountService.getAll().subscribe({
      next: (data) => { this.saleCommissionAmounts = data.member },
      error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });
    
    // we need this to create new product commissions
    this.productService.search({ 'exists[commissionAmount]': false }).subscribe({
      next: (data) => { this.productsWithoutCommission = data.member },
      error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });
  }

  sendProductCRequest(formInput: any) {
    // These are buttons we will use later
    let modalCloseButton:any = <any>document.getElementById("productsModalClose");
    let modalResetFormButton:any = <any>document.getElementById("productsFormReset");

    // Request body
    let requestBody = {
      product: this.productService.getEndpoint() + formInput.product,
      amount: Number.parseFloat(formInput.amount)
    }

    if (formInput.operation == "post") {
      this.productCommissionAmountService.create(requestBody)
        .subscribe({
          next: (data) => {
          this.productCommissionAmounts.push(data); // if successful, add the new object
            this.productsWithoutCommission.splice(formInput.index, 1); // remove the product from the array
          },
          error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
      });
    }
    
    if (formInput.operation == "put") {
      this.productCommissionAmountService.edit(this.productCommissionAmounts[formInput.index].id, requestBody)
        .subscribe({
          next: (data) => {
          this.productCommissionAmounts[formInput.index] = data; // if successful, replace the object
          },
          error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
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

    this.saleCommissionAmountService.edit(this.saleCommissionAmounts[formInput.index].id, requestBody)
      .subscribe({
        next: (data) => {
        this.saleCommissionAmounts[formInput.index] = data; // if successful, replace the object
        },
        error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
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

    this.awardAmountService.edit(this.awardAmounts[formInput.index].id, requestBody)
      .subscribe({
        next: (data) => {
        this.awardAmounts[formInput.index] = data; // if successful, replace the object
        },
        error: (error: Error) => { this.errorMessage = this.errorHandlerService.handle(error) }
    });

    modalCloseButton.click(); // close the modal
    modalResetFormButton.click(); // reset the form
  }
}
