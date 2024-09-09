import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TransactionsService } from './components/transactions/transactions.service';
import { of } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent { }

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DummyComponent],
      imports: [RouterModule.forRoot([
        { path: 'transactions', component: DummyComponent },
        { path: 'positions', component: DummyComponent }
      ])],
      providers: [{}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Equity Transactions and positions');
  });

  it('should navigate to "transactions" route', waitForAsync(() => {
    router.navigate(['/transactions']).then(() => {
      expect(location.path()).toBe('/transactions');
    });
  }));

  it('should navigate to "positions" route', waitForAsync(() => {
    router.navigate(['/positions']).then(() => {
      expect(location.path()).toBe('/positions');
    });
  }));
});
