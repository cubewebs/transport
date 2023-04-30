import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Good } from '../models/Good.interface';
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
    'Add Package': props<{ pkg: Good }>(),
    'Add Package Success': props<{ pkg: Good }>(),
    'Add Package Error': props<{ error: any }>(),
    'Delete Package': props<{ id: number }>(),
    'Delete Package Success': props<{ pkg: Good }>(),
    'Delete Package Error': props<{ error: any }>(),
    'Delete Order': props<{ id: number }>(),
    'Delete Order Success': props<{ order: Order }>(),
    'Delete Order Error': props<{ error: any }>(),
    'Get Order': props<{ orderId: number | null }>(),
    'Get Order Success': props<{ order: Order }>(),
    'Get Order Error': props<{ error: any }>(),
    'Get All Orders': emptyProps(),
    'Get All Orders Success': props<{ orders: Order[] }>(),
    'Get All Orders Error': props<{ error: any }>(),
    'Get Packages': emptyProps(),
    'Get Packages Success': props<{ pkgs: Good[] }>(),
    'Get Packages Error': props<{ error: any }>(),
    'Update Package': props<{ id: number, pkg: Good }>(),
    'Update Package Success': props<{ pkg: Good }>(),
    'Update Package Error': props<{ error: any }>(),
	  'Active Order Id': props<{ id: number }>(),
  },
});