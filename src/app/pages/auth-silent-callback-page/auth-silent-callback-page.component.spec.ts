import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSilentCallbackPageComponent } from './auth-silent-callback-page.component';

describe('AuthSilentCallbackPageComponent', () => {
  let component: AuthSilentCallbackPageComponent;
  let fixture: ComponentFixture<AuthSilentCallbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSilentCallbackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSilentCallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
