import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TransactionsService } from './modules/transactions/transactions.service';
import { of } from 'rxjs';
import { RouterModule, Router, provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeoutService } from './timeout.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [],
})
class MockModule1Module { }

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [],
})
class MockModule2Module { }


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, FooterComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'transactions', loadChildren: () => MockModule1Module },
        { path: 'positions', loadChildren: () => MockModule2Module }
      ])],
      providers: [
        { provide: TimeoutService, useValue: {} },
      ]
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
