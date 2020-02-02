import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login.component';
import { reducer } from './state/user.reducer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
    SharedModule,
    StoreModule.forFeature('user', reducer)
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule {}
