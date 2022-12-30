import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {


	items!: MenuItem[];

	constructor() {}

	ngOnInit(): void {
		this.items = [
			{
				label: 'Orders',
				icon: 'pi pi-fw pi-file',
				routerLink: 'orders'
			},
			{
				label: 'Add Order',
				icon: 'pi pi-fw pi-plus-circle',
				routerLink: 'add-order'
			},
			{
				label: 'Addresses',
				icon: 'pi pi-fw pi-map-marker',
				routerLink: 'addresses'
			},
			{
				label: 'Goods',
				icon: 'pi pi-fw pi-box',
				routerLink: 'goods'
			}
		]
	}


}
