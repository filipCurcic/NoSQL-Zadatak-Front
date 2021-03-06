import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  roleChanged = new Subject<any[]>();
  tokenChanged = new Subject<any[]>();
  loggedInStatusChanged = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  login(em: string, pin: string) {
    this.http.post<{ accessToken: string }>('http://localhost:8080/login/', { email: em, lozinka: pin }).subscribe(response => {
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        this.roleChanged.next(this.getCurrentRoles());
        this.tokenChanged.next(this.getTokenExpired());
        console.log(this.getTokenExpired)
        this.router.navigate(['/display']);
        this.loggedInStatusChanged.next(true);

      }
    });
  }

  logout() {
    this.roleChanged.next([]);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
    this.loggedInStatusChanged.next(false);
  }


  getCurrentRoles() {
    const accessToken = localStorage.getItem('accessToken');
    const roles = [];
    if (accessToken) {
      decode(accessToken).role.forEach(role => {
        roles.push(role.authority);
      });
    }
    return roles;
  }

  getCurrentUser() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return decode(accessToken).uniq;
    }
    return null;
  }

  getTokenExpired() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return decode(accessToken).exp;
    }

    return null;
  }

  isLoggedIn() {
    if (localStorage.getItem('accessToken')) {
      console.log("servis radi")
      return true;
    }
    return false;
  }



}
