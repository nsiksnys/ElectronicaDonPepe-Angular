import { Amount } from "./amount.model";

export interface saleCommissionAmount extends Amount {
    id: number;
    min: number;
    max: number;
}