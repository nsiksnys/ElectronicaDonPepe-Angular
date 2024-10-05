import { Routes } from '@angular/router';
import { SaleComponent } from './pages/sale/sale.component';
import { HomeComponent } from './pages/home/home.component';

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
    }
];
