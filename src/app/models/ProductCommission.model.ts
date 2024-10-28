import { Commission } from "./commission.model";
import { Product } from "./product.model";

export interface ProductComission extends Commission {
    product: Product;
}