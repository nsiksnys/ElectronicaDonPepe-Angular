import { Product } from "./product.model";
import { Salesman } from "./salesman.model";

export interface Award {
    id?: number;
    createdAt: Date;
    dateFrom: Date;
    dateTo: Date;
    awardedTo: Salesman;
    product: Product;
    isCampaign: boolean
    total: number;
}