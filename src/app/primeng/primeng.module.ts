import { NgModule } from '@angular/core';

// Prime NG modules
import {InputTextModule} from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {OrderListModule} from 'primeng/orderlist';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';



@NgModule({
  declarations: [],
  exports: [
	  InputTextModule,
	  MenubarModule,
    TableModule,
    CardModule,
    ButtonModule,
	  OrderListModule,
    SelectButtonModule,
    ToggleButtonModule,
    ToastModule,
    SidebarModule
  ]
})
export class PrimengModule { }
