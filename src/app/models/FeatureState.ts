import { Good } from "./Good.interface";
import { Order } from "./Order.model";

export interface FeatureState {
    orders: Order[];
    order: Order | null;
    pkgs: Good[];
}