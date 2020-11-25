import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaNameButtonComponent } from './persona-name-button.component';

describe('PersonaNameButtonComponent', () => {
  let component: PersonaNameButtonComponent;
  let fixture: ComponentFixture<PersonaNameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaNameButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaNameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
