import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {
  private timeoutId: any;
  private idleTime: number = 60000; // 1 minutes in milliseconds

  constructor(private router: Router, private ngZone: NgZone) {
    this.startWatching();
  }

  private startWatching() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', () => this.resetTimer());
      window.addEventListener('keypress', () => this.resetTimer());
      this.startTimer();
    });
  }

  private startTimer() {
    this.timeoutId = setTimeout(() => this.logout(), this.idleTime);
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.startTimer();
  }

  private logout() {
    this.ngZone.run(() => {
      alert("Timeput due to inactivity");
      // logout and redirect to login page
      this.router.navigate(['error']);
    });
  }

  // Expose private methods for testing
  get testableMethods() {
    if (!environment.production) {
      return {
        startTimer: this.startTimer.bind(this),
        resetTimer: this.resetTimer.bind(this),
        logout: this.logout.bind(this)
      };
    }
    return null;
  }
}
