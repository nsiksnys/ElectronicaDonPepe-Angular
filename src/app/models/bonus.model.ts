import { Award } from "./award.model";
import { ProductComission } from "./ProductCommission.model";
import { SaleCommission } from "./saleCommission.model";
import { Salesman } from "./salesman.model";

export interface Bonus {
    id: number;
    createdAt: Date;
    dateFrom: Date;
    dateTo: Date;
    salesman: Salesman;
    saleComission?: SaleCommission;
    productComissions?: ProductComission[];
    bestSalesmanMonth?: Award;
    campaigns?: Award[];
    productCommissionsTotal?: number;
    campaignAwardsTotal?: number;
    total?: number;
}