import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverPersonasViewComponent } from './discover-personas-view.component';

describe('DiscoverPersonasViewComponent', () => {
  let component: DiscoverPersonasViewComponent;
  let fixture: ComponentFixture<DiscoverPersonasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ DiscoverPersonasViewComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverPersonasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
