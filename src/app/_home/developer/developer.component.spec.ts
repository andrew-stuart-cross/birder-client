import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { DeveloperComponent } from './developer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeveloperComponent', () => {
  let component: DeveloperComponent;
  let fixture: ComponentFixture<DeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [NgbNavModule, DeveloperComponent, RouterTestingModule]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
