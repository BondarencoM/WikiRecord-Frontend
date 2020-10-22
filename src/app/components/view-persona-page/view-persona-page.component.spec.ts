import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonaPageComponent } from './view-persona-page.component';

describe('ViewPersonaPageComponent', () => {
  let component: ViewPersonaPageComponent;
  let fixture: ComponentFixture<ViewPersonaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPersonaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPersonaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
