import { Commission } from "./commission.model";
import { Sale } from "./sale.model";

export interface SaleCommission extends Commission{
    items: Sale[];
}