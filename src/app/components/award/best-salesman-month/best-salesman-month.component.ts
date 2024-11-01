import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Award } from '../../../models/award.model';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-best-salesman-show',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, ModalComponent ],
  templateUrl: './best-salesman-month.component.html'
})
export class BestSalesmanMonthComponent {
  @Input() award!: Award;
  @Input() id!: number;
  @Input() button?:any;

  // modal attributes
  modal = {
    name: "",
    title: "Premio mejor venedor del mes",
    button: ""
  };

  ngOnInit() {
    // set the modal name and button value (if we do when declaring the modal variable they will be empty)
    this.modal.name = "bonus" + this.id.toString() + "BestSalesman";
    this.modal.button = (this.button === undefined)? this.award.total.toString() : this.button;
  }
}
