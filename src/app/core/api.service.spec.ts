import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIService } from './api.service';

describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ APIService ]
    });

    service = TestBed.get(APIService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([APIService], (service: APIService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should retreive data from API via GET', () => {
    const expected: string[] = ["people", "planets", "films", "species", "vehicles", "starships"];

    service.getCategories().subscribe(resp => {
      expect(resp.length).toBe(6);
    });

    const request = httpMock.expectOne(`${service.apiURL}`);
    expect(request.request.method).toBe('GET');
    request.flush(expected);

  });

});
