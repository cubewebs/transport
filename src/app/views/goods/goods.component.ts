import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../+store/order.reducers';
import { Store } from '@ngrx/store';
import { Order } from '../../models/Order.model';
import { OrderActions } from '../../+store/order.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.sass']
})
export class GoodsComponent {

	orderId: number = 0;
	order!: Order;

	constructor(
		private ar: ActivatedRoute,
		private store: Store<AppState>
	) {
		this.store.dispatch(OrderActions.getAllOrders())
		this.ar.paramMap.subscribe( params => this.orderId = Number(params.get('id')));
		console.log('this.orderId ->', this.orderId)
		this.store.dispatch(OrderActions.activeOrderId({id: this.orderId}))
		this.store.select('orders')
		.pipe(
			// map( orders => orders.find( order => this.orderId === order.id))
		)
		.subscribe()
	}

}
