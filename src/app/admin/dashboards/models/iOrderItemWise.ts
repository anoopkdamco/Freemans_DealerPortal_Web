export interface IOrderItemWise {
    Additional_Discount__c: number;
    Discount__c: number;
FMI_OrderId__c: string;
FMI_OrderId__r: {
    Age__c: number,
    Buyer_PO_Date__c: string,
    Id: string,
    Name: string,
    Status__c: string
};
FMI_Product__c: string;
FMI_Product__r: {
    Id: string,
    Name: string,
    QuantityUnitOfMeasure__c: string
};
GST__c: number;
Id: string;
Name: string;
PriceAfterDiscount__c: number;
TotalGST__c: number;
TotalPrice__c: number;
Total_Discount__c: number;
Quantity__c: number;
UnitPrice__c: number;
CreatedBy: {
    Id: string,
    Name: string
};
LastModifiedBy: {
    Id: string,
    Name: string
};
CreatedDate: string;
LastModifiedDate: string;
Subtotal__c: number;

DP_Age__c: number;
DP_Buyer_PO_Date__c: string;
DP_OrderNO__c: string;
DP_Product_Code__c: string;
DP_Product_Name__c: string;

}