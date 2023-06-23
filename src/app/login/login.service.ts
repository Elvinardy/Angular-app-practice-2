import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  isLoggedIn: boolean = false;

  isAdmin: boolean = false;

  constructor() { }

  login(email: string, password: string) {
    if (email === 'admin@email.com' && password === 'admin') {
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if(email === "user@email.com" && password === 'user') {
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }
}
