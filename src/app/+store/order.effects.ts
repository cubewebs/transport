import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap, concatMap, exhaustMap } from 'rxjs/operators';
import { OrdersService } from '../services/orders.service';
import * as fromActions from '../+store/order.actions'; 
import * as fromReducers from '../+store/order.reducers'; 
import { Order } from '../models/Order.model';

@Injectable()
export class OrderEffects {

  addNewOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.OrderActions.addOrder),
      switchMap(({order}) => this.ordersService.addOrder(order)
        .pipe(
          map( ({...order}) => fromActions.OrderActions.addOrderSuccess({order})),
          catchError( error => of( fromActions.OrderActions.addOrderError({ error }) ))
        )
      )
    )
  );

  deleteOrder$ = createEffect(() => 
          this.actions$.pipe(
            ofType(fromActions.OrderActions.deleteOrder),
            exhaustMap(
              ({id}) => this.ordersService.deleteOrder( id )
              .pipe(
                map(
                  order => fromActions.OrderActions.deleteOrderSuccess({ order })
                ),
                catchError( error => of( fromActions.OrderActions.deleteOrderError({ error }) ))
              )
            )
          )
  )

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.OrderActions.getAllOrders),
      mergeMap(() => this.ordersService.getAllOrders()
        .pipe(
          map((orders) => fromActions.OrderActions.getAllOrdersSuccess({orders})),
          catchError( error => of( fromActions.OrderActions.getAllOrdersError({ error }) ))
        )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.OrderActions.getOrder),
      mergeMap((state) => this.ordersService.getOrderById(state.orderId)
        .pipe(
          map((order) => fromActions.OrderActions.getOrderSuccess({order})),
          catchError( error => of( fromActions.OrderActions.getOrderError({ error }) ))
        )
      )
    )
  );

  updateOrder$ = createEffect(() => 
          this.actions$.pipe(
            ofType(fromActions.OrderActions.updateOrder),
            concatMap(
              (action) => this.ordersService.updateOrderById( action.id, action.order )
			  .pipe(
				map((order) => fromActions.OrderActions.updateOrderSuccess({ order })),
				catchError( error => of( fromActions.OrderActions.updateOrderError({ error }) ))
			  )
            ),
              
          )
  )

  addPackage = createEffect(() =>
          this.actions$.pipe(
            ofType(fromActions.OrderActions.addPackage),
            concatMap(
              (action) => this.ordersService.addPackage(action.pkg)
              .pipe(
                map((pkg) => fromActions.OrderActions.addPackageSuccess({ pkg })),
                catchError( error => of( fromActions.OrderActions.addPackageError({ error }) ))
              )
            )
          )
  )

  deletePackage$ = createEffect(() => 
          this.actions$.pipe(
            ofType(fromActions.OrderActions.deletePackage),
            exhaustMap(
              action => this.ordersService.deletePackage( action.id )
              .pipe(
                map(pkg => fromActions.OrderActions.deletePackageSuccess({ pkg })),
                catchError( error => of( fromActions.OrderActions.deletePackageError({ error }) ))
              )
            )
          )
  )

  getPackages$ = createEffect(() =>
                this.actions$.pipe(
                  ofType(fromActions.OrderActions.getPackages),
                  mergeMap(
                    () => this.ordersService.getPackages().pipe(
                      map((pkgs) => fromActions.OrderActions.getPackagesSuccess({ pkgs })),
                      catchError( error => of( fromActions.OrderActions.getPackagesError({ error }) ))
                    )
                  )
                )
  )

  updatePackage$ = createEffect(() => 
                this.actions$.pipe(
                  ofType(fromActions.OrderActions.updatePackage),
                  concatMap(
                    ({id, pkg}) => this.ordersService.updatePackage(id, pkg).pipe(
                      map((pkg) => fromActions.OrderActions.updatePackageSuccess({ pkg })),
                      catchError( error => of( fromActions.OrderActions.updatePackageError({ error }) ))
                    )
                  )
                )
  )

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}
}