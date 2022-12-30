import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { Order } from '../models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  addOrder(order: Order): Observable<Order> {
    const url = `${this.baseUrl}/orders`;
    return this.http.post<Order>( url, order );
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
}
