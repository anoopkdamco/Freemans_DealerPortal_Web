import { ProductLookupComponent } from './../../../dialogs/product-lookup/product-lookup.component';
import { AuthTokenService } from './../../../services/auth-token.service';
import { IProduct } from './../../../models/iProduct';
import { IAccount } from './../../../models/iAccount';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Products } from './../../../models/products';
import { Observable } from 'rxjs';
import { HomeService } from './../../../services/home.service';
import { Accounts } from './../../../models/accounts';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  @Input() accountInfo;
  public minDate = new Date();
  @Output() saveOrder = new EventEmitter<boolean>();
  @Input() newOrder: boolean;

  filteredOptions: Observable<IProduct[]>[] = [];
  orderInfo: FormGroup;
  productForm: FormGroup;
  addressForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  date = new Date();
  filteredProducts: Observable<Products[]>;
  public productList: IProduct[] = [];
  public accountData;
  public perProdGst: number;
  public perProdFinalAmount: number;
  public totalAmount: number;
  public accToken: string;
  public cOrder: boolean;
  public salesOrder: string;
  public save: boolean;
  public uPrice;
  public disPrice;
  public finalP;
  public tPrice;
  public isProd: boolean;
  public totalCastAmount: number;
  public resultantProduct;
  public loading: boolean;
  public prodIndex;
  public selectedProduct;
  public displayAmt;

  constructor(private fb: FormBuilder, private service: HomeService, private route: ActivatedRoute, private router: Router,
              public snackBar: MatSnackBar, private authService: AuthTokenService, private cur: CurrencyPipe, public dialog: MatDialog) {
                 this.cOrder = false;
                 this.save = false;
                 this.isProd = false;
                 this.totalCastAmount = 0;
                 this.loading = false;
  }

  public orderInformation(data) {
    this.orderInfo = this.fb.group({
      buyerDate: [{value: this.date, disabled: true}],
      accountName: [{value: data.Name, disabled: true}],
      crmAccountNumber: [{value: data.CRM_Account_Number__c, disabled: true}],
      erpCustomerNumber: [{value: data.ERP_Customer_Number__c,  disabled: true}],
      type: [{value: data.Customer_Type__c,  disabled: true}],
      buyerPoNumber: [''],
    });
  }

  public productInformation() {
    this.productForm = this.fb.group({
      description: [''],
      amount: [''],
      OrderItems: this.initItem()
    });
   // this.manageProductControl(0);
  }

  initItem() {
    const formArray = this.fb.array([]);
    for (let i = 0; i < 1; i++) {
      formArray.push(this.fb.group({
        productName: ['', Validators.required],
         productQty: ['', Validators.required],
         unitPrice: [''],
         discount: [''],
         gst: [''],
         totalPrice: [''],
         priceAfterDiscount: [''],
         prodId: [''],
         productCode: [''],
      }));
    }
    return formArray;
  }

  filter(val: string): Observable<any[]> {
    if (this.accToken != undefined) {
      return this.service.getProductData(this.accToken)
     .pipe(
       map(response => response.Products.filter(option => {
         this.productList = response.Products;
         return option.Name.toLowerCase().indexOf(val.toLowerCase()) === 0;
       }))
     );

    }
  }


  enter(i){
   this.showLoader();
   if (this.productList.length > 0) {
      this.openDialog(i);
   }
   this.hideLoader();
  }

  openDialog(val) {
    const dialogRef = this.dialog.open(ProductLookupComponent, {width: '900px',
    data: {prodId: val, prodList: this.productList}
  });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data != undefined) {
        this.selectedProduct = result.data;
        const index = this.selectedProduct.id;
        const prodName = this.selectedProduct.obj;
        this.getSelectedInfo(prodName, index);
      }
   });
 }


  filterProduct(name) {
    return this.productList.filter(product =>
      product.Name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }


  displayFn(user?: IProduct) {
    return user ? user.Name : undefined;
  }

  getSelectedInfo(val, index) {
      this.isProd = true;
      let prodName = '';
      let productId = '';
      let prodCode = '';
      let gstAmt;
      for (const obj of this.productList) {
        if (obj.Name == val) {
          prodName = obj.Name;
          productId = obj.Id;
          gstAmt = obj.GST__c;
          prodCode = obj.ProductCode__c;
        }
      }
      const accountId = this.accountData.Id;
      this.service.getProductPrice(accountId, productId, this.accToken).subscribe((resp) => {
        let prodResult = new Array();
        prodResult = resp.ProductPriceList;
        const setValueProd = this.productForm.get('OrderItems') as FormArray;
        let tExistingVal: any;
        tExistingVal = setValueProd.at(index).get('totalPrice').value;
        if (tExistingVal != undefined) {
          this.totalCastAmount = this.totalCastAmount - tExistingVal;
          const disAmt = '₹' + Number((this.totalCastAmount).toString()).toLocaleString('en-IN');
          this.productForm.get('amount').setValue(disAmt);

        }
        setValueProd.at(index).get('gst').setValue(gstAmt);
        setValueProd.at(index).get('productName').setValue(prodName);
        setValueProd.at(index).get('prodId').setValue(productId);
        setValueProd.at(index).get('productCode').setValue(prodCode);
        setValueProd.at(index).get('productQty').setValue('');
        setValueProd.at(index).get('totalPrice').setValue('');
        for (let i = 0; i < prodResult.length; i++) {
          this.uPrice = prodResult[i].UnitPrice__c;
          this.disPrice = prodResult[i].Discount_Percentage__c;
          this.finalP = prodResult[i].Price_After_Discount__c;
          setValueProd.at(index).get('unitPrice').setValue(prodResult[i].UnitPrice__c);
          setValueProd.at(index).get('discount').setValue(prodResult[i].Discount_Percentage__c);
          setValueProd.at(index).get('priceAfterDiscount').setValue(prodResult[i].Price_After_Discount__c);
          if(prodResult[i].Price_After_Discount__c != 0) {
            this.perProdGst = ((prodResult[i].Price_After_Discount__c) * (gstAmt)) / 100;
            this.perProdFinalAmount = this.perProdGst + prodResult[i].Price_After_Discount__c;
          } else {
            this.perProdGst = ((prodResult[i].UnitPrice__c) * (gstAmt)) / 100;
            this.perProdFinalAmount = this.perProdGst + prodResult[i].UnitPrice__c;
          }
        }
      });
  }

  onKey(event, index) { // without type info
    this.totalAmount = 0;
    this.totalCastAmount = 0;
    const setValueProd = this.productForm.get('OrderItems') as FormArray;
    let qty: number;
    const pVal = setValueProd.at(index).get('totalPrice').value;
    qty = event.target.value;
    let prodgst;
    let finalAmt;
    if ((pVal != "") || (pVal == 0)) {
          const uPrice = setValueProd.at(index).get('unitPrice').value;
          const dis = setValueProd.at(index).get('discount').value;
          const pAfterD = setValueProd.at(index).get('priceAfterDiscount').value;
          const gstval = setValueProd.at(index).get('gst').value;
          if(pAfterD != 0) {
            prodgst = (pAfterD * gstval) / 100;
            finalAmt = (prodgst + pAfterD) * qty;
          } else {
            prodgst = (uPrice * gstval) / 100;
            finalAmt = (prodgst + uPrice) * qty;
          }
          setValueProd.at(index).get('totalPrice').setValue(finalAmt);
          setValueProd.at(index).get('productQty').setValue(qty);
          this.resultantProduct = setValueProd.value;
          for (const val of this.resultantProduct) {
              this.totalCastAmount = this.totalCastAmount + val.totalPrice;
              const disAmt = '₹' + Number((this.totalCastAmount).toString()).toLocaleString('en-IN');
              this.productForm.get('amount').setValue(disAmt);
          }
    } else {
      this.totalAmount = this.perProdFinalAmount * qty;
      this.tPrice = this.totalAmount;
      setValueProd.at(index).get('totalPrice').setValue(this.totalAmount);
      setValueProd.at(index).get('productQty').setValue(qty);
      this.resultantProduct = setValueProd.value;
      for (const val of this.resultantProduct) {
        this.totalCastAmount = this.totalCastAmount + val.totalPrice;
        const disAmt = '₹' + Number((this.totalCastAmount).toString()).toLocaleString('en-IN');
        this.productForm.get('amount').setValue(disAmt);
    }
    }
  }

  private _filter(name: string): IProduct[] {
    const filterValue = name.toLowerCase();
    return this.productList.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }

  onEnter(evt: any) {
    if (evt.source.selected) {
    alert('hello');
    }
  }

  addNewItem() {
    const controls = this.productForm.get('OrderItems') as FormArray;
    const formGroup = this.fb.group({
      productName: ['', Validators.required],
       productQty: ['', Validators.required],
       unitPrice: [''],
       discount: [''],
       gst: [''],
       totalPrice: [''],
       priceAfterDiscount: [''],
       prodId: [''],
       productCode: ['']
    });
    controls.push(formGroup);
    // Build the account Auto Complete values
   // this.manageProductControl(controls.length - 1);

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getEnterdValue(value, index){
    this.totalAmount = 0;
    this.totalCastAmount = 0;
    const setValueProd = this.productForm.get('OrderItems') as FormArray;
    let qty: number;
    const pVal = setValueProd.at(index).get('totalPrice').value;
    qty = value;
    let prodgst;
    let finalAmt;
    if ((pVal != "") || (pVal == 0)) {
          const uPrice = setValueProd.at(index).get('unitPrice').value;
          const dis = setValueProd.at(index).get('discount').value;
          const pAfterD = setValueProd.at(index).get('priceAfterDiscount').value;
          const gstval = setValueProd.at(index).get('gst').value;
          if(pAfterD != 0) {
            prodgst = (pAfterD * gstval) / 100;
            finalAmt = (prodgst + pAfterD) * qty;
          } else {
            prodgst = (uPrice * gstval) / 100;
            finalAmt = (prodgst + uPrice) * qty;
          }
          setValueProd.at(index).get('totalPrice').setValue(finalAmt);
          setValueProd.at(index).get('productQty').setValue(qty);
          this.resultantProduct = setValueProd.value;
          for (const val of this.resultantProduct) {
              this.totalCastAmount = this.totalCastAmount + val.totalPrice;
              const disAmt = '₹' + Number((this.totalCastAmount).toString()).toLocaleString('en-IN');
              this.productForm.get('amount').setValue(disAmt);
          }
    } else {
      this.totalAmount = this.perProdFinalAmount * qty;
      this.tPrice = this.totalAmount;
      setValueProd.at(index).get('totalPrice').setValue(this.totalAmount);
      setValueProd.at(index).get('productQty').setValue(qty);
      this.resultantProduct = setValueProd.value;
      for (const val of this.resultantProduct) {
        this.totalCastAmount = this.totalCastAmount + val.totalPrice;
        const disAmt = '₹' + Number((this.totalCastAmount).toString()).toLocaleString('en-IN');
        this.productForm.get('amount').setValue(disAmt);
    }
    }
  }

   removeItem(i: number) {
    this.totalCastAmount = 0;
    const controls = this.productForm.get('OrderItems') as FormArray;
    controls.removeAt(i);
    this.resultantProduct = controls.value;
    for (const val of this.resultantProduct) {
        this.totalCastAmount = this.totalCastAmount + val.totalPrice;
        const disAmt = '₹' + Number((this.totalCastAmount).toString()).toLocaleString('en-IN');
        this.productForm.get('amount').setValue(disAmt);
    }
    // remove from filteredOptions too.
    this.filteredOptions.splice(i, 1);
  }

  getAddressForm(data) {
    this.addressForm = this.fb.group({
      billingAccountName: [{value: data.Name, disabled: true}],
      billingCity: [{value: data.BillingCity, disabled: true}],
      shippingCity: [data.ShippingCity],
      billingCountry: [{value: data.BillingCountry, disabled: true}],
      shippingCountry: [data.ShippingCountry],
      billingState: [{value: data.BillingState, disabled: true}],
      shippingState: [data.ShippingState],
      shippingPostalCode: [data.ShippingPostalCode, Validators.required],
      billingPostalCode: [{value: data.BillingPostalCode, disabled: true}],
      shippingAccountName: [data.Name],
      billingStreet: [{value: data.BillingStreet, disabled: true}],
      shippingStreet: [data.ShippingStreet]
    });
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
    this.productInformation();
    this.accountData = this.accountInfo;
    this.orderInformation(this.accountData);
    this.getAddressForm(this.accountData);
    setTimeout(() => {
      this.accToken = this.authService.getUserData();
      if (this.accToken != undefined) {
      this.service.getProductList(this.accToken).subscribe((resp) => {
        this.productList = resp.Products;
       });
      }

      this.productInformation();
      // this.getProductLIst(this.accToken);
    }, 3000);
  }

  saveProductInfo() {
    this.save = true;
    if (this.productForm.invalid) {
      this.openSnackBar('Please select product and fill all required fields to  create an order', 'OK');
      this.save = false;
    } else if(this.addressForm.invalid) {
      this.openSnackBar('Please enter Shipping Pin Code to  create an order', 'OK');
      this.save = false;
    } else {
      const formData = this.productForm.get('OrderItems') as FormArray;
      const bDate = new Date(this.orderInfo.controls.buyerDate.value);
      const gVal = this.productForm.controls.amount.value;
      const removeFirst = gVal.substring(1);
      const getTotal = +removeFirst;
      const payLoadObj = {
      Name: this.accountData.Name,
      AccountId: this.accountData.Id,
	    ERPOrderNumber: this.orderInfo.controls.erpCustomerNumber.value,
	    Type: this.orderInfo.controls.type.value,
      BuyerPONumber: this.orderInfo.controls.buyerPoNumber.value,
      BuyerDate: bDate,
      billingAccountName: this.addressForm.controls.billingAccountName.value,
      shippingAccountName: this.addressForm.controls.shippingAccountName.value,
      billingCity: this.addressForm.controls.billingCity.value,
      shippingCity: this.addressForm.controls.shippingCity.value,
      billingCountry: this.addressForm.controls.billingCountry.value,
      shippingCountry: this.addressForm.controls.shippingCountry.value,
      billingState: this.addressForm.controls.billingState.value,
      shippingState: this.addressForm.controls.shippingState.value,
      shippingPostalCode: this.addressForm.controls.shippingPostalCode.value,
      billingPostalCode: this.addressForm.controls.billingPostalCode.value,
      orderItems: formData.value,
      billingStreet: this.addressForm.controls.billingStreet.value,
      shippingStreet: this.addressForm.controls.shippingStreet.value,
      description: this.productForm.controls.description.value,
      grandTotal: getTotal
    };
      this.showLoader();
      this.service.saveOrderInfo(payLoadObj, this.accToken).subscribe((resp) => {
      if (resp == 'Success') {
        this.openSnackBar('New Order Created Successfully', 'OK');
        if(this.newOrder) {
          this.cOrder = true;
          this.saveOrder.emit(this.cOrder);
        } else {
          this.salesOrder = 'Sales Order Created';
          this.router.navigate(['/freemans/dashboard/orders'], {state: {data: 'Sales Order Created'}});
        }
      }
    }, err => {
      this.openSnackBar('Something went wrong. Contact your Administrator', 'OK');
      this.save = false;
    });
      this.hideLoader();
    }
  }
}
