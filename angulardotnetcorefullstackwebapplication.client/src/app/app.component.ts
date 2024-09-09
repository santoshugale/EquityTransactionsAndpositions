import { Component, OnInit } from '@angular/core';
import { Transaction } from './components/transactions/transaction';
import { TransactionsService } from './components/transactions/transactions.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public transactions: Transaction[] = [];
}
