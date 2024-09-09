import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { PositionsComponent } from './positions.component';
import { PositionsService } from './positions.service';
import { of } from 'rxjs';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PositionsComponent', () => {
  let component: PositionsComponent;
  let fixture: ComponentFixture<PositionsComponent>;
  let positionsServiceMock: any;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    positionsServiceMock = {
      getPositions: jasmine.createSpy('getPositions').and.returnValue(of([
        { securityCode: 'ABC', quantity: 100 },
        { securityCode: 'XYZ', quantity: 200 }
      ]))
    };

    TestBed.configureTestingModule({
      declarations: [PositionsComponent],
      providers: [
        { provide: PositionsService, useValue: positionsServiceMock },
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch positions on init', () => {
    component.ngOnInit();
    expect(positionsServiceMock.getPositions).toHaveBeenCalled();
    expect(component.positions.length).toBe(2);
  });

  it('should render positions in the table', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(2);
    expect(compiled.querySelector('tbody tr:first-child td:first-child').textContent).toContain('ABC');
    expect(compiled.querySelector('tbody tr:last-child td:first-child').textContent).toContain('XYZ');
  });

  it('should display "Loading..." when positions are not yet loaded', () => {
    component.positions = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Loading... Please refresh once the ASP.NET backend has started.');
  });
});
