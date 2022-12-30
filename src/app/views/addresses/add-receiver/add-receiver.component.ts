import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find, map } from 'rxjs';
import { AppState } from 'src/app/+store/order.reducers';
import { selectAllOrders } from 'src/app/+store/order.selectors';
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
  order!: Order | undefined;

  addReceiverFormData: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
		phoneNumber: ['', [Validators.required]],
		address: ['', [Validators.required]],
		city: ['', [Validators.required]],
		province: ['', [Validators.required]],
		country: ['', [Validators.required]],
		zipCode: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private ar: ActivatedRoute,
    private os: OrdersService
  ) {}
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      this.orderId = Number(params.get('id'));
    })
  }

  fieldIsInvalid( field: string ) {
    return this.addReceiverFormData.controls[field].invalid
           &&
           this.addReceiverFormData.controls[field].touched
  }

  addNewReceiver() {
    this.store.select('orders')
    .pipe(
      map( orders => orders.orders),
    ).subscribe(orders => this.orders = orders)
    this.order = this.orders.find( order => order.id == this.orderId )
    // const order: Order = {
    //   goods: [],
    //   receiver: this.addReceiverFormData.value,
    // }
    // this.store.dispatch(fromActions.OrderActions.addOrder({order}))
    this.router.navigateByUrl('add-receiver')
  }
}
