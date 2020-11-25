import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestShortEntryComponent } from './interest-short-entry.component';

describe('InterestShortEntryComponent', () => {
  let component: InterestShortEntryComponent;
  let fixture: ComponentFixture<InterestShortEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestShortEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestShortEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
