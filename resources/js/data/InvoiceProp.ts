import ClientProp from "./ClientProp";
import QouteItemProp from "./QouteItemProp";
import QuoteProp from "./QuoteProp";
import StaffProp from "./StaffProp";

export default interface InvoiceProp{
    id: number;
    refNo: string;
    client: ClientProp;
    staff: StaffProp;
    currency: string;
    total: number;
    dateCreated: string;
    dateUpdated: string;
}
