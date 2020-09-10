import { ProductLookupComponent } from './../../../dialogs/product-lookup/product-lookup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatDialog } from '@angular/material';
import { AuthTokenService } from './../../../services/auth-token.service';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct } from './../../../models/iProduct';
import { HomeService } from './../../../services/home.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { startWith } from 'rxjs/operators';

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {
  selectedValue: string;
  @Output() saveNewCase = new EventEmitter<boolean>();
  @Input() newCase: boolean;
  public cNewCase: boolean;

  priorities: Priority[] = [
    {value: 'High', viewValue: 'High'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'Low', viewValue: 'Low'}
  ];
  public productList: IProduct[] = [];
  @Input() accountInfo;
  public accountData;
  filteredProduct: Observable<IProduct[]>;
  filteredOptions: Observable<IProduct[]>[] = [];
  filteredProd: Observable<IProduct[]>;
  caseInfoForm: FormGroup;
  additionalInfo: FormGroup;
  public submitted: boolean;
  prodCtrl = new FormControl();
  productListVal: any[] = [];
   public productId: string;
   public productName: string;
   public accToken: string;
   public accountId: string;
   public save: boolean;

   public options = [];
   public filteredOptionsVal: Observable<any[]>;
   myControl = new FormControl();
   public selectedProduct;
   public prodId;
   public prodCode;
  

  private map = new Map<string, string[]>([
    ['Credit Note Complaint', ['']],
    ['Dispatch Complaint', ['']],
    ['Payment Complaint ', ['']],
    ['Post Sales Document Complaint', ['']],
    ['Quality Complaint', ['Fiberglass Measuring Tapes'	, 'Hand Tools'	,' Long Steel Measuring Tapes'	,
    'Metal Wired Measuring Tapes'	, 'Pocket Steel Measuring Tapes'	, 'Power Tools Accessories'	,
    'Precision Tools'	, 'Professional Tools'	, 'Spirit Levels'	]],
    ['Replacement Material Complaint', ['']],
    ['Transport Complaint', ['']],
  ]);
  
  public isType: boolean;
  public productCode;

  constructor(private service: HomeService, private fb: FormBuilder, private authService: AuthTokenService,
              private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.submitted = false;
    this.cNewCase = false;
    this.isType = false;
    this.save = false;
   // this.getProdDetails();
   }

   filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    const token = this.accToken;
    return this.service.getProductData(token)
     .pipe(
       map(response => response.Products.filter(option => {
         this.productList = response.Products;
         return option.Name.toLowerCase().indexOf(val.toLowerCase()) === 0;
       }))
     );
   }

  getProductList(data) {
    this.service.getProductList(data).subscribe((resp) => {
      this.productList = resp.Products;
      this.productListVal = [...resp.Products];
    });
  }

  filterProducts(name: string) {
    return this.productList.filter(prodName =>
      prodName.Name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  createCaseForm(data){
    this.accountId = data.OwnerId;
    this.caseInfoForm = this.fb.group({
      accountName: [data.Name],
      contactName: [''],
      status: ['New'],
      type: ['', Validators.required],
      caseOrigin: [''],
      subType: ['']
    });
  }

  createAdditionalForm(data) {
    this.accountId = data.Id;
    this.additionalInfo = this.fb.group({
      accountName: [{value: data.Name,  disabled: true}],
      contactName: [{value: data.Sic,  disabled: true}],
      status: [{value: 'New',  disabled: true}],
      type: ['', Validators.required],
      caseOrigin: [{value: 'Dealer Portal',  disabled: true}],
      subType: [''],
      priority: ['Medium'],
      product: [''],
      productQty: [''],
      transportCompany: [''],
      trackingnumber: [''],
      creditNote: [''],
      description: ['', Validators.required],
      productName: ['']
    });
  }

  enter(){
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductLookupComponent, {width: '900px',
    data: {prodId: 0, prodList: this.productList}
  });

    dialogRef.afterClosed().subscribe(result => {
      if (result.data != undefined) {
        this.selectedProduct = result.data;
        const index = this.selectedProduct.id;
        const prodName = this.selectedProduct.obj;
        this.additionalInfo.get('productName').setValue(prodName);
        this.productId = this.selectedProduct.prodId;
        this.productCode = this.selectedProduct.prodCode;
      }
   });
 }

  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }



  get types(): string[] {
    return Array.from(this.map.keys());
  }

  get subTypes(): string[] | undefined {
    if (this.additionalInfo.controls.type.value == 'Quality Complaint') {
      this.isType = true;
    } else {
      this.isType = false;
    }
    return this.map.get(this.additionalInfo.controls.type.value);
  }

  displayFn(user?: IProduct): string {
    return user ? user.Name : undefined;
  }

  getSelectedInfo(val) {
    this.prodCtrl.setValue(val.Name);
    this.productName = val.Name;
    this.productId = val.Id;
  }

  getSelectedData(val) {
    for (const obj of this.productList) {
      if(obj.Name == val) {
        this.productName = obj.Name;
        this.productId = obj.Id;
      }
    }
  }

  saveCaseData() {
    this.submitted = true;
    this.save = true;
    if (this.additionalInfo.invalid) {
      if (this.additionalInfo.controls.type.value == '') {
        this.openSnackBar('Please select atlest one Type', 'OK'); 
      } else {
        this.openSnackBar('Please enter description', 'OK'); 
      }
      this.save = false;
    } else {
      const sType = (this.additionalInfo.controls.type.value == 'Quality Complaint') ? this.additionalInfo.controls.subType.value : '';
      const pQty = (this.additionalInfo.controls.productQty.value !== '') ? this.additionalInfo.controls.productQty.value :  0 ;
      const payload = {
      AccountName: this.additionalInfo.controls.accountName.value,
      ContactName: this.additionalInfo.controls.contactName.value,
      AccountId: this.accountData.Id,
      Status: 'New',
      Type: this.additionalInfo.controls.type.value ,
      CaseOrigin: this.additionalInfo.controls.caseOrigin.value,
      SubType: sType,
      Priority: this.additionalInfo.controls.priority.value,
      Product: this.additionalInfo.controls.productName.value,
      ProductQuantity: pQty,
      TransportCompany: this.additionalInfo.controls.transportCompany.value,
      Trackingnumber: this.additionalInfo.controls.trackingnumber.value,
      CreditNote: this.additionalInfo.controls.creditNote.value,
      Description: this.additionalInfo.controls.description.value,
      ProductId: this.productId,
      ProductCode: this.productCode
    };
      this.service.saveCaseInfo(payload, this.accToken).subscribe((resp) => {
      if (resp == 'success') {
        this.openSnackBar('New case has been created successfully', 'OK');
        this.cNewCase = true;
        this.saveNewCase.emit(this.cNewCase);
      }
    }, err => {
      this.openSnackBar('Something went wrong. Contact your Administrator', 'OK');
      this.save = false;
    });

    }
  }

  // display messages from top of the page
  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    return snackBarRef;
  }

    // convenience getter for easy access to form fields
    get f() { return this.additionalInfo.controls; }



  onEnter(evt: any) {
    if (evt.source.selected) {
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.accToken = this.authService.getUserData();
      if (this.accToken) {
        this.getProductList(this.accToken);
        this.createCaseForm(this.accountData);
      }
    }, 1000);
    this.accountData = this.accountInfo;
    this.createAdditionalForm(this.accountData);
  }

}
