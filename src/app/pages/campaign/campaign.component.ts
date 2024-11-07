import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Campaign } from '../../models/campaign.model';
import { Product } from '../../models/product.model';
import { CampaignService } from '../../services/CampaignService';
import { ProductService } from '../../services/ProductService';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe ],
  templateUrl: './campaign.component.html',
})
export class CampaignComponent {
  title = "Campañas";
  campaigns: Campaign[] = [];
  products: Product[] = [];

  constructor(private campaignService: CampaignService, private productService: ProductService) { }

  // Get campaigns and products from the endpoint
  ngOnInit() {
    this.campaignService.getAll().subscribe((data) => this.campaigns = data.member);
    
    this.productService.search({'exists[campaigns]': false }).subscribe((data) => this.products = data.member);
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
    let index = this.campaigns.findIndex(c => c.id == id);    
    this.campaignService.edit(id, 
      {
        createdAt: this.campaigns[index].createdAt,
        product: this.productService.getUrl() + this.campaigns[index].product.id,
        active: status
      },
    ).subscribe((data) => {
        this.campaigns[index] = data;
    });
  }

  // Create new campaign
  add(productId: number){
    let index = this.products.findIndex(p => p.id == productId);
    
    this.campaignService.create(
      {
        createdAt: new Date(),
        product: this.productService.getUrl() + productId,
        active: true,
      },
    ).subscribe((data) => {
      this.campaigns.push(data); // if successful, add the new object
      this.products.splice(index,1);
    });
  }
}
