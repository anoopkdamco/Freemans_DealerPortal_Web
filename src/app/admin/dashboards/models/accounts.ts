export class Accounts {
public Agent_Name__c: string;
public BillingCity: string;
public BillingCountry: string;
public BillingState: string;
public CRM_Account_Number__c: string;
public Credit_Days_for_Sales__c: number;
public Credit_Limit__c: number;
public Credit_Remaining__c: number;
public Customer_Type__c: string;
public Email__c: string;
public GSTIN_UIN__c: string;
public IT_PAN__c: string;
public Id: string;
public LastModifiedBy: {};
public LastModifiedById: string;
public Name: string;
public OwnerId: string;
public Phone: string;
public Receipt_Terms__c: number;
public ShippingCity: string;
public ShippingCountry: string;
public ShippingState: string;
public Station__c: string;
public Total_Outstanding__c: number;
public BillingPostalCode: number;
public ShippingPostalCode: number;

constructor(
 Agent_Name__c: string,
 BillingCity: string,
 BillingCountry: string,
 BillingState: string,
 CRM_Account_Number__c: string,
 Credit_Days_for_Sales__c: number,
 Credit_Limit__c: number,
 Credit_Remaining__c: number,
 Customer_Type__c: string,
 Email__c: string,
 GSTIN_UIN__c: string,
 IT_PAN__c: string,
 Id: string,
 LastModifiedBy: {},
 LastModifiedById: string,
 Name: string,
 OwnerId: string,
 Phone: string,
 Receipt_Terms__c: number,
 ShippingCity: string,
 ShippingCountry: string,
 ShippingState: string,
 Station__c: string,
 Total_Outstanding__c: number,
 BillingPostalCode: number,
 ShippingPostalCode: number,
){
    this.Agent_Name__c = Agent_Name__c;
    this.BillingCity = BillingCity;
    this.BillingCountry = BillingCountry;
    this.BillingState = BillingState;
    this.CRM_Account_Number__c = CRM_Account_Number__c;
    this.Credit_Days_for_Sales__c = Credit_Days_for_Sales__c;
    this.Credit_Limit__c = Credit_Limit__c;
    this.Credit_Remaining__c = Credit_Remaining__c;
    this.Customer_Type__c = Customer_Type__c;
    this.Email__c = Email__c;
    this.GSTIN_UIN__c = GSTIN_UIN__c;
    this.IT_PAN__c = IT_PAN__c;
    this.Id = Id;
    this.LastModifiedBy = LastModifiedBy;
    this.LastModifiedById = LastModifiedById;
    this.Name = Name;
    this.OwnerId = OwnerId;
    this.Phone = Phone;
    this.Receipt_Terms__c = Receipt_Terms__c;
    this.ShippingCity = ShippingCity;
    this.ShippingCountry = ShippingCountry;
    this.ShippingState = ShippingState;
    this.Station__c = Station__c;
    this.Total_Outstanding__c = Total_Outstanding__c;
    this.BillingPostalCode = BillingPostalCode;
    this.ShippingPostalCode = ShippingPostalCode;
}
}