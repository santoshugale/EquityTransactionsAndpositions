import { Component, OnInit } from "@angular/core";
import { Transaction } from "./transaction";
import { TransactionsService } from "./transactions.service";

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  public transactions: Transaction[] = [];

  constructor(private transactionService: TransactionsService) { }

  async ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }
}
