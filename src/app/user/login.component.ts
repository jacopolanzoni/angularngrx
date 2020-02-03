import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { IState } from '../state/app.state';
import { AuthService } from './auth.service';
import { MaskUserName } from './state/user.actions';
import { getMaskUserName } from './state/user.reducer';

@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public errorMessage: string;
  public maskUserName: boolean;
  public pageTitle = 'Log In';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<IState>,
  ) {}

  public ngOnInit(): void {
    this.store.pipe(select(getMaskUserName)).subscribe((maskUserName: boolean) => {
      this.maskUserName = maskUserName;
    });
  }

  public cancel(): void {
    this.router.navigate(['welcome']);
  }

  public checkChanged(value: boolean): void {
    this.store.dispatch(new MaskUserName(value));
  }

  public login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
