import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, first, Subject, takeUntil } from 'rxjs';
import { AccountService } from '../account.service';
import { IUserEmail } from '../i-user-email.dto';

@Component({
  selector: 'app-confirm-email-resend',
  templateUrl: './confirm-email-resend.component.html',
  styleUrls: ['./confirm-email-resend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmEmailResendComponent implements OnInit, OnDestroy {
  private _subscription = new Subject();
  public requesting: boolean;
  public submitted: boolean = false;
  public resendConfirmEmailForm: UntypedFormGroup;
  public errorObject: any = null;

  resend_confirm_email_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
  };

  constructor(private _formBuilder: UntypedFormBuilder, private _service: AccountService) {}

  ngOnInit(): void {
    this._createForms();
  }

  public onSubmit(formData: IUserEmail): void {
    this.requesting = true;

    this._service.resendEmailConfirmation(formData)
    .pipe(first(), finalize(() => { this.requesting = false; }), takeUntil(this._subscription))
    .subscribe({
      next: () => { this.submitted = true; },
      error: (e) => {
        this.errorObject = e;
      }
    });
  }

  private _createForms(): void {
    this.resendConfirmEmailForm = this._formBuilder.group({
      email: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  ngOnDestroy(): void {
    this._subscription.next('');
    this._subscription.complete();
  }
}
