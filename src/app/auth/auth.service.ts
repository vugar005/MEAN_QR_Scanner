import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {empty, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {AuthData} from './auth-data.model';
import {User} from './models/user.model';
import {SharedService} from '../shared/shared.service';
import {environment} from '../../environments/environment';
import {catchError, delay, map, shareReplay} from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  user: User;
  private authStatusListener = new ReplaySubject<boolean>();

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string): Observable<any> {
    const authData: AuthData = { email: email, password: password };
    return this.http
      .post<{ token: string; expiresIn: number; user: User }>(`${BACKEND_URL}/signup`, authData)
      .pipe(
        shareReplay(),
        map(response => {
          const token = response.token;
          const fetchedUser = response.user;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.user = fetchedUser;
            const now = new Date();
            console.log(this.user);
            console.log(expiresInDuration);
            const expirationDate = new Date(now.getTime() + expiresInDuration * 10000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, fetchedUser);
            this.router.navigate(['/']);
          }
        }),
        catchError((er) => {
          if (er.error.error.errors.email.kind === 'unique') {
            this.sharedService.createNotification('error', 'Bu user artıq qeydiyyatdan keçib', 'OOPS');
          } else {
            this.sharedService.createNotification('error', 'Xeta bash verdi', 'OOPS');
          }
          return empty();
        })
      );
  }

  login(email: string, password: string): Observable<any> {
    const authData: AuthData = { email: email, password: password };
    return this.http
      .post<{ token: string; expiresIn: number; user: User }>(
        `${BACKEND_URL}/login`,
        authData
      )
      .pipe(
        shareReplay(),
        map(response => {
        const token = response.token;
        const fetchedUser = response.user;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.user = fetchedUser;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 10000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, fetchedUser);
          this.router.navigate(['/']);
        }
      }),
        catchError((er) => {
            if (er.error['message'] === 'Auth failed') {
              // return empty();
               return of(this.sharedService.createNotification('error', 'Wrong username or password', 'OOPS'));
            }
            return of(this.sharedService.createNotification('error', 'Unexpeced error', 'OOPS'));
          }
        ));
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('qr_user', JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('qr_user');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = JSON.parse(localStorage.getItem('qr_user'));
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user: user
    };
  }
}
