import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Campaign } from '../../models/campaign.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe ],
  templateUrl: './campaign.component.html',
})
export class CampaignComponent {
  title = "Campañas";
  http = inject(HttpClient);
  campaigns: Campaign[] = [];
  products: Product[] = [];


  // Get campaigns and products from the endpoint
  ngOnInit() {
    this.http.get<any>("http://localhost:8000/api/campaigns")
      .subscribe((data) => {
          this.campaigns = data['member'];
      });
   
      this.http.get<any>("http://localhost:8000/api/products", { params: {'exists[campaigns]': false } } )
      .subscribe((data) => {
          this.products = data['member'];
      });
  }


  // Send a PUT request to mark a campaign as enabled
  enable(campaignId: number){
    this.toggle(campaignId, true);
  }
  
  // Send a PUT request to mark a campaign as disabled
  disable(campaignId: number){
    this.toggle(campaignId, false);
  }

  // Send a PUT request changing a campaign status
  toggle(id: number, status: boolean){
    // This is what we need to send the put request
    let customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json');
    let index = this.campaigns.findIndex(c => c.id == id);
    
    this.http.put<Campaign>("http://localhost:8000/api/campaigns/" + id,
      {
        createdAt: this.campaigns[index].createdAt,
        product: "http://localhost:8000/api/products/" + this.campaigns[index].product.id,
        active: status
      },
      { headers: customHeader } // Content-Type has to be application/ld+json
    ).subscribe((data) => {
        this.campaigns[index] = data;
    });
  }

  // Create new campaign
  add(productId: number){
    // This is what we need to send the put request
    let customHeader = new HttpHeaders().set('Content-Type', 'application/ld+json');
    let index = this.products.findIndex(p => p.id == productId);
    
    this.http.post<Campaign>("http://localhost:8000/api/campaigns",
      {
        createdAt: new Date(),
        product: "http://localhost:8000/api/products/" + productId,
        active: true,
      },
      { headers: customHeader } // Content-Type has to be application/ld+json
    ).subscribe((data) => {
      this.campaigns.push(data); // if successful, add the new object
      this.products.splice(index,1);
    });
  }
}
