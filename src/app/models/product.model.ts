import { Campaign } from "./campaign.model";
export interface Product {
    id: number;
    name: string,
    unitPrice: number;
    campaigns?: Campaign[]
}