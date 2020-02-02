import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { reducer } from './state/user.reducer';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ]),
    SharedModule,
    StoreModule.forFeature('user', reducer),
  ],
})
export class UserModule {}
