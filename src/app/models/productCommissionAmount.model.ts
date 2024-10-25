import { Amount } from "./amount.model";
import { Product } from "./product.model";

export interface productCommissionAmount extends Amount {
    id: number;
    product: Product;
}