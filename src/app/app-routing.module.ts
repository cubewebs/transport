import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './views/orders/orders.component';
import { AddressesComponent } from './views/addresses/addresses.component';
import { GoodsComponent } from './views/goods/goods.component';

const routes: Routes = [
	{ path: 'orders', component: OrdersComponent },
	{ path: 'addresses', component: AddressesComponent },
	{ path: 'goods', component: GoodsComponent },
	{ path: '', component: OrdersComponent },
	{ path: '**', redirectTo: 'orders'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
