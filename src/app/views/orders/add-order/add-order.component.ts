import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find, map, Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/+store/order.reducers';
import { selectAllOrders } from 'src/app/+store/order.selectors';
import { Order } from 'src/app/models/Order.model';
import * as fromActions from '../../../+store/order.actions';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.sass'],
})
export class AddOrderComponent implements OnInit {
  subs!: Subscription;
  orders!: Order[];
  order?: Order;
  id!: number;

  addOrderFormData: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    phoneNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    province: ['', [Validators.required]],
    country: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromActions.OrderActions.getAllOrders());

    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      console.log('this.id ->', this.id);
    });

    this.store
      .select(selectAllOrders)
      .pipe(map((ord) => ord.find((or) => or.id == this.id)))
      .subscribe((ord) => {
        if (ord) {
          this.order = ord;
          this.addOrderFormData.setValue({
            firstName: [this.order?.sender?.firstName],
            lastName: [this.order?.sender?.lastName],
            email: [this.order?.sender?.email],
            phoneNumber: [this.order?.sender?.phoneNumber],
            address: [this.order?.sender?.address],
            city: [this.order?.sender?.city],
            province: [this.order?.sender?.province],
            country: [this.order?.sender?.country],
            zipCode: [this.order?.sender?.zipCode],
          });
        } else {
          this.addOrderFormData.reset();
        }
      });
  }

  fieldIsInvalid(field: string) {
    return (
      this.addOrderFormData.controls[field].invalid &&
      this.addOrderFormData.controls[field].touched
    );
  }

  addNewOrder() {
    const order: Order = {
      _id: Number(new Date()),
      sender: this.addOrderFormData.value,
      goods: [],
      receiver: null,
      id: this.id ? this.id : 0,
    };
    this.store.dispatch(fromActions.OrderActions.addOrder({ order }));
    this.addOrderFormData.reset();
    this.router.navigateByUrl(`add-receiver/${order.id}`);
  }
}
