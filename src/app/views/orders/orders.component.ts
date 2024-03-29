import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Order } from 'src/app/models/Order.model';
import * as fromSelectors from '../../+store/order.selectors';
import * as fromActions from '../../+store/order.actions';
import { AppState } from 'src/app/+store/order.reducers';
import { map, Observable, of, tap } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Receiver } from 'src/app/models/Receiver.interface';
import { OrdersService } from 'src/app/services/orders.service';

interface FlattenFlattenResponseList {
  id: number,
  fname: string,
  lname: string,
  email: string,
  phoneNumber: string,
  receiver: Receiver,
  isPkg: boolean,
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [MessageService]
})
export class OrdersComponent implements OnInit{

  orders: FlattenFlattenResponseList[] = [];
  pkgsId: number[] = [];
  sidebarVisible: boolean = false;

  constructor(
    private store: Store<AppState>,
	  private router: Router,
    private ms: MessageService,
    private ordersServicce: OrdersService
  ) { 
    
  }
    
  ngOnInit(): void {

    this.store.dispatch(fromActions.OrderActions.getAllOrders());

    this.store.select<Order[]>(fromSelectors.selectAllOrders).pipe(
      map( o => this.flattenResponse(o)),
    ).subscribe( o => this.orders = o );
    setTimeout(() => {
      console.log('this.orders ->', this.orders)
    }, 300);

    this.store.dispatch(fromActions.OrderActions.getPackages());

    this.store.select(fromSelectors.selectAllPackages).subscribe( p => p.map( i => this.pkgsId.push(i.orderId)))



    this.ordersServicce.openPlausi$.subscribe( toggle => {
      if(toggle) {
        setTimeout(() => {
          this.showMultiple();
        }, 900);
      }
    })

  }

  refresh(query: any) {
    if(query.value == '') {
      console.log('empty'); // search table is triggered wen empty value
      
    }
  }

  flattenResponse(res: any) {
    let result: any = [];

    setTimeout(() => {
      res.forEach((element: any) => {

        let obj = {
          id: element.id,
          fname: element.sender?.firstName,
          lname: element.sender?.lastName,
          email: element.sender?.email,
          phoneNumber: element.sender?.phoneNumber,
          receiver: element.receiver,
          isPkg: this.pkgsId.includes(element.id)
        }
        result.push(obj)
  
      });
    }, 300);

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
    this.store.dispatch(fromActions.OrderActions.deleteOrder({ id }));
    this.ngOnInit();
  }

  showMultiple() {
    this.sidebarVisible = true;
    const messages: any = []
    this.orders.forEach( o => {
      if(!o.receiver){
        messages.push({ life: 9999000000000, key: 'plausi', severity: 'error', summary: `Missing Receiver`, detail: `${o.fname} ${o.lname} you need to enter a receiver for your order` })
      }
      if(!o.isPkg) {
        messages.push({ life: 9999000000000, key: 'plausi', severity: 'error', summary: `Missing Goods`, detail: `${o.fname} ${o.lname} you need to enter the goods for your order` })
      }
    })
    this.ms.addAll(messages);
  }

}
