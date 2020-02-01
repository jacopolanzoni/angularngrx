import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public displayCode: boolean;
  public errorMessage: string;
  public pageTitle = 'Products';
  public products: Product[];
  public selectedProduct: Product | null;
  public sub: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly store: Store<any>
  ) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => this.errorMessage = err.error
    });

    // TODO: Unsubscribe
    this.store.pipe(select('products')).subscribe((products) => {
      if (products) {
        this.displayCode = products.showProductCode;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
