import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USERNAME_KEY = 'USERNAME';
  private readonly ROLE_KEY = 'ROLE';
  private readonly USER_ID = 'USERID';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private http = inject(HttpClient);
  private router = inject(Router);

  private expirationTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private inrouter: Router) {
    this.checkTokenExpiration();
  }

  login(user: { username: string; password: string }): Observable<any> {
    
    return this.http.post<any>('/api/auth/login', user).pipe(
      tap(response => this.doLoginUser(response))
    );
  }

  private doLoginUser(response: any) {
    // Backend renvoie: token, username, role, userId
    localStorage.setItem(this.JWT_TOKEN, response.token);
    localStorage.setItem(this.USERNAME_KEY, response.username);
    localStorage.setItem(this.ROLE_KEY, response.role)
    localStorage.setItem(this.USER_ID, String(response.id));

    this.isAuthenticatedSubject.next(true);

    this.checkTokenExpiration();

    // here we do the redirection after log in
    this.router.navigate(['/home']);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  logout() {

    if (this.expirationTimer){
      clearTimeout(this.expirationTimer);
      this.expirationTimer = undefined;
    }

    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.ROLE_KEY)
    localStorage.removeItem(this.USER_ID);

    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/authentication']);
  }
  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
  /*private hasToken(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }*/

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getUserId(): string | null{
    return (localStorage.getItem(this.USER_ID));
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }


  private getTokenExpiration(token: string): number | null {
    try {
      const payload = token.split('.')[1];

      if (!payload) return null;

      const base64 = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const decoded = JSON.parse(atob(base64));
      return typeof decoded.exp === 'number'
        ? decoded.exp * 1000
        : null;
    } catch {
      return null;
    }
  }

  checkTokenExpiration(): void {
    const token = localStorage.getItem('JWT_TOKEN');

    if (!token) return;

    const expiration = this.getTokenExpiration(token);

    
    if (expiration === null) return;

    const remainingTime = expiration - Date.now();

    if (remainingTime <= 0) {
      this.logout();
      return;
    }

    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, remainingTime);
  }

}
