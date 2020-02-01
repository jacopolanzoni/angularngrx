import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { reducer } from './state/product.reducer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductShellComponent }
    ]),
    SharedModule,
    StoreModule.forFeature('products', reducer)
  ],
  declarations: [
    ProductEditComponent,
    ProductListComponent,
    ProductShellComponent
  ]
})
export class ProductModule {}
