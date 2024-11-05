import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProductComission } from '../../../../models/ProductCommission.model';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'app-product-commission-index',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, ModalComponent ],
  templateUrl: './product-c-index.component.html'
})
export class ProductCommissionIndexComponent {
  @Input() list: ProductComission[] = [];
  @Input() total: number = 0;
  @Input() id: number = 0;
  @Input() button?:any;

  // modal attributes
  modal = {
    name: "",
    title: "Comisiones por Producto",
    button: ""
  };

  ngOnInit() {
    // if total attribute is not set, calculate it
    if( this.total == 0) {
      this.list.forEach(item => {
        this.total += item.total;
      });
    }

    // set the modal name and button value (if we do when declaring the modal variable they will be empty)
    this.modal.name = "bonus" + this.id.toString() + "ProductComissions";
    this.modal.button = (this.button === undefined)? this.total.toString() : this.button;
  }
}
