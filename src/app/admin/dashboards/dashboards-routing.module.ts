import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SalesAndSchemeComponent } from './components/sales-and-scheme/sales-and-scheme.component';
import { InvoiceAndPaymentsComponent } from './components/invoice-and-payments/invoice-and-payments.component';
import { CasesComponent } from './components/cases/cases.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
      path: '',
      component: DashboardComponent,
      children: [
          { path: '', redirectTo:'home', pathMatch: 'full'},
          { path: 'home', component: IndexComponent},
          { path: 'orders', component: OrdersComponent},
          { path: 'cases', component: CasesComponent},
          { path: 'invoice', component: InvoiceAndPaymentsComponent},
          { path: 'sales', component: SalesAndSchemeComponent},
          { path: 'accountDetails', component: AccountDetailsComponent},
          { path: 'contactUs', component: ContactUsComponent}
      ]
  },
  
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
