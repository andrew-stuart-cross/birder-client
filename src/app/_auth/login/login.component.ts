import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { Ilogin } from './ilogin.dto';
import { LoginService } from './login.service';
import { AuthenticationFailureReason } from '../authentication-failure-reason';
import { NavigationService } from 'src/app/_sharedServices/navigation.service';
import { IAuthenticationResult } from '../i-authentication-result.dto';
import { TokenService } from '../token.service';
import { LoadingComponent } from '../../_loading/loading/loading.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, RouterLink, LoadingComponent]
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subscription = new Subject();
  public requesting: boolean;
  public loginForm: FormGroup;
  public submitProgress: 'idle' | 'success' | 'error' = 'idle';

  constructor(private readonly _service: LoginService
    , private readonly _token: TokenService
    , private readonly _authService: AuthenticationService
    , private readonly _router: Router
    , private readonly _formBuilder: FormBuilder
    , private readonly _navigation: NavigationService) { }

  ngOnInit(): void {
    this._authService.logout();
    this._createForm();
  }

  public onSubmit(formData: any): void {
    if (!this.loginForm.valid) return;
    this.requesting = true;
    const model = this._mapFormToModel(formData)

    this._service.login(model)
      .pipe(finalize(() => { this.requesting = false; }), takeUntil(this._subscription))
      .subscribe({
        next: (r) => {
          this.submitProgress = 'success';
          this._handleSuccess(r);
          this._navigation.back();
        },
        error: (e) => {
          this.submitProgress = 'error';
          this._handleError(e);
        }
      })
  }

  private _mapFormToModel(formData: any): Ilogin {
    return <Ilogin>{
      userName: formData.username,
      password: formData.password,
      rememberMe: formData.rememberMe
    }
  }

  private _handleSuccess(response: IAuthenticationResult): void {
    this._token.addToken(response.authenticationToken);
    this._authService.checkAuthStatus();
  }

  // ToDo: decide on the best approach.
  // Not all errors will be the AuthenticationFailureReason - what about connectivity errors etc?
  private _handleError(error: AuthenticationFailureReason): void {
    switch (error) {
      case AuthenticationFailureReason.EmailConfirmationRequired: {
        this._router.navigate(['/confirm-email']);
        break;
      }
      case AuthenticationFailureReason.LockedOut: {
        // todo: built component with message to contact admin
        break;
      }
      default: {
        break;
      }
    }
  }

  private _createForm(): void {
    this.loginForm = this._formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      rememberMe: new FormControl(false)
    });
  }

  ngOnDestroy(): void {
    this._subscription.next('');
    this._subscription.complete();
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }
}