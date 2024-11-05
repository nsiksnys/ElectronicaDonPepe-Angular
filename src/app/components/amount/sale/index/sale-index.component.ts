import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { saleCommissionAmount } from '../../../../models/saleCommissionAmount.model';

@Component({
  selector: 'app-sale-commission',
  standalone: true,
  imports: [ ModalComponent, ReactiveFormsModule ],
  templateUrl: './sale-index.component.html'
})
export class SaleCommissionAmountIndexComponent {
  @Input() amounts: saleCommissionAmount[] = []; // imported from the amount page
  formBuilder = inject(FormBuilder);
  @Output() formSubmitted = new EventEmitter<any>();

  // modal attributes
  modal = {
    name: "sales",
    title: "Editando monto comisión venta"
  }

  // form
  form = this.formBuilder.group({
    amount: [ 0, [ Validators.required, Validators.pattern('[0-9]+')] ], // amount value (number)
    index: [ 0 ] // amount index (number)
  })


  // Fill the form with the product information
  fillForm(amountIndex: any) {
    this.form.reset({ amount: this.amounts[amountIndex].amount, index: amountIndex });
    document.getElementById("amount")?.setAttribute('value', this.amounts[amountIndex].amount.toString());
  }

  submitForm() {
    // console.log(JSON.stringify(this.form.value));
    this.formSubmitted.emit(this.form.value);
  }

  resetForm() {
    this.form.reset({ amount: 0, index: 0 });
  }
}
