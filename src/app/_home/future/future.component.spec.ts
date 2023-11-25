import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { FutureComponent } from './future.component';

describe('FutureComponent', () => {
  let component: FutureComponent;
  let fixture: ComponentFixture<FutureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [NgbNavModule, FutureComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
