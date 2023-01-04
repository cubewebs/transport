import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/Order.model';
import * as fromSelectors from '../../+store/order.selectors';
import * as fromActions from '../../+store/order.actions';
import { AppState } from 'src/app/+store/order.reducers';
import { map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit{

  orders$: Observable<any> = new Observable();

  constructor(
    private store: Store<AppState>,
	private router: Router
  ) {

    this.store.dispatch(fromActions.OrderActions.getAllOrders());
	
  }

  ngOnInit(): void {
    this.orders$ = this.store.select('orders')
      .pipe(
        map( o => o.orders )
      )
  }

  onEditReceiver( id: number ) {
	this.router.navigateByUrl(`add-receiver/${id}`)
  } 

  onEditGoods( id: number ) {
	this.router.navigateByUrl(`goods/${id}`)
  } 

}
