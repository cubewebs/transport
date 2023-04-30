import { createReducer, on } from '@ngrx/store';

import * as fromActions from './order.actions'; 
import { Order } from '../models/Order.model'; 
import { FeatureState } from '../models/FeatureState';
import { Good } from '../models/Good.interface';


export interface AppState {
  orders: FeatureState;
  order: FeatureState;
  pkgs: FeatureState;
}

export const initialState: FeatureState = {
  orders: [],
  order: null,
  pkgs: [],
};

export const orderInitialState: Order = {
  _id: 0,
  sender: null,
  receiver: null,
  id: 0,
  state: 0
}

export const goodInitialState: Good = {
  id: 0,
	itemName: '',
	dangerGoods: false,
	itemDescription: '',
	quantity: 0,
	individualWeight: 0,
	totalWeight: 0,
	orderId: 0,
}

export const ordersReducer = createReducer(
  initialState,
  on(fromActions.OrderActions.addOrder, (state, {order}) => (
    {...state, order}
  )),
  on(fromActions.OrderActions.addOrderSuccess, (state, {order}) => (
    {...state, order}
  )),
  on(fromActions.OrderActions.addOrderError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.updateOrder, (state, {id, order}) => (
    {...state, id, order}
  )),
  on(fromActions.OrderActions.updateOrderSuccess, (state, {order}) => (
    {...state, order}
  )),
  on(fromActions.OrderActions.updateOrderError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.addPackage, (state, action) => (
    {...state, package: action.pkg}
  )),
  on(fromActions.OrderActions.addPackageSuccess, (state, action) => (
    {...state, package: action.pkg}
  )),
  on(fromActions.OrderActions.addPackageError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.deletePackage, (state, {id}) => (
    {...state, id}
  )),
  on(fromActions.OrderActions.deletePackageSuccess, (state, {pkg}) => (
    {...state, pkg}
  )),
  on(fromActions.OrderActions.deletePackageError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.deleteOrder, (state, {id}) => (
    {...state, id}
  )),
  on(fromActions.OrderActions.deleteOrderSuccess, (state, {order}) => (
    {...state, order}
  )),
  on(fromActions.OrderActions.deleteOrderError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.getAllOrders, (state) => (
    {...state}
  )),
  on(fromActions.OrderActions.getAllOrdersSuccess, (state, {orders}) => (
    {...state, orders}
  )),
  on(fromActions.OrderActions.getAllOrdersError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.getOrder, (state) => (
    {...state}
  )),
  on(fromActions.OrderActions.getOrderSuccess, (state, {order}) => (
    {...state, order}
  )),
  on(fromActions.OrderActions.getOrderError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.getPackages, (state) => (
    {...state}
  )),
  on(fromActions.OrderActions.getPackagesSuccess, (state, {pkgs}) => (
    {...state, pkgs}
  )),
  on(fromActions.OrderActions.getPackagesError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.updatePackage, (state, { id, pkg }) => (
    {...state, id, pkg}
  )),
  on(fromActions.OrderActions.updatePackageSuccess, (state, {pkg}) => (
    {...state, pkg}
  )),
  on(fromActions.OrderActions.updatePackageError, (state, {error}) => (
    {...state, error}
  )),
  on(fromActions.OrderActions.activeOrderId, (state, action) => (
	{...state, id: action.id}
  ))
);
