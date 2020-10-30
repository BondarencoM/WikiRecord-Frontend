import { HttpClientTestingModule  } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEntitySelectorComponent } from './wiki-entity-selector.component';

describe('WikiEntitySelectorComponent', () => {
  let component: WikiEntitySelectorComponent<unknown>;
  let fixture: ComponentFixture<WikiEntitySelectorComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
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
