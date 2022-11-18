import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/_auth/authentication.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TokenService } from 'src/app/_auth/token.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let mockAuthenticationService;

  let isAuthenticated: boolean;

  beforeEach(async () => {
    mockAuthenticationService = jasmine.createSpyObj(['checkIsAuthenticatedObservable']);

    TestBed.configureTestingModule({
      imports: [NgbNavModule,
        RouterTestingModule.withRoutes([
          // { path: 'login', component: DummyLoginLayoutComponent },
        ])
      ],
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TokenService, useValue: mockAuthenticationService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    // mockAuthenticationService.checkIsAuthenticatedObservable.and.returnValue(of(isAuthenticated));
    // fixture.detectChanges();
  });

  it('should create', () => {
    // isAuthenticated = true;
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
