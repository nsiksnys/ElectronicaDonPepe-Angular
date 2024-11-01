import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SaleCommission } from '../../../models/saleCommission.model';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-sale-commission-show',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, ModalComponent ],
  templateUrl: './sale.component.html'
})
export class SaleCommissionShowComponent {
  @Input() saleCommission!: SaleCommission;
  @Input() id!: number;
  @Input() button?:any;

  // modal attributes
  modal = {
    name: "",
    title: "Comisiones por Venta",
    button: ""
  };

  ngOnInit() {
    // set the modal name and button value (if we do when declaring the modal variable they will be empty)
    this.modal.name = "bonus" + this.id.toString() + "SaleComission";
    this.modal.button = (this.button === undefined)? this.saleCommission.total.toString() : this.button;
  }
}
