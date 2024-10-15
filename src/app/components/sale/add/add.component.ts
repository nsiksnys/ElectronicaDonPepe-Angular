import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { Salesman } from '../../../models/salesman.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-add',
  standalone: true,
  imports: [ ReactiveFormsModule, DatePipe ],
  templateUrl: './add.component.html'
})
export class SaleAddComponent {
  //These values are used to fill the selects
  @Input() apiProducts: Product[] = [];
  @Input() apiSalespeople: Salesman[] = [];
  
  //We use this to send the submitted values to the sale page
  @Output() formSubmitted = new EventEmitter<any>();

  datepipe: DatePipe = new DatePipe('en-US');

  //Here we build the form
  addForm = new FormGroup({
    date: new FormControl(this.datepipe.transform(new Date(),'YYYY-MM-ddTHH:mm'), Validators.required),
    products: new FormControl<string[]>([], [ Validators.required, Validators.minLength(1)]),
    salesman: new FormControl<string>('0', [ Validators.required, Validators.pattern('[0-9]+')])
  })

/*   // Test the data formatting
  ngOnInit(){
    console.log(this.datepipe.transform(this.today,"medium"));
  } */

  submitForm(){
    // console.log(JSON.stringify(this.addForm.value));
    this.formSubmitted.emit(this.addForm.value);
  }

  resetForm() {
    this.addForm.reset({ date: this.datepipe.transform(new Date(), 'YYYY-MM-ddTHH:mm'), products: [], salesman: '0' });
  }
}
