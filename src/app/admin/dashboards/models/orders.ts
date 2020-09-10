
export class Orders {
  public AccountId__c: string;
  public Buyer_PO_Date__c: string;
  public Buyer_PO_Number__c: number;
  public ERP_Order_Number__c: number;
  public GrandTotal__c: number;
  public Id: string;
  public Status__c: string;
  public Name: string;
  public TotalGST__c: number;
  public TotalPrice__c: number;
  public Type__c: string;
  public LastModifiedBy: {
    Id: string,
    Name: string
};
  public LastModifiedById: string;
  public LastModifiedDate: string;
  public Age__c: number;
  public BillingCity__c: string;
  public BillingCountry__c: string;
  public BillingPostalCode__c: string;
  public BillingState__c: string;
  public BillingStreet__c: string;

  public ShippingCity__c: string;
  public ShippingCountry__c: string;
  public ShippingPostalCode__c: string;
  public ShippingState__c: string;
  public ShippingStreet__c: string;
  public Invoice_Courier_Tracking_No__c: string;
  public Invoice_Courier_Tracking_URL__c: string;
  public LR_Courier_Tracking_No__c: string;
  public LR_Courier_Tracking_URL__c: string;
  public GTotal: string;
  public FMI_OrderId__r: {
    Age__c: number
 Buyer_PO_Date__c: string,
 Id: string, Name: string,
 Status__c: string
};
OriginalOrderId__r: {
  Id: string,
  Name: string
};
Description__c: string;

  constructor(
    AccountId__c: string,
    Buyer_PO_Date__c: string,
    Buyer_PO_Number__c: number,
    ERP_Order_Number__c: number,
    GrandTotal__c: number,
    Id: string,
    Name: string,
    Status__c: string,
    TotalGST__c: number,
    TotalPrice__c: number,
    Type__c: string,
    LastModifiedBy: {
      Id: string,
      Name: string
  },
    LastModifiedById: string ,
    LastModifiedDate: string,
    Age__c: number,
    BillingCity__c: string,
    BillingCountry__c: string,
    BillingPostalCode__c: string,
    BillingState__c: string,
    BillingStreet__c: string,

    ShippingCity__c: string,
    ShippingCountry__c: string,
    ShippingPostalCode__c: string,
    ShippingState__c: string,
    ShippingStreet__c: string,
    Invoice_Courier_Tracking_No__c: string,
    Invoice_Courier_Tracking_URL__c: string,
    LR_Courier_Tracking_No__c: string,
    LR_Courier_Tracking_URL__c: string,
    FMI_OrderId__r: {
  Age__c: number
Buyer_PO_Date__c: string,
Id: string,
Name: string,
Status__c: string
},
OriginalOrderId__r: {
  Id: string,
  Name: string
},
Description__c: string,

  ) {
      this.AccountId__c = AccountId__c;
      this.Buyer_PO_Date__c = Buyer_PO_Date__c;
      this.Buyer_PO_Number__c = Buyer_PO_Number__c;
      this.ERP_Order_Number__c = ERP_Order_Number__c;
      this.GrandTotal__c = GrandTotal__c;
      this.Id = Id;
      this.Name = Name;
      this.Status__c = Status__c;
      this.TotalGST__c = TotalGST__c;
      this.TotalPrice__c = TotalPrice__c;
      this.Type__c = Type__c;
      this.LastModifiedBy = LastModifiedBy;
      this.LastModifiedById = LastModifiedById;
      this.LastModifiedDate = LastModifiedDate;
      this.Age__c = Age__c;
      this.BillingCity__c = BillingCity__c;
      this.BillingCountry__c = BillingCountry__c;
      this.BillingPostalCode__c = BillingPostalCode__c;
      this.BillingState__c = BillingState__c;
      this.BillingStreet__c = BillingStreet__c;

      this.ShippingCity__c = ShippingCity__c;
      this.ShippingCountry__c = ShippingCountry__c;
      this.ShippingPostalCode__c = ShippingPostalCode__c;
      this.ShippingState__c = ShippingState__c;
      this.ShippingStreet__c = ShippingStreet__c;

      this.Invoice_Courier_Tracking_No__c = Invoice_Courier_Tracking_No__c;
      this.Invoice_Courier_Tracking_URL__c = Invoice_Courier_Tracking_URL__c;
      this.LR_Courier_Tracking_No__c = LR_Courier_Tracking_No__c;
      this.LR_Courier_Tracking_URL__c = LR_Courier_Tracking_URL__c;
      this.FMI_OrderId__r = this.FMI_OrderId__r;
      this.GTotal = this.GTotal;
      this.Description__c = this.Description__c;
      this.OriginalOrderId__r = this.OriginalOrderId__r;
  }
}
