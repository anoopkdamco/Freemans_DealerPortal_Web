export class Products {
public Family__c: string;
public Id: string;
public LastModifiedBy: {};
public LastModifiedById: string;
public Name: string;
public ProductCode__c: string;
public Stock__c: number;

constructor(
Family__c: string,
Id: string,
LastModifiedBy: {},
LastModifiedById: string,
Name: string,
ProductCode__c: string,
Stock__c: number
) {
    this.Family__c = Family__c;
    this.Id = Id;
    this.LastModifiedBy = this.LastModifiedBy;
    this.LastModifiedById = this.LastModifiedById;
    this.Name = Name;
    this.ProductCode__c = ProductCode__c;
    this.Stock__c = Stock__c;
}
}