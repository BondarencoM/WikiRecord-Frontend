import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ViewPersonaPageComponent } from './view-persona-page.component';

describe('ViewPersonaPageComponent', () => {
  let component: ViewPersonaPageComponent;
  let fixture: ComponentFixture<ViewPersonaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ViewPersonaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPersonaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
