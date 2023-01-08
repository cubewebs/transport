import { Good } from "./Good.interface";
import { Order } from "./Order.model";

export interface FeatureState {
    orders: Order[];
    pkgs: Good[];
}