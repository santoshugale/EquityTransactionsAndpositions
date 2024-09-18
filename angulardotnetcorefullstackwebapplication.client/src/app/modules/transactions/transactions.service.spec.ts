import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction';
import { HttpRequest, provideHttpClient } from '@angular/common/http';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions', () => {
    const dummyTransactions: Transaction[] = [
      {
          transactionID: 1, securityCode: 'rel',
          tradeID: 0,
          version: 0,
          quantity: 0,
          tradeType: '',
          tradeAction: ''
      },
      {
          transactionID: 2, securityCode: 'inf',
          tradeID: 0,
          version: 0,
          quantity: 0,
          tradeType: '',
          tradeAction: ''
      }
    ];

    service.getTransactions().subscribe(transactions => {
      expect(transactions.length).toBe(2);
      expect(transactions).toEqual(dummyTransactions);
    });

    const req = httpMock.expectOne((req: HttpRequest<any>) => { return req.url.toLowerCase().includes('api/transaction') });
    expect(req.request.method).toBe('GET');
    req.flush(dummyTransactions);
  });
});
