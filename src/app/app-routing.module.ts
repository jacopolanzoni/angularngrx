import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './home/page-not-found.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ShellComponent,
        children: [
          { path: 'welcome', component: WelcomeComponent },
          {
            path: 'products',
            // canActivate: [AuthGuard],
            loadChildren: () =>
              import('./products/product.module').then(m => m.ProductModule)
          },
          { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        ]
      },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
