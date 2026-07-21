import QouteItemProp from "./QouteItemProp";
import StaffProp from "./StaffProp";

export default interface QuoteProp{
    id: number;
    quotationId: number;
    staff: StaffProp;
    name: string;
    vat: number;
    total: number;
    quoteItems: QouteItemProp[];
}
