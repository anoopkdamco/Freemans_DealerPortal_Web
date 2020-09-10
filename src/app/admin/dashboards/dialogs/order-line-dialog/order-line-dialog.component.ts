import { IOrderItemWise } from './../../models/iOrderItemWise';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-order-line-dialog',
  templateUrl: './order-line-dialog.component.html',
  styleUrls: ['./order-line-dialog.component.scss']
})
export class OrderLineDialogComponent implements OnInit {
  lineItemForm: FormGroup;
  lineItemName: string;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: IOrderItemWise, private dialogRef: MatDialogRef<OrderLineDialogComponent>, 
              private fb: FormBuilder) {
                this.lineItemName = data.Name;
                this.createdBy = data.CreatedBy ?  data.CreatedBy.Name : '';
                this.createdDate = data.CreatedDate;
                this.lastModifiedBy = data.LastModifiedBy ? data.LastModifiedBy.Name : '';
                const fmiOrder = data.FMI_OrderId__r ? data.FMI_OrderId__r.Name : '';
                const fmiProduct  = data.FMI_Product__r ? data.FMI_Product__r.Name : '';
                this.lastModifiedDate = data.LastModifiedDate;
                this.lineItemForm = fb.group({
                    orderLineItem: [this.lineItemName],
                    fmiOrder: [fmiOrder],
                    fmiProduct: [fmiProduct],
                    unitPrice: [data.UnitPrice__c],
                    quantity: [data.Quantity__c],
                    discount: [data.Discount__c],
                    subTotal: [data.Subtotal__c],
                    additionalDiscount: [data.Additional_Discount__c],
                    gst: [data.GST__c],
                    totalDiscount: [data.Total_Discount__c],
                    totalGst: [data.TotalGST__c],
                    priceAfterDiscount: [data.PriceAfterDiscount__c],
                    totalPrice: [data.TotalPrice__c]
                });
   }

  ngOnInit() {
  }

}
