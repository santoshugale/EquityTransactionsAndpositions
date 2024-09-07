import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { PositionsComponent } from './components/positions/positions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    title: 'Transactions'
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    title: 'Transactions'
  },
  {
    path: 'positions',
    component: PositionsComponent,
    title: 'Positions'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
