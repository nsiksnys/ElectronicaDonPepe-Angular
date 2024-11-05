import { Component, Input } from '@angular/core';
import { Sale } from '../../../models/sale.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-show',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe ],
  templateUrl: './show.component.html'
})
export class SaleShowComponent {
  @Input() sale!: Sale;
}
