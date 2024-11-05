import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { awardAmount } from '../../../../models/awardAmount.model';

@Component({
  selector: 'app-award',
  standalone: true,
  imports: [ ModalComponent, ReactiveFormsModule ],
  templateUrl: './award-index.component.html'
})
export class AwardAmountIndexComponent {
  @Input() amounts: awardAmount[] = []; // imported from the amount page
  formBuilder = inject(FormBuilder);
  @Output() formSubmitted = new EventEmitter<any>();

  // modal attributes
  modal = {
    name: "awards",
    title: "Editando monto premio"
  }

  // form
  form = this.formBuilder.group({
    type: [ '', [ Validators.required ] ],
    amount: [ 0, [ Validators.required, Validators.pattern('[0-9]+')] ], // amount value (number)
    index: [ 0 ] // amount index (number)
  })


  // Fill the form with the product information
  fillForm(awardIndex: any) {
    this.form.reset({ type: (this.amounts[awardIndex].campaign? 'Campaña' : 'Mejor vendedor del mes'), amount: this.amounts[awardIndex].amount, index: awardIndex });
    document.getElementById("amount")?.setAttribute('value', this.amounts[awardIndex].amount.toString());
    document.getElementById("type")?.setAttribute('disabled', 'true');
  }

  submitForm() {
    // console.log(JSON.stringify(this.form.value));
    this.formSubmitted.emit(this.form.value);
  }

  resetForm() {
    this.form.reset({ type: '', amount: 0, index: 0 });
  }
}
