import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import { OrdersService } from '../services/orders.service';
import * as fromActions from '../+store/order.actions'; 
import { Order } from '../models/Order.model';

@Injectable()
export class OrderEffects {

  addNewOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.OrderActions.addOrder),
      switchMap(({order}) => this.ordersService.addOrder(order)
        .pipe(
          map( ({...order}) => fromActions.OrderActions.addOrderSuccess({order})),
          catchError( error => of( error ))
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.OrderActions.getAllOrders),
      mergeMap(() => this.ordersService.getAllOrders()
        .pipe(
          map((orders) => fromActions.OrderActions.getAllOrdersSuccess({orders})),
          catchError( err => of(err))
        )
      )
    )
  );

  // updateOrder$ = createEffect(() => 
  //         this.actions$.pipe(
  //           ofType(fromActions.OrderActions.updateOrder),
  //           switchMap(
  //             (id, order) => this.ordersService.updateOrderById({ id order })
  //           ),
              
  //         )
  // )

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}
}