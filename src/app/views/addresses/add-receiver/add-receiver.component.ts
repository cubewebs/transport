import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find, map } from 'rxjs';
import { AppState } from 'src/app/+store/order.reducers';
import * as fromActions from '../../../+store/order.actions';
import { Order } from 'src/app/models/Order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.sass']
})
export class AddReceiverComponent implements OnInit {

  orders: Order[] = [];
  orderId!: number;
  order!: Order | null | undefined;

  addReceiverFormData: FormGroup = this.fb.group({
    	firstName:   ['', [Validators.required]],
		lastName:    ['', [Validators.required]],
    	email:     	 ['', [Validators.required]],
		phoneNumber: ['', [Validators.required]],
		address:     ['', [Validators.required]],
		city:        ['', [Validators.required]],
		province:    ['', [Validators.required]],
		country:     ['', [Validators.required]],
		zipCode:     ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private ar: ActivatedRoute,
    private os: OrdersService
  ) {

	this.ar.paramMap.subscribe((params: ParamMap) => {
		this.orderId = Number(params.get('id'));
	})

	this.store.dispatch(fromActions.OrderActions.getAllOrders());

	this.store.select('orders').pipe(
		map( orders => {
			this.orders = orders.orders;
		}),
	).subscribe()

	setTimeout(() => {
		this.order = this.orders.find( order => this.orderId == order.id),
		console.log('this.order ->', this.order)
			this.addReceiverFormData.setValue({
				firstName:   this.order?.receiver?.firstName || '',
				lastName:    this.order?.receiver?.lastName || '',
		    	email:     	 this.order?.receiver?.email || '',
				phoneNumber: this.order?.receiver?.phoneNumber || '',
				address:     this.order?.receiver?.address || '',
				city:        this.order?.receiver?.city || '',
				province:    this.order?.receiver?.province || '',
				country:     this.order?.receiver?.country || '',
				zipCode:     this.order?.receiver?.zipCode || '',
			})
	}, 100);
  }
  ngOnInit(): void {

  }

  fieldIsInvalid( field: string ) {
    return this.addReceiverFormData.controls[field].invalid
           &&
           this.addReceiverFormData.controls[field].touched
  }

  addNewReceiver() {
	let changes: Order = {
		receiver: this.addReceiverFormData.value,
		id: this.order!._id,
		_id: this.order!._id,
		goods: this.order!.goods,
		sender: this.order!.sender,
	}
	this.store.dispatch(fromActions.OrderActions.updateOrder({id: this.orderId, order: changes}));
	// this.os.updateOrderById(this.orderId, changes)
	// .subscribe( order => console.log('order ->', changes));
	this.addReceiverFormData.reset();
	this.router.navigateByUrl(`goods/${this.orderId}`)
  }
}
