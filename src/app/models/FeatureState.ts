import { Order } from "./Order.model";

export interface FeatureState {
    orders: Order[];
	activeOrderId: number | null;
}