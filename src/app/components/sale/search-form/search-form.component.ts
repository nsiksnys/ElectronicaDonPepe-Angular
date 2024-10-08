import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {
  formBuilder = inject(FormBuilder);
  @Output() formSubmitted = new EventEmitter<any>();

  searchForm = this.formBuilder.group({
    from: [ '', Validators.required ],
    to: [ '', Validators.required ]
  });

  submitForm() {
    this.formSubmitted.emit(this.searchForm.value); 
  }
}
