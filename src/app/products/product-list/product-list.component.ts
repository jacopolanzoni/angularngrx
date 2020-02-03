import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { getShowProductCode, IState } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  styleUrls: ['./product-list.component.css'],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {

  public displayCode: boolean;
  public errorMessage: string;
  public pageTitle = 'Products';
  public products: IProduct[];
  public selectedProduct: IProduct | null;
  public sub: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly store: Store<IState>,
  ) { }

  public ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => this.selectedProduct = selectedProduct,
    );

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => this.products = products,
      (err: any) => this.errorMessage = err.error,
    );

    // TODO: Unsubscribe
    this.store.pipe(select(getShowProductCode)).subscribe((showProductCode: boolean) => {
      this.displayCode = showProductCode;
    });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public checkChanged(value: boolean): void {
    this.store.dispatch({
      payload: value,
      type: 'TOGGLE_PRODUCT_CODE',
    });
  }

  public newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  public productSelected(product: IProduct): void {
    this.productService.changeSelectedProduct(product);
  }

}
