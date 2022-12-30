import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/Order.model';
import * as fromActions from '../../../+store/order.actions';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.sass']
})
export class AddOrderComponent {

  addOrderFormData: FormGroup = this.fb.group({
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
    private store: Store,
    private router: Router
  ) {}

  fieldIsInvalid( field: string ) {
    return this.addOrderFormData.controls[field].invalid
           &&
           this.addOrderFormData.controls[field].touched
  }

  addNewOrder() {
    const order: Order = {
      _id: Number(new Date()),
      sender: this.addOrderFormData.value,
      goods: [],
      receiver: null,
      id: 0,
    }
    this.store.dispatch(fromActions.OrderActions.addOrder({order}))
    this.router.navigateByUrl(`add-receiver/${order.id}`)
  }

}
