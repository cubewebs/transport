import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FeatureState } from '../models/FeatureState';
import { Order } from '../models/Order.model'; 
import { AppState } from './order.reducers';

export const featureKey = 'orders'

export const selectOrdersFeature = (state: AppState) => state.orders;

export const selectAllOrders = createSelector(
  selectOrdersFeature,
  (state: FeatureState) => state.orders
)