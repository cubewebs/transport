import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { Good } from '../models/Good.interface';

import { Order } from '../models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl: string = 'http://localhost:3000';

  refreshSubject$ = new Subject();
  openPlausi$ = new Subject();
  missingData = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  deleteRefresh(orders: Order[]) {
    this.refreshSubject$.next(orders);
  }

  openPlausiCheck(toggle: boolean) {
    this.openPlausi$.next(toggle)
  }

  onShowInfo(data: any) {
    this.missingData.next(data);
  }

  addOrder(order: Order): Observable<Order> {
    const url = `${this.baseUrl}/orders`;
    return this.http.post<Order>( url, order );
  }

  deleteOrder( id: number ): Observable<Order> {
    const url = `${this.baseUrl}/orders/${id}`;
    return this.http.delete<Order>( url )
  }

  getAllOrders(): Observable<Order[]> {
    const url = `${this.baseUrl}/orders`;
    return this.http.get<Order[]>( url )
            .pipe(map((orders) => orders || []))
  }

  getOrderById(id: number): Observable<Order> {
    const url = `${this.baseUrl}/orders/${id}`;
    return this.http.get<Order>( url )
  }

  updateOrderById(id: number, order: Order): Observable<Order> {
    const url = `${this.baseUrl}/orders/${id}`;
    return this.http.put<Order>( url, order )
  }

  addPackage(pkg: Good): Observable<Good> {
    const url = `${this.baseUrl}/goods`;
    return this.http.post<Good>( url, pkg )
  }

  getPackages(): Observable<Good[]> {
    const url = `${this.baseUrl}/goods`;
    return this.http.get<Good[]>( url ).pipe(map(pkgs => pkgs || []))
  }

  updatePackage( id: number, pkg: Good ) {
    const url = `${this.baseUrl}/goods/${id}`;
    return this.http.put<Good>( url, pkg )
  }

  deletePackage( id: number ): Observable<Good> {
    const url = `${this.baseUrl}/goods/${id}`;
    return this.http.delete<Good>( url )
  }

}
