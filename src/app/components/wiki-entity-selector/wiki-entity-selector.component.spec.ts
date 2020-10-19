import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEntitySelectorComponent } from './wiki-entity-selector.component';

describe('WikiEntitySelectorComponent', () => {
  let component: WikiEntitySelectorComponent;
  let fixture: ComponentFixture<WikiEntitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiEntitySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEntitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
