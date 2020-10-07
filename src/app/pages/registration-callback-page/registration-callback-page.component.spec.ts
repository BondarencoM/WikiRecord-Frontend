import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCallbackPageComponent } from './registration-callback-page.component';

describe('RegistrationCallbackPageComponent', () => {
  let component: RegistrationCallbackPageComponent;
  let fixture: ComponentFixture<RegistrationCallbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationCallbackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
