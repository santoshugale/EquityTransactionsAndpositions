import { HttpClient } from "@angular/common/http";
import { Transaction } from "./transaction";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/transactions');
  }
}
