import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { AuthService } from './auth.service';

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
    private readonly store: Store<any>,
  ) {}

  public ngOnInit(): void {
    this.store.pipe(select('user')).subscribe((user) => {
      if (user) {
        this.maskUserName = user.maskUserName;
      }
    });
  }

  public cancel(): void {
    this.router.navigate(['welcome']);
  }

  public checkChanged(value: boolean): void {
    this.store.dispatch({
      payload: value,
      type: 'TOGGLE_USER_NAME_MASK',
    });
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
