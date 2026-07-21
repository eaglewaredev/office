import QuotationProp from "@/data/QuotationProp";
import { Grid, List, ListItem, ListItemText } from "@mui/material";

export default function QuotationDetails({
    quotation,
}:{
    quotation: QuotationProp
}){
    return (
        <Grid container>
                <Grid size={{xs: 12, md: 6}}>
                    <List dense disablePadding>
                        <ListItem>
                            <ListItemText
                            primary={quotation.refNo}
                            secondary={'Ref No'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={quotation.currency}
                            secondary={'Currency'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={`${quotation.validityDate}`}
                            secondary={'Validity Period'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={quotation.total}
                            secondary={'Grand Total'}
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <List dense disablePadding>
                        <ListItem>
                            <ListItemText
                            primary={quotation.client.companyName}
                            secondary={'Company/Person/Institution Name'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={quotation.client.contactPerson ?? 'NULL'}
                            secondary={'Contact Person'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={quotation.client.phone1}
                            secondary={'Phone 1'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={quotation.client.pin ?? 'NULL'}
                            secondary={'KRA Pin'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={quotation.client.email ?? 'NULL'}
                            secondary={'Email'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                            primary={quotation.client.location ?? 'NULL'}
                            secondary={'Location'}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
    )
}
