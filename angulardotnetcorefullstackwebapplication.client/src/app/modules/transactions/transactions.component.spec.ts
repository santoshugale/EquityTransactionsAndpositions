import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { TransactionsComponent } from './transactions.component';
import { TransactionsService } from './transactions.service';
import { of } from 'rxjs';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let transactionsServiceMock: any;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    transactionsServiceMock = {
      getTransactions: jasmine.createSpy('getTransactions').and.returnValue(of([
        { transactionID: 1, tradeID: 101, version: 1, securityCode: 'ABC', quantity: 100, tradeType: 'Buy', tradeAction: 'Open' },
        { transactionID: 2, tradeID: 102, version: 1, securityCode: 'XYZ', quantity: 200, tradeType: 'Sell', tradeAction: 'Close' }
      ]))
    };

    TestBed.configureTestingModule({
      declarations: [TransactionsComponent],
      providers: [
        { provide: TransactionsService, useValue: transactionsServiceMock },
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch transactions on init', () => {
    component.ngOnInit();
    expect(transactionsServiceMock.getTransactions).toHaveBeenCalled();
    expect(component.transactions.length).toBe(2);
  });

  it('should render transactions in the table', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(2);
    expect(compiled.querySelector('tbody tr:first-child td:first-child').textContent).toContain('1');
    expect(compiled.querySelector('tbody tr:last-child td:first-child').textContent).toContain('2');
  });

  it('should display "No Transactions" when no transactions ', () => {
    component.transactions = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('No Transactions');
  });
});
