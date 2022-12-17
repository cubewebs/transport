import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { OrdersComponent } from './views/orders/orders.component';
import { AddressesComponent } from './views/addresses/addresses.component';
import { GoodsComponent } from './views/goods/goods.component';
import { PrimengModule } from './primeng/primeng.module';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    AddressesComponent,
    GoodsComponent,
    NavbarComponent
  ],
  imports: [
	AppRoutingModule,
    BrowserModule,
	BrowserAnimationsModule,
	PrimengModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
