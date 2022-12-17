import { NgModule } from '@angular/core';

// Prime NG modules
import {InputTextModule} from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [],
  exports: [
	InputTextModule,
	MenubarModule,
    TableModule
  ]
})
export class PrimengModule { }
