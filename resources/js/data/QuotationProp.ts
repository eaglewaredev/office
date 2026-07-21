import ClientProp from "./ClientProp";
import QouteItemProp from "./QouteItemProp";
import QuoteProp from "./QuoteProp";
import StaffProp from "./StaffProp";

export default interface QuotationProp{
    id: number;
    refNo: string;
    client: ClientProp;
    staff: StaffProp;
    validityDate: string;
    currency: string;
    vat: number;
    total: number;
    dateCreated: string;
    dateUpdated: string;
    quotes: QuoteProp[];
}
