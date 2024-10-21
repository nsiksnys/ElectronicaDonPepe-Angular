import { Product } from "./product.model";

export interface Campaign {
    id: number;
    createdAt: Date;
    product: Product;
    active: boolean;
}