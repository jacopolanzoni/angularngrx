import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { reducer } from './state/product.reducer';

@NgModule({
  declarations: [
    ProductEditComponent,
    ProductListComponent,
    ProductShellComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductShellComponent },
    ]),
    SharedModule,
    StoreModule.forFeature('products', reducer),
  ],
})
export class ProductModule {}
