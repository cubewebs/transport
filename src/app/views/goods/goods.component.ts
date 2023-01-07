import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState, ordersReducer } from '../../+store/order.reducers';
import { Store } from '@ngrx/store';
import { Order } from '../../models/Order.model';
import { OrderActions } from '../../+store/order.actions';
import * as fromSelectors from '../../+store/order.selectors';
import { filter, find, map, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Good } from 'src/app/models/Good.interface';
import { Observable, of, timer } from 'rxjs';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.sass']
})
export class GoodsComponent {

	orderId: number = 0;
	orders$: Observable<Order[]> = new Observable();
	actualOrder: Observable<Order | undefined> = new Observable();
	packageFormData: FormGroup;


	constructor(
		private ar: ActivatedRoute,
		private store: Store<AppState>,
		private fb: FormBuilder
	) {

		this.store.dispatch(OrderActions.getAllOrders())
		this.ar.paramMap.subscribe( params => this.orderId = Number(params.get('id')));

		this.packageFormData = this.fb.group({
			id: [],
			itemName: ['Chairs', Validators.required],
			dangerGoods: [true],
			itemDescription: ['With cocaine', Validators.required],
			individualWeight: [0.02, Validators.required],
			quantity: [1000, Validators.required],
			totalWeight: [20, Validators.required],
			orderId: [this.orderId, Validators.required]
		})
		this.store.dispatch(OrderActions.activeOrderId({id: this.orderId}));
		
	}

	get dangerGoodsFild() {
		return this.packageFormData.get('dangerGoods') as FormControl;
	}

	addPackage() {
		console.log('this.packageFormData ->', this.packageFormData.value);
		this.store.dispatch(OrderActions.addPackage({ pkg: this.packageFormData.value }))


	}

}
