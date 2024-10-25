import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { AccordionComponent } from '../../accordion/accordion.component';
import { ModalComponent } from '../../modal/modal.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { productCommissionAmount } from '../../../models/productCommissionAmount.model';

@Component({
  selector: 'app-product-commission',
  standalone: true,
  imports: [ AccordionComponent, ModalComponent, ReactiveFormsModule],
  templateUrl: './product.component.html'
})
export class productCommissionAmountComponent {
  @Input() amounts: productCommissionAmount[] = []; // imported from the amount page
  @Input() products: Product[] = []; // imported from the amount page
  formBuilder = inject(FormBuilder);
  @Output() formSubmitted = new EventEmitter<any>();

  
  // accordion attributes
  accordion = {
    name: "Accordion",
    title: "Agregar productos"
  }

  // modal attributes
  modal = {
    name: "products",
    title: "Monto comisión producto"
  }

  // form
  form = this.formBuilder.group({
    product: [ '', [ Validators.required, Validators.pattern('[0-9]+')] ], // product id (string)
    amount: [ 0, [ Validators.required, Validators.pattern('[0-9]+')] ], // amount value (number)
    operation: [ '' ], // operation type: post (new value) or put (edit value)
    index: [ '' ] // product index: (new value) or amount index (edit value)
  });

  // Fill the form with the product information
  fillAddForm(index: number) {
    this.fillForm(this.products[index], 0, 'post', index);
  }

  fillEditForm(index: number) {
    this.fillForm(this.amounts[index].product, this.amounts[index].amount, 'put', index);
  }

  fillForm(product: Product, amount: number, operation: string, amountIndex: any){
    this.form.reset({product: product.id.toString(), amount: amount, operation: operation, index: amountIndex})
    document.getElementById("name")?.setAttribute('value', product.name);
  }

  submitForm(){
    // console.log(JSON.stringify(this.form.value));
    this.formSubmitted.emit(this.form.value);
  }

  resetForm() {
    this.form.reset({ product: '', amount: 0 });
  }
}
