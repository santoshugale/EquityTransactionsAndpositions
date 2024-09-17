import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PositionsService } from './positions.service';
import { Positions } from './positions';
import { provideHttpClient } from '@angular/common/http';

describe('PositionsService', () => {
  let service: PositionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PositionsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PositionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch positions', () => {
    const dummyPositions: Positions[] = [
      { securityCode: 'ABC', quantity: 100 },
      { securityCode: 'XYZ', quantity: 200 }
    ];

    service.getPositions().subscribe(positions => {
      expect(positions.length).toBe(2);
      expect(positions).toEqual(dummyPositions);
    });

    const req = httpMock.expectOne('http://localhost:5150/Positions');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPositions);
  });
});
