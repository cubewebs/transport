import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Order } from 'src/app/models/Order.model';
import * as fromSelectors from '../../+store/order.selectors';
import * as fromActions from '../../+store/order.actions';
import { AppState } from 'src/app/+store/order.reducers';
import { map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders: Order[] = [];

  constructor(
    private store: Store<AppState>,
	  private router: Router
  ) { 
    this.store.dispatch(fromActions.OrderActions.getAllOrders());

    this.store.select(fromSelectors.selectAllOrders).pipe(
      map( orders => orders)
    ).subscribe( o => this.orders = o )

   }
  
  ngOnInit(): void {}

  onSelectSender( id: number ) {
    this.router.navigateByUrl(`add-order/${id}`)
  }

  onEditReceiver( id: number ) {
	this.router.navigateByUrl(`add-receiver/${id}`)
  } 

  onEditGoods( id: number ) {
	this.router.navigateByUrl(`goods/${id}`)
  } 

  onDeleteOrder( id: number ) {
    this.store.dispatch(fromActions.OrderActions.deleteOrder({ id }))
  }

}
