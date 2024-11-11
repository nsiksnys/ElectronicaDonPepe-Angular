import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Salesman } from '../../../models/salesman.model';

@Component({
  selector: 'app-bonus-search-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './search-form.component.html',
})
export class BonusSearchFormComponent {
  formBuilder = inject(FormBuilder);
  @Input() apiSalespeople: Salesman[] = [];
  @Output() formSubmitted = new EventEmitter<any>();

  form = this.formBuilder.group({
    date: [ '', Validators.required ],
    salespeople: [ '', Validators.required ]
  });

  submitForm() {
    console.log(JSON.stringify(this.form.value));
    this.formSubmitted.emit(this.form.value); 
  }

  resetForm() {
    this.form.reset({ date: '', salespeople: '' });
    // reload the current page
    window.location.reload();
  }
}
