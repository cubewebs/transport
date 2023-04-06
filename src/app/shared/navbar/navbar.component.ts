import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {


	items!: MenuItem[];
	togglable: boolean = false;

	constructor(
		private ordersService: OrdersService
	) {}

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
			}
		]
	}

	onPlausi() {
		
		this.ordersService.openPlausiCheck(this.togglable = !this.togglable)
	}

}
