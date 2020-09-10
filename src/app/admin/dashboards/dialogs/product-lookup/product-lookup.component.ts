import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from './../../models/iProduct';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-product-lookup',
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.scss']
})
export class ProductLookupComponent implements OnInit {
  public index: number;
  public productList: IProduct[] = [];
  public accountData;
  public selectedData;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ProductLookupComponent>) {
        this.productList = data.prodList;
        this.index = data.prodId;
   }

  

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: {id: this.index, obj: this.selectedData.Name, prodId: this.selectedData.Id, 
      prodCode: this.selectedData.ProductCode__c} });
  }

  cellClicked(elem) {
    this.selectedData = elem;
    this.closeDialog();
  }

  getSelectedProduct(val) {
    this.selectedData = val;
    this.closeDialog();
  }

  ngOnInit() {
  }

}
