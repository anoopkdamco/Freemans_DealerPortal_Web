import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { IFIleInvoice } from './../../models/iInvoiceFile';
import { IRelatedInvoices } from './../../models/iRelatedInvoices';
import { IRelatedOrders } from './../../models/iRelatedOrders';
import { IRelated } from './../../models/iRelated';
import { HomeService } from './../../services/home.service';
import { AuthTokenService } from './../../services/auth-token.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSort } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.scss']
})
export class InvoiceDialogComponent implements OnInit {

  public infoForm: FormGroup;
  public invoiceNo: string;
  public trackingInfoForm: FormGroup;
  public taxForm: FormGroup;
  public addressForm: FormGroup;
  public tokenVal: string;

  public relatedData: IRelated;
  public orderRelatedData: IRelatedOrders[] = [];
  public invoiceRelatedData: IRelatedInvoices[] = [];
  public listInvoiceFileData: IFIleInvoice[] = [];
  public pdfData: IFIleInvoice[] = [];
  public imageData: IFIleInvoice[] = [];
  date = new FormControl(new Date());
  public fileUrl;
  public imageUrl;
  public loading: boolean;

  public linkSource;
  public downloadLink;
  public fileName;
  dataSource: MatTableDataSource<IFIleInvoice>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['FileType',
    'FileName',
    'FileExt',
    'FileData'
 ];

  thumbnail: any;
  schemeThumbNail: any;
  constructor(fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private authService: AuthTokenService,
              private homeService: HomeService, public snackBar: MatSnackBar, private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<InvoiceDialogComponent>) {
                this.loading = true;
                this.invoiceNo = data.Name;
                const amt = data.Amount__c ? '₹' + Number(data.Amount__c.toString()).toLocaleString('en-IN') : '';
                const blnce = data.Shipping_Charge__c ? '₹' + Number(data.Balance__c.toString()).toLocaleString('en-IN') : '';
                const shipCharge = data.IGST_AMOUNT__c ? '₹' + Number(data.Shipping_Charge__c.toString()).toLocaleString('en-IN') : '';
                const iGst = data.IGST_AMOUNT__c ? '₹' + Number(data.IGST_AMOUNT__c.toString()).toLocaleString('en-IN') : '';
                const sGst = data.SGST_AMOUNT__c ? '₹' + Number(data.SGST_AMOUNT__c.toString()).toLocaleString('en-IN') : '';
                const cgst = data.CGST_AMOUNT__c ? '₹' + Number(data.CGST_AMOUNT__c.toString()).toLocaleString('en-IN') : '';
                const Utgst = data.UTGST_AMOUNT__c ? '₹' + Number(data.UTGST_AMOUNT__c.toString()).toLocaleString('en-IN') : '';
                const buyerPO = data.FMI_OrderId__r ? data.FMI_OrderId__r.Buyer_PO_Number__c : '';
                const buyerPODate = data.FMI_OrderId__r ? data.FMI_OrderId__r.Buyer_PO_Date__c : '';
                this.infoForm = fb.group({
                buyerDate: [{value: data.Buyer_PO_Date__c, disabled: true}],
                buyerPo: [{value: data.Buyer_PO_Number__c, disabled: true}],
                order: [{value: data.OrderName, disabled: true}],
                originalOrder: [{value: buyerPO, disabled: true}],
                totalPrice: [{value: data.TotalPrice__c, disabled: true}],
                totalGst: [{value: data.TotalGST__c, disabled: true}],
                owner: [{value: data.LastName, disabled: true}],
                description: [{value: '', disabled: true}],
                grandTotal: [{value: data.GrandTotal__c, disabled: true}],
                invoice: [{value: data.Name, disabled: true}],
                account: [{value: data.LastName, disabled: true}],
                paymentDays: [{value: data.Payment_Duration_Days__c, disabled: true}],
                dueDate: [{value: data.Due_Date__c, disabled: true}],
                fmiOrder: [{value: data.OrderName, disabled: true}],
                invoiceDate: [{value: data.Invoice_Date__c, disabled: true}],
                po: [{value: data.PO_Number__c, disabled: true}],
                poDate: [{value: data.PO_Date__c, disabled: true}],
                shippingCharge: [{value: shipCharge, disabled: true}],
                buyerOrderNo : [{value: buyerPO, disabled: true}],
                buyerOrderDate: [{value: buyerPODate, disabled: true}],
                postingDate: [{value: data.Posting_Date__c, disabled: true}],
                amount: [{value: amt, disabled: true}],
                balance: [{value: blnce, disabled: true}],
                paymentStatus: [{value: data.Payment_Status__c, disabled: true}],
                busyErp: [{value: data.Busy_ERP_Invoice_No__c, disabled: true}]
              });
                this.addressForm = fb.group({
                  billingCity: [{value: data.Billing_City__c, disabled: true}],
                  billingCountry: [{value: data.Billing_Country__c, disabled: true}],
                  billingStreet: [{value: data.Billing_Street__c, disabled: true}],
                  billingPostalCode: [{value: data.Billing_PostalCode__c, disabled: true}],
                  billingState: [{value: data.billing_State__c, disabled: true}],
                  shippingCity: [{value: data.Shipping_City__c, disabled: true}],
                  shippingCountry: [{value: data.Shipping_Country__c, disabled: true}],
                  shippingStreet: [{value: data.Shipping_Street__c, disabled: true}],
                  shippingPostalCode: [{value: data.Shipping_PostalCode__c, disabled: true}],
                  shippingState: [{value: data.Shipping_State__c, disabled: true}]

              });
                this.taxForm = fb.group({
                cgst: [{value: data.CGST__c, disabled: true}],
                igst: [{value: data.IGST__c, disabled: true}],
                sgst: [{value: data.SGST__c, disabled: true}],
                sgstAmount: [{value: sGst, disabled: true}],
                cgstAmount: [{value: cgst, disabled: true}],
                igstAmount: [{value: iGst, disabled: true}],
                utgstAmount: [{value: Utgst, disabled: true}]
              });
  }

  getRelatedInfo() {
    const Id = this.data.Id;
    const token = this.tokenVal;
    const objName = 'Invoice';
    this.showLoader();
    this.homeService.getRelatedInfo(Id, token, objName).subscribe((resp) => {
          this.hideLoader();
          this.relatedData = resp;
          this.invoiceRelatedData = this.relatedData.RelatedInvoices;
          this.listInvoiceFileData = this.relatedData.ListInvoiceFilesData;
          const jpg = 'JPG';
          const png = 'PNG'
          for(let i = 0; i< this.listInvoiceFileData.length; i++) {
            const dataType = this.listInvoiceFileData[i].FileType;
            if((dataType != jpg) && (dataType != png)) {
                 this.pdfData.push(this.listInvoiceFileData[i]);
                 const data = this.listInvoiceFileData[i].FileData;
                 const blob = new Blob([data], { type: 'application/pdf' });
                 this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            } else if((dataType == jpg) || (dataType == png)) {
              this.imageData.push(this.listInvoiceFileData[i]);
              const data = this.listInvoiceFileData[i].FileData;
              const blob = new Blob([data], { type: 'image/jpeg' });
              this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            }
          }
    }, err => {
      this.openSnackBar('There is some error while creating order, Please contact to Administration', 'OK');
    });
   }

   downloadPdf(data, name, type) {
     if(type == 'PDF') {
      this.linkSource = 'data:application/pdf;base64,' + data;
      this.downloadLink = document.createElement('a');
      this.fileName = name + '.pdf';
     } else if(type == 'TEXT') {
      this.linkSource = 'data:text/plain;base64,' + data;
      this.downloadLink = document.createElement('a');
      this.fileName = name + '.txt';
     } else if (type == 'PNG') {
      this.linkSource = 'data:image/png;base64,' + data;
      this.downloadLink = document.createElement('a');
      this.fileName = name + '.png';
     } else if (type == 'JPG') {
      this.linkSource = 'data:image/jpeg;base64,' + data;
      this.downloadLink = document.createElement('a');
      this.fileName = name + '.jpg';
     }
     this.downloadLink.href = this.linkSource;
     this.downloadLink.download = this.fileName;
     this.downloadLink.click();
   }


   downloadImage(data, name){
    const linkSource = 'data:image/jpeg;base64,' + data;
    const downloadLink = document.createElement('a');
    const fileName = name + '.jpeg';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
   }  
   // display messages from top of the page
   openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    return snackBarRef;
  }
  

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  ngOnInit() {
    setTimeout(() => {
      const userData = this.authService.getUserData();
      this.tokenVal = userData;
      if(this.tokenVal) {
        this.getRelatedInfo();
      }
    }, 3000);
  }
}
