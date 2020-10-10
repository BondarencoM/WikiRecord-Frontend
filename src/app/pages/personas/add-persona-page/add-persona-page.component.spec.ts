import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonaPageComponent } from './add-persona-page.component';

describe('AddPersonaPageComponent', () => {
  let component: AddPersonaPageComponent;
  let fixture: ComponentFixture<AddPersonaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
