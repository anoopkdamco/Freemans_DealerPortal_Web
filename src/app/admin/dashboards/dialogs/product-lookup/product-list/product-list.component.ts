import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from './../../../models/iProduct';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() productList;
  public productListData: IProduct[] = [];
  public selectedData;

  dataSource: MatTableDataSource<IProduct>;
  displayedColumns = ['Name',
  'ProductCode__c',
  'Family__c',
  'Stock__c'
 ];

 @Output() selectedProduct = new EventEmitter<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  cellClicked(elem) {
    this.selectedData = elem;
    this.selectedProduct.emit(this.selectedData);
  }


  ngOnInit() {
    this.productListData = this.productList;
    this.dataSource = new MatTableDataSource(this.productListData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

}
