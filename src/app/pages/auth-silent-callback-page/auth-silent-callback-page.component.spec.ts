import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthSilentCallbackPageComponent } from './auth-silent-callback-page.component';

describe('AuthSilentCallbackPageComponent', () => {
  let component: AuthSilentCallbackPageComponent;
  let fixture: ComponentFixture<AuthSilentCallbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AuthSilentCallbackPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSilentCallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
