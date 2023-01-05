import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../+store/order.reducers';
import { Store } from '@ngrx/store';
import { Order } from '../../models/Order.model';
import { OrderActions } from '../../+store/order.actions';
import * as fromSelectors from '../../+store/order.selectors';
import { filter, find, map, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Good } from 'src/app/models/Good.interface';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.sass']
})
export class GoodsComponent {

	orderId: number = 0;
	orders: Order[] = [];
	// order: Order;
	packageFormData: FormGroup;


	constructor(
		private ar: ActivatedRoute,
		private store: Store<AppState>,
		private fb: FormBuilder
	) {

		this.packageFormData = this.fb.group({
			id: [],
			itemName: ['Chairs', Validators.required],
			dangerGoods: [false],
			itemDescription: ['', Validators.required],
			individualWeight: ['', Validators.required],
			quantity: ['', Validators.required],
			totalWeight: ['', Validators.required],
		})
		this.store.dispatch(OrderActions.getAllOrders())
		this.ar.paramMap.subscribe( params => this.orderId = Number(params.get('id')));
		this.store.dispatch(OrderActions.activeOrderId({id: this.orderId}))

	}

	get dangerGoodsFild() {
		return this.packageFormData.get('dangerGoods') as FormControl;
	}

}
