import { NgModule } from '@angular/core';

// Prime NG modules
import {InputTextModule} from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [],
  exports: [
	  InputTextModule,
	  MenubarModule,
    TableModule,
    CardModule,
    ButtonModule
  ]
})
export class PrimengModule { }
