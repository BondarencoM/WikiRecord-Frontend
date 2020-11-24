import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { expectSuccessWith } from 'src/test/utils/utils';
import { PersonaWithInterests } from '../models/persona/PersonaWithInterests';

import { PersonasService } from './personas.service';

describe('PersonasService', () => {
  let service: PersonasService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PersonasService);
  });

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get persona with interest', () => {

    const persona = new PersonaWithInterests({name: 'Testing Name'})

    service.find(1).subscribe(expectSuccessWith(persona))

    const req = httpTestingController.expectOne(environment.personasServiceURL + '/1/recommendations')
    expect(req.request.method).toEqual('GET');
    req.flush(persona)

  });

  it('should get personas for discovery', () => {

    const personas = [
      new PersonaWithInterests({name: 'Testing Name'}),
      new PersonaWithInterests({name: 'Naming Test'}),
    ]

    service.getRecommendedPersonas().subscribe(expectSuccessWith(personas))

    const req = httpTestingController.expectOne(environment.personasServiceURL + '/discover')
    expect(req.request.method).toEqual('GET');
    req.flush(personas)

  });


});

