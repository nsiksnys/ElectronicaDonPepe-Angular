import { Component } from '@angular/core';
import { Bonus } from '../../models/bonus.model';
import { Salesman } from '../../models/salesman.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AlertComponent } from '../../components/alert/alert.component';
import { BonusSearchFormComponent } from '../../components/bonus/search-form/search-form.component';
import { ProductCommissionIndexComponent } from '../../components/commission/product/index/product-c-index.component';
import { SaleCommissionShowComponent } from '../../components/commission/sale/show/sale-c-show.component';
import { BestSalesmanMonthComponent } from '../../components/award/best-salesman-month/best-salesman-month.component';
import { CampaignAwardIndexComponent } from '../../components/award/campaign/index/campaign-index.component';
import { BonusService } from '../../services/BonusService';
import { SalesmanService } from '../../services/SalesmanService';

@Component({
  selector: 'app-bonuses',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, AlertComponent, BonusSearchFormComponent, ProductCommissionIndexComponent, SaleCommissionShowComponent, BestSalesmanMonthComponent, CampaignAwardIndexComponent ],
  templateUrl: './bonuses.component.html'
})
export class BonusComponent {
  title = "Calcular adicionales";
  bonuses: Bonus[] = [];
  salespeople: Salesman[] = [];
  errorMessage: string = "";

  constructor(private bonusService: BonusService, private salespeopleService: SalesmanService) {} 

  // Get data from the endpoint
  ngOnInit() {
    this.bonusService.getAll().subscribe((data) => this.bonuses = data.member);
    
    this.salespeopleService.getAll().subscribe((data) => this.salespeople = data.member);
  }

  // Send a GET request and calculate the bonuses
  // If successful, update the sales array
  calculateBonuses(formInput: any){
    // salespeople param must be sent with [] so the api knows is an array  
    let calculated: Bonus[] = [];
    this.bonusService.calculate({'date': formInput.date, 'salespeople[]': formInput.salespeople }).subscribe((data) => calculated = data.member);
    if (calculated.length == 0) {
      this.errorMessage = "No se encontraron ventas en éste período."
    }
    else {
      this.bonuses = calculated;
    }
  }
}
