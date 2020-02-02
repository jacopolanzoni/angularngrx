import { Injectable } from '@angular/core';

import { IUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    public currentUser: IUser | null;
    public redirectUrl: string;

    public isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    public login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.currentUser = {
            id: 2,
            isAdmin: false,
            userName,
        };
    }

    public logout(): void {
        this.currentUser = null;
    }
}
