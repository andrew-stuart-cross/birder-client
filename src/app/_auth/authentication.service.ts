import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IAuthUser } from './i-auth-user.dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _authenticatedUser$: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  // OLD implementation:  isAuthenticated$: Observable<boolean> = this._isAuthenticated$.asObservable();

  constructor(private _token: TokenService, private readonly _router: Router) { }

  public get isAuthorisedObservable(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  // to avoid subscription in component, when it is not neccessary/appropriate...
  public get isAuthorised(): boolean {
    return this._isAuthenticated$.value;
  }

  public get getAuthUser(): Observable<IAuthUser | null> {
    return this._authenticatedUser$.asObservable();
  }

  // This method is used by the Route guards
  public isLoggedIn(): Observable<boolean> {

    if (!this._token.isTokenValid()) {
      this._router.navigate(['/login']);
      return of(false);
    }

    return this._isAuthenticated$.asObservable();
  }

  public checkAuthStatus(): void {
    this._checkAuthStatus();
    this._updateUser();
  }

  public logout(): void {
    this._token.removeToken();
    this.checkAuthStatus();
    this._updateUser();
  }

  private _checkAuthStatus(): void {
    const status = this._token.isTokenValid();
    this._isAuthenticated$.next(status);
  }

  private _updateUser(): void {
    const user = this._token.getUser();
    this._authenticatedUser$.next(user);
  }
}