import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Order } from 'src/app/models/Order.model';
import * as fromSelectors from '../../+store/order.selectors';
import * as fromActions from '../../+store/order.actions';
import { AppState } from 'src/app/+store/order.reducers';
import { map, Observable, of, tap } from 'rxjs';
import { delay, pluck, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Receiver } from 'src/app/models/Receiver.interface';
import { OrdersService } from 'src/app/services/orders.service';

interface FlattenResponseList {
  id: number,
  fname: string,
  lname: string,
  email: string,
  phoneNumber: string,
  receiver: Receiver,
  isPkg: boolean,
  state: number,
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [MessageService]
})
export class OrdersComponent implements OnInit, AfterViewInit {

  orders: FlattenResponseList[] = [];
  pkgsId: number[] = [];
  sidebarVisible: boolean = false;
  messages: any = [];
  colorArray: string[] = [];

  constructor(
    private store: Store<AppState>,
	  private router: Router,
    private ms: MessageService,
    private ordersServicce: OrdersService
  ) { 
    
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showMultiple();
    }, 600);
  }
    
  ngOnInit(): void {

    this.store.dispatch(fromActions.OrderActions.getAllOrders());

    this.store.select<Order[]>(fromSelectors.selectAllOrders).pipe(
      map( o => this.flattenResponse(o)),
    ).subscribe( o => {
      this.orders = o;
    } );

    this.showStatus();

    this.store.dispatch(fromActions.OrderActions.getPackages());

    this.store.select(fromSelectors.selectAllPackages).subscribe( p => p.map( i => this.pkgsId.push(i.orderId)))

    this.ordersServicce.onShowInfo(this.messages);

    this.ordersServicce.openPlausi$.subscribe( toggle => {

      if(toggle) {

        this.sidebarVisible = true;
        
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
          isPkg: this.pkgsId.includes(element.id),
          status: element.status ? element.status : 3
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

  onCopyTemplate(id: number) {
    const copiedOrder = this.orders.filter( order => order.id === id)
    this.ordersServicce.copyTemplate(id)
  }

  showMultiple() {

    this.orders.forEach( o => {

      if(!o.receiver){
        this.messages.push({ life: 9999000000000, key: 'plausi', severity: 'error', summary: `Missing Receiver`, detail: `${o.fname} ${o.lname} you need to enter a receiver for your order` })
      }

      if(!o.isPkg) {
        this.messages.push({ life: 9999000000000, key: 'plausi', severity: 'error', summary: `Missing Goods`, detail: `${o.fname} ${o.lname} you need to enter the goods for your order` })
      }

    })

    this.ms.addAll(this.messages);

  }

  showStatus() {
    setTimeout(() => {
      if(this.orders) {
        this.orders.forEach((element: any) => {
          this.colorArray.push(this.getStatusColor(element.status))
        });
        this.orders.forEach((el: any, i: number) => {
          let colorDiv = document.getElementsByClassName('statusCircle')[i];
          colorDiv.classList.add(this.colorArray[i])
        })
      }
    }, 500);
  }

  getStatusColor(state: number) {
    switch (state) {
      case 1:
        return 'bgGreen';
      
      case 2:
        return 'bgYellow';

      case 3:
        return 'bgRed'
    
      default:
        return 'bgGray';
    }
  }

}
