import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonaPageComponent } from './add-persona-page.component';

describe('AddPersonaPageComponent', () => {
  let component: AddPersonaPageComponent;
  let fixture: ComponentFixture<AddPersonaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
