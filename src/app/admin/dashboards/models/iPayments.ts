export interface IPayments {
    AccountId__c: string;
Amount__c: number;
CGST_AMOUNT__c: number;
CGST__c: number;
Due_Date__c: string;
IGST_AMOUNT__c: number;
Id: string;
Invoice_Date__c: string;
LastModifiedBy: {
    Id: string,
    Name: string
};
LastModifiedById: string;
Name: string;
Payment_Status__c: string;
Posting_Date__c: string;
SGST_AMOUNT__c: number;
SGST__c: number;
Shipping_Charge__c: number;
UTGST_AMOUNT__c: number;
Balance__c: number;
Buyer_PO_Number__c: string;
FMI_OrderId__r: {
    Buyer_PO_Date__c: string,
    Buyer_PO_Number__c: string,
    Id: string,
    Name: string
};
Amount: string;
Balance: string;
AccountId__r: {
    Id: string,
    Name: string
};
Payment_Duration_Days__c: number;
LastName: string;
OrderName: string;

}