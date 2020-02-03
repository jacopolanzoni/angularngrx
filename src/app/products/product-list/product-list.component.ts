import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { InitialiseCurrentProduct, SetCurrentProduct, ToggleProductCode } from '../state/product.actions';
import { getCurrentProduct, getShowProductCode, IState } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  styleUrls: ['./product-list.component.css'],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {

  public displayCode: boolean;
  public errorMessage: string;
  public pageTitle = 'Products';
  public products: IProduct[];
  public selectedProduct: IProduct | null;

  constructor(
    private readonly productService: ProductService,
    private readonly store: Store<IState>,
  ) { }

  public ngOnInit(): void {
    this.store.pipe(select(getCurrentProduct)).subscribe(
      (currentProduct: IProduct) => this.selectedProduct = currentProduct,
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

  public checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  public newProduct(): void {
    this.store.dispatch(new InitialiseCurrentProduct());
  }

  public productSelected(product: IProduct): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }

}
