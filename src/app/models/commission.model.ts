import { Salesman } from "./salesman.model";

export interface Commission {
    id: number;
    createdAt: Date;
    fromDate: Date;
    toDate: Date;
    salesman: Salesman;
    units: number;
    total: number;
}