import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '../models/Order.model';

export const OrderActions = createActionGroup({
  source: 'All Orders Actions',
  events: {
    'Add Order': props<{ order: Order }>(),
    'Add Order Success': props<{ order: Order }>(),
    'Add Order Error': props<{ error: any }>(),
    'Update Order': props<{ id: number, order: Order }>(),
    'Update Order Success': props<{ order: Order }>(),
    'Update Order Error': props<{ error: any }>(),
    'Get All Orders': emptyProps(),
    'Get All Orders Success': props<{ orders: Order[] }>(),
    'Get All Orders Error': props<{ error: any }>(),
  },
});