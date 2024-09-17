import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch : 'full'
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: 'Error'
  },
  {
    path: 'transactions',
    loadChildren: () => import('./modules/transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path: 'positions',
    loadChildren: () => import('./modules/positions/positions.module').then(m => m.PositionsModule)
  },
  {
    path: 'page-not-found',
    title: 'PageNotFound',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    title: 'PageNotFound',
    redirectTo: 'page-not-found'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, /*{ useHash: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
