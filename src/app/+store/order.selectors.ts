import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FeatureState } from '../models/FeatureState'; 
import { AppState } from './order.reducers';

export const featureKey = 'orders'

export const selectOrdersFeature = (state: AppState) => state.orders;

export const selectAllOrders = createSelector(
  selectOrdersFeature,
  (state: FeatureState) => state.orders
)

export const selectAllPackages = createSelector(
  selectOrdersFeature,
  (state: FeatureState) => {
    return state.pkgs
  }
)

export const selectOrder = createSelector(
  selectOrdersFeature,
  (state: FeatureState) => state.order
)
