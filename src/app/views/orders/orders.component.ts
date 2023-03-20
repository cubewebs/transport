import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Order } from 'src/app/models/Order.model';
import * as fromSelectors from '../../+store/order.selectors';
import * as fromActions from '../../+store/order.actions';
import { AppState } from 'src/app/+store/order.reducers';
import { map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

interface ResponseList {
  id: number,
  fname: string,
  lname: string,
  email: string,
  phoneNumber: string
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders: ResponseList[] = [];

  constructor(
    private store: Store<AppState>,
	  private router: Router
  ) { 
    
    this.store.dispatch(fromActions.OrderActions.getAllOrders());

    this.store.select<Order[]>(fromSelectors.selectAllOrders).pipe(
      map( o => this.flattenResponse(o))
    ).subscribe( o => this.orders = o )

  }
    
  ngOnInit(): void {}

  flattenResponse(res: any) {
    let result: any = [];

    res.forEach((element: any) => {

      let obj = {
        id: element.id,
        fname: element.sender?.firstName,
        lname: element.sender?.lastName,
        email: element.sender?.email,
        phoneNumber: element.sender?.phoneNumber,
      }
      result.push(obj)

    });

    return result
  }

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
