import { Product } from "./product.model";
import { Salesman } from "./salesman.model";

export interface Sale {
    id: number;
    salesDate: Date;
    products: Array<Product>;
    total: number;
    salesman: Salesman;
}