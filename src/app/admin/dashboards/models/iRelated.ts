import { IOriginalOrder } from './iOriginalOrder';
import { IFIleInvoice } from './iInvoiceFile';
import { IRelatedScheme } from './iRelatedScheme';
import { IRelatedOrders } from './iRelatedOrders';
import { IRelatedInvoices } from './iRelatedInvoices';
export interface IRelated {
    ListInvoiceFilesData: IFIleInvoice[];
    ListSchemeFilesData: IRelatedScheme[];
    RelatedInvoices: IRelatedInvoices[];
    RelatedOrdersItem: IRelatedOrders[];
    RelatedOriginalOrder: IOriginalOrder[];
}