import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './+store/order.effects';
import { ordersReducer } from './+store/order.reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './views/orders/orders.component';
import { AddressesComponent } from './views/addresses/addresses.component';
import { GoodsComponent } from './views/goods/goods.component';
import { PrimengModule } from './primeng/primeng.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AddOrderComponent } from './views/orders/add-order/add-order.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddReceiverComponent } from './views/addresses/add-receiver/add-receiver.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    AddressesComponent,
    GoodsComponent,
    NavbarComponent,
    AddOrderComponent,
    AddReceiverComponent,
  ],
  imports: [
	  AppRoutingModule,
    BrowserModule,
	  BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
	  PrimengModule,
    ReactiveFormsModule,
    StoreModule.forRoot({orders: ordersReducer}),
    EffectsModule.forRoot([OrderEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: true, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
