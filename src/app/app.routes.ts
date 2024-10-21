import { Routes } from '@angular/router';
import { SaleComponent } from './pages/sale/sale.component';
import { HomeComponent } from './pages/home/home.component';
import { CampaignComponent } from './pages/campaign/campaign.component';

export const routes: Routes = [
    {
        path: 'sales',
        title: 'Ventas',
        component: SaleComponent
    },
    {
        path: 'home',
        title: 'Índice',
        component: HomeComponent
    },
    {
        path: 'campaigns',
        title: 'Campañas',
        component: CampaignComponent
    }
];
