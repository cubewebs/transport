import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState, ordersReducer } from '../../+store/order.reducers';
import { Store } from '@ngrx/store';
import { Order } from '../../models/Order.model';
import { OrderActions } from '../../+store/order.actions';
import * as fromSelectors from '../../+store/order.selectors';
import { filter, find, map, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Good } from 'src/app/models/Good.interface';
import { Observable, of, timer } from 'rxjs';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.sass']
})
export class GoodsComponent implements OnInit {

	orderId: number = 0;
	orders$: Observable<Order[]> = new Observable();
	actualOrder: Observable<Order | undefined> = new Observable();
	packageFormData!: FormGroup;
	pkgs: Good[] = [];
	selectedPkg?: Good;
	selectedPkgId?: boolean;


	constructor(
		private ar: ActivatedRoute,
		private store: Store<AppState>,
		private fb: FormBuilder
	) {	}

	ngOnInit(): void {
		
		this.store.dispatch(OrderActions.getAllOrders())
		this.store.dispatch(OrderActions.getPackages())
		this.ar.paramMap.subscribe( params => this.orderId = Number(params.get('id')));
		this.store.dispatch(OrderActions.activeOrderId({id: this.orderId}));
		this.initFormData();
		this.getOrderPackages();
		
	}

	initFormData() {
		this.packageFormData = this.fb.group({
			id: [],
			itemName: ['', Validators.required],
			dangerGoods: [false],
			itemDescription: ['', Validators.required],
			individualWeight: [, Validators.required],
			quantity: [, Validators.required],
			totalWeight: [, Validators.required], //TODO: multiply individualWeight times quantity to get total.
			orderId: [this.orderId, Validators.required]
		})
	}

	get dangerGoodsFild() {
		return this.packageFormData.get('dangerGoods') as FormControl;
	}

	get individualWeightFild() {
		return this.packageFormData.get('individualWeight') as FormControl;
	}

	get quantityFild() {
		return this.packageFormData.get('quantity') as FormControl;
	}

	getOrderPackages() {
		setTimeout(() => {
			this.store.select(fromSelectors.selectAllPackages)
			.pipe(
				map( pkgs => pkgs.filter( p => p.orderId === this.orderId))
			).subscribe( pkgs => this.pkgs = pkgs )
		}, 100);
	}

	addPackage() {
		this.store.dispatch(OrderActions.addPackage({ pkg: this.packageFormData.value }));
		this.packageFormData.reset()
	}

	calcTotalWeight(): number {
		return this.individualWeightFild.value * this.quantityFild.value
	}

	selectedPackage(id: number) {
		this.selectedPkg = this.pkgs.find( p => p.id === id )
		if(this.selectedPkg?.id) {
			this.selectedPkgId = true
		} else {
			this.selectedPkgId = false;
		}
		this.packageFormData.setValue({
			id: this.selectedPkg?.id,
			itemName:this.selectedPkg?.itemName,
			dangerGoods: this.selectedPkg?.dangerGoods,
			itemDescription: this.selectedPkg?.itemDescription,
			individualWeight: this.selectedPkg?.individualWeight,
			quantity: this.selectedPkg?.quantity,
			totalWeight: this.selectedPkg!.quantity * this.selectedPkg!.individualWeight,
			orderId: this.selectedPkg?.orderId
		})
	}

	updatePackage() {
		this.store.dispatch(OrderActions.updatePackage({id: this.selectedPkg!.id,  pkg: this.packageFormData.value}));
	}

	addNewPackage() {
		this.packageFormData.reset();
		this.selectedPkgId = false;
	}

}
