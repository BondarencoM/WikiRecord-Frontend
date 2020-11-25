import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthSignoutCallbackPageComponent } from './auth-signout-callback-page.component';

describe('AuthSignoutCallbackPageComponent', () => {
  let component: AuthSignoutCallbackPageComponent;
  let fixture: ComponentFixture<AuthSignoutCallbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AuthSignoutCallbackPageComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignoutCallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
