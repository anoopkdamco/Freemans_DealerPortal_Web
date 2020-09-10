import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingModule } from 'ng-starrating';
import { MaterialModule } from './../../material.module';
import { HomeEffects } from './../../ngrx/effects/home.effects';

import { HomeService } from './services/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducers, metaReducers } from './../../reducers';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';
import { OrdersComponent } from './components/orders/orders.component';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { homeReducer } from 'src/app/ngrx/reducer/home.reducers';
import { InvoiceAndPaymentsComponent } from './components/invoice-and-payments/invoice-and-payments.component';
import { CasesComponent } from './components/cases/cases.component';
import { SalesAndSchemeComponent } from './components/sales-and-scheme/sales-and-scheme.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AllOrdersComponent } from './components/orders/all-orders/all-orders.component';
import { PendingOrdersComponent } from './components/orders/pending-orders/pending-orders.component';
import { PendingOrderWiseComponent, PendingOrderItemwiseContentDialog } from './components/orders/pending-order-wise/pending-order-wise.component';
import { CreateOrderComponent } from './components/orders/create-order/create-order.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { OrderRelatedComponent } from './components/orders/order-related/order-related.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { AllInvoiceComponent } from './components/invoice-and-payments/all-invoice/all-invoice.component';
import { DuePaymentsComponent } from './components/invoice-and-payments/due-payments/due-payments.component';
import { ExecutedPaymentsComponent } from './components/invoice-and-payments/executed-payments/executed-payments.component';
import { UpcomingPaymentsComponent } from './components/invoice-and-payments/upcoming-payments/upcoming-payments.component';
import { InvoiceDialogComponent } from './dialogs/invoice-dialog/invoice-dialog.component';
import { OrderDialogComponent } from './dialogs/order-dialog/order-dialog.component';
import { AllCasesComponent } from './components/cases/all-cases/all-cases.component';
import { AllOpenCasesComponent } from './components/cases/all-open-cases/all-open-cases.component';
import { AllClosedCasesComponent } from './components/cases/all-closed-cases/all-closed-cases.component';
import { CreateCaseComponent } from './components/cases/create-case/create-case.component';
import { CasesDialogComponent } from './dialogs/cases-dialog/cases-dialog.component';
import { QuaterlySalesComponent } from './components/sales-and-scheme/quaterly-sales/quaterly-sales.component';
import { AnnualSalesComponent } from './components/sales-and-scheme/annual-sales/annual-sales.component';
import { SchemesComponent } from './components/sales-and-scheme/schemes/schemes.component';
import { SchemeDetailsComponent } from './dialogs/scheme-details/scheme-details.component';
import { ExhibitionDialogComponent } from './dialogs/exhibition-dialog/exhibition-dialog.component';
import { SchemeExhibitionDialogComponent } from './dialogs/scheme-exhibition-dialog/scheme-exhibition-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { OrderLineDialogComponent } from './dialogs/order-line-dialog/order-line-dialog.component';
import { OrderLineListComponent } from './dialogs/order-dialog/order-line-list/order-line-list.component';
import { OrderInvoiceComponent } from './dialogs/order-dialog/order-invoice/order-invoice.component';
import { CurrencyPipe } from '@angular/common';
import { CustomCurrencyPipe } from './common/custom-currency.pipe';
import { OriginalOrderComponent } from './dialogs/order-dialog/original-order/original-order.component';
import { ProductLookupComponent } from './dialogs/product-lookup/product-lookup.component';
import { ProductListComponent } from './dialogs/product-lookup/product-list/product-list.component';
import { GaugeChartModule } from 'angular-gauge-chart'
// import { homeReducer } from '';


@NgModule({
  declarations: [DashboardComponent, 
    IndexComponent,
     OrdersComponent, 
     InvoiceAndPaymentsComponent, 
     CasesComponent, 
     SalesAndSchemeComponent, 
     AccountDetailsComponent, 
     ContactUsComponent, 
     AllOrdersComponent, 
     PendingOrdersComponent, 
     PendingOrderWiseComponent, 
     CreateOrderComponent, 
     OrderDetailsComponent, 
     OrderRelatedComponent,
     PendingOrderItemwiseContentDialog,
     AllInvoiceComponent,
     DuePaymentsComponent,
     ExecutedPaymentsComponent,
     UpcomingPaymentsComponent,
     InvoiceDialogComponent,
     OrderDialogComponent,
     AllCasesComponent,
     AllOpenCasesComponent,
     AllClosedCasesComponent,
     CreateCaseComponent,
     CasesDialogComponent,
     QuaterlySalesComponent,
     AnnualSalesComponent,
     SchemesComponent,
     SchemeDetailsComponent,
     ExhibitionDialogComponent,
     SchemeExhibitionDialogComponent,
     OrderLineDialogComponent,
     OrderLineListComponent,
     OrderInvoiceComponent,
     CustomCurrencyPipe,
     OriginalOrderComponent,
     ProductLookupComponent,
     ProductListComponent
    ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GaugeChartModule,
    ChartsModule,
    NgbModule,
    
    // StoreModule.forRoot({reducers, homeState: homeReducer}, {metaReducers}),
    // StoreDevtoolsModule.instrument({
    //   name: "Freemans",
    //   maxAge: 25,
    // }),
    // EffectsModule.forRoot([HomeEffects]),
  ],
  entryComponents: [AllOrdersComponent,
    PendingOrderItemwiseContentDialog,
    InvoiceDialogComponent,
    OrderDialogComponent,
    CasesDialogComponent,
    SchemeDetailsComponent,
    ExhibitionDialogComponent,
    SchemeExhibitionDialogComponent,
    OrderLineDialogComponent,
    ProductLookupComponent
  ],

  providers: [
    HomeService, CurrencyPipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ]
})
export class DashboardsModule { }
