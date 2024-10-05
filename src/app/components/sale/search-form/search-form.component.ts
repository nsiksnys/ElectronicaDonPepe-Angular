import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {
  formBuilder = inject(FormBuilder);

  searchForm = this.formBuilder.group({
    from: [''],
    to: ['']
  });

  submitForm() {
    //console.warn(this.searchForm.value); 
  }
}
