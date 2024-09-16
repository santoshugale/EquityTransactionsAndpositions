import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {
  private timeoutId: any;
  private idleTime: number = 60000; // 1 minutes in milliseconds

  constructor(private router: Router, private ngZone: NgZone) {
    this.startWatching();
  }

  public startWatching() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', () => this.resetTimer());
      window.addEventListener('keypress', () => this.resetTimer());
      this.startTimer();
    });
  }

  public startTimer() {
    this.timeoutId = setTimeout(() => this.logout(), this.idleTime);
  }

  public resetTimer() {
    clearTimeout(this.timeoutId);
    this.startTimer();
  }

  public logout() {
    this.ngZone.run(() => {
      alert("Timeput due to inactivity");
      // logout and redirect to login page
      this.router.navigate(['error']);
    });
  }
}
