import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './home/page-not-found.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot([
      {
        children: [
          { path: 'welcome', component: WelcomeComponent },
          { path: 'products', loadChildren: () => import('./products/product.module').then((m) => m.ProductModule) },
          { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        ],
        component: ShellComponent,
        path: '',
      },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
})
export class AppRoutingModule {}
