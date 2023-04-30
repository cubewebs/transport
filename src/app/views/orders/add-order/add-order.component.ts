import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find, map, Subscription, take, tap } from 'rxjs';
import { AppState } from 'src/app/+store/order.reducers';
import { selectAllOrders } from 'src/app/+store/order.selectors';
import { Order } from 'src/app/models/Order.model';
import * as fromActions from '../../../+store/order.actions';
import * as fromSelectors from '../../../+store/order.selectors';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.sass']
})
export class AddOrderComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  orders!: Order[];
  order?: Order;
  id!: number;

  addOrderFormData: FormGroup = this.fb.group({
    firstName:    ['', [Validators.required]],
		lastName:     ['', [Validators.required]],
    email:        ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
		phoneNumber:  ['', [Validators.required]],
		address:      ['', [Validators.required]],
		city:         ['', [Validators.required]],
		province:     ['', [Validators.required]],
		country:      ['', [Validators.required]],
		zipCode:      ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach( subs => subs.unsubscribe())
  }

  ngOnInit(): void {

    this.store.dispatch(fromActions.OrderActions.getAllOrders());

    this.subs.push(
      this.route.paramMap.subscribe( params => {
        this.id = Number(params.get('id'));
      })
    )

    this.subs.push(
      this.store.select(selectAllOrders)
      .pipe(
        map( ord => ord.find( or => or.id === this.id ) )
      )
      .subscribe( ord => {
        if(ord && this.id !== 0) {
          this.order = ord;
          this.addOrderFormData.setValue({
            firstName:    [this.order?.sender?.firstName],
            lastName:     [this.order?.sender?.lastName],
            email:        [this.order?.sender?.email],
            phoneNumber:  [this.order?.sender?.phoneNumber],
            address:      [this.order?.sender?.address],
            city:         [this.order?.sender?.city],
            province:     [this.order?.sender?.province],
            country:      [this.order?.sender?.country],
            zipCode:      [this.order?.sender?.zipCode],
          })
        } else {
          this.addOrderFormData.reset();
        }
      })
    )

    if(this.id === 0) {
      
      this.copyOrder();
    }

  }

  fieldIsInvalid( field: string ) {
    return this.addOrderFormData.controls[field].invalid
           &&
           this.addOrderFormData.controls[field].touched
  }

  addNewOrder() {
    console.log('this.id ->', this.id)
    const order: Order = {
      _id: Number(new Date()),
      sender: this.addOrderFormData.value,
      goods: [],
      receiver: null,
      id: this.id ? this.id : 0,
      state: 1
    }
    console.log('addNewOrder ->', order)
    this.store.dispatch(fromActions.OrderActions.addOrder({order}))
    this.addOrderFormData.reset();
    this.subs.push(
      this.store.select(selectAllOrders).subscribe(
        orders => {
          console.log('orders ->', orders)
          this.order = orders.find(o => o._id === order._id);
          this.router.navigateByUrl(`add-receiver/${this.order?.id}`);
          console.log('this.order ->', this.order)
        }
      )
    )
  }

  copyOrder() {
    this.subs.push(
      this.ordersService.copyOrder$.subscribe((id: number | null) => {

        if(!id){return} else {
          this.store.dispatch(fromActions.OrderActions.getOrder({orderId: id}))
        }
        
      }),
      
      this.store.select(fromSelectors.selectOrder).subscribe(order => {
        if(order) {
          console.log('order ->', order)
          const orderValues = {
            firstName: order.sender?.firstName,
            lastName: order.sender?.lastName,
            email: order.sender?.email,
            phoneNumber: order.sender?.phoneNumber,
            address: order.sender?.address,
            city: order.sender?.city,
            province: order.sender?.province,
            country: order.sender?.country,
            zipCode: order.sender?.zipCode,
          }
          this.id = order.id;
          this.addOrderFormData.reset(orderValues)
          this.addOrderFormData.markAllAsTouched()
        } else {return}
      })

    )
  }

}
