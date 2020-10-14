import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterestPageComponent } from './add-interest-page.component';

describe('AddInterestPageComponent', () => {
  let component: AddInterestPageComponent;
  let fixture: ComponentFixture<AddInterestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
