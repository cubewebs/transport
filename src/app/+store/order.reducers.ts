import { createReducer, on } from '@ngrx/store';

import * as fromActions from './order.actions'; 
import { Order } from '../models/Order.model'; 
import { FeatureState } from '../models/FeatureState';


export interface AppState {
  orders: FeatureState;
}

export const initialState: FeatureState = {
  orders: []
};

export const orderInitialState: Order = {
  _id: 0,
  sender: null,
  goods: [],
  receiver: null,
  id: 0
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
  on(fromActions.OrderActions.updateOrder, (state, action) => (
    {...state, id: action.id, order: action.order}
  )),
  on(fromActions.OrderActions.updateOrderSuccess, (state, {order}) => (
    {...state, order}
  )),
  on(fromActions.OrderActions.updateOrderError, (state, {error}) => (
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
  ))
);