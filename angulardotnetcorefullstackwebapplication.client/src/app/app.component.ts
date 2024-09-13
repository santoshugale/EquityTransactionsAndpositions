import { Component } from '@angular/core';
import { TimeoutService } from './timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private timeoutService: TimeoutService) {
  }
}
