export interface IOrderData {
    AccountId__c: string;
    Buyer_PO_Date__c: string;
    Buyer_PO_Number__c: number;
    ERP_Order_Number__c: number;
    GrandTotal__c: number;
    Id: string;
    Status__c: string;
    Name: string;
    Description__c: string;
    TotalGST__c: number;
    TotalPrice__c: number;
    Type__c: string;
    LastModifiedBy: {
        Id: string,
        Name: string
    };
    LastModifiedById: string ;
    LastModifiedDate: string;
    Age__c: number;
BillingCity__c: string;
BillingCountry__c: string;
BillingPostalCode__c: string;
BillingState__c: string;
BillingStreet__c: string;

ShippingCity__c: string;
ShippingCountry__c: string;
ShippingPostalCode__c: string;
ShippingState__c: string;
ShippingStreet__c: string;
Invoice_Courier_Tracking_No__c: string;
Invoice_Courier_Tracking_URL__c: string;
LR_Courier_Tracking_No__c: string;
LR_Courier_Tracking_URL__c: string;
FMI_OrderId__r: {
    Age__c: number
Buyer_PO_Date__c: string,
Id: string,
Name: string,
Status__c: string,
};
OriginalOrderId__r: {
    Id: string,
    Name: string
};

}