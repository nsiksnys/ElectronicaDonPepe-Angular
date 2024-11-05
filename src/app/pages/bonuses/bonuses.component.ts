import { Component, inject } from '@angular/core';
import { Bonus } from '../../models/bonus.model';
import { Salesman } from '../../models/salesman.model';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AlertComponent } from '../../components/alert/alert.component';
import { BonusSearchFormComponent } from '../../components/bonus/search-form/search-form.component';
import { ProductCommissionIndexComponent } from '../../components/commission/product/index/product-c-index.component';
import { SaleCommissionShowComponent } from '../../components/commission/sale/show/sale-c-show.component';
import { BestSalesmanMonthComponent } from '../../components/award/best-salesman-month/best-salesman-month.component';
import { CampaignAwardIndexComponent } from '../../components/award/campaign/index/campaign-index.component';

@Component({
  selector: 'app-bonuses',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, AlertComponent, BonusSearchFormComponent, ProductCommissionIndexComponent, SaleCommissionShowComponent, BestSalesmanMonthComponent, CampaignAwardIndexComponent ],
  templateUrl: './bonuses.component.html'
})
export class BonusComponent {
  title = "Calcular adicionales";
  http = inject(HttpClient);
  bonuses: Bonus[] = [];
  salespeople: Salesman[] = [];
  errorMessage: string = "";

  // Get data from the endpoint
  ngOnInit() {
    this.http.get<any>("http://localhost:8000/api/bonuses")
    .subscribe((data) => {
        this.bonuses = data['member'];
    });

    this.http.get<any>("http://localhost:8000/api/salesmen")
    .subscribe((data) => {
        this.salespeople = data['member'];
    });
  }

  // Send a GET request and calculate the bonuses
  // If successful, update the sales array
  calculateBonuses(formInput: any){
    // salespeople param must be sent with [] so the api knows is an array  
    this.http.get<any>("http://localhost:8000/api/bonus/calculate", { params: {'date': formInput.date, 'salespeople[]': formInput.salespeople} })
      .subscribe((data) => {
        if (data['totalItems'] == 0) {
          this.errorMessage = "No se encontraron ventas en éste período."
        }
        this.bonuses = data['member'];
      });
  }
}
