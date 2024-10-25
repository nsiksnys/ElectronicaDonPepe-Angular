import { Amount } from "./amount.model"

export interface awardAmount extends Amount {
    id: number;
    campaign: boolean;
}