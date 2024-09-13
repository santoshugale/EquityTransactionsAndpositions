import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TimeoutService } from './timeout.service';
import { NgZone } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('IdleService', () => {
  let service: TimeoutService;
  let router: MockRouter;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeoutService,
        { provide: Router, useClass: MockRouter },
        NgZone
      ]
    });

    service = TestBed.inject(TimeoutService);
    router = TestBed.inject(Router) as unknown as MockRouter;
    ngZone = TestBed.inject(NgZone);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log out after 10 minutes of inactivity', fakeAsync(() => {
    const testableMethods = service.testableMethods;
    spyOn(testableMethods, 'logout').and.callThrough();

    // Simulate 1 minutes of inactivity
    tick(60000);

    expect(testableMethods?.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('should reset the timer on user activity', fakeAsync(() => {
    const testableMethods = service.testableMethods;
    spyOn(testableMethods, 'resetTimer').and.callThrough();

    // Simulate user activity
    window.dispatchEvent(new Event('mousemove'));
    tick(30000); // 30 seconds

    expect(testableMethods?.resetTimer).toHaveBeenCalled();
    expect(testableMethods?.logout).not.toHaveBeenCalled();

    // Simulate another 30 seconds of inactivity
    tick(30000);

    expect(testableMethods?.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['error']);
  }));
});
