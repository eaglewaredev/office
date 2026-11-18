import StaffContainer from "@/components/StaffContainer";
import InvoiceProp from "@/data/InvoiceProp";
import { setLayoutProps, usePage } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const columns =[
    {field: 'refNo', headerName: 'RefNo'},
]

export default function Index({
    invoices,
}:{
    invoices: InvoiceProp[];
}){
    setLayoutProps({
        title: 'Invoices',
        menu: 'Invoices',
        subMenu: '',
    })

    const breadcrumbs = [
        <Typography>Home</Typography>
    ]
    const {flash} = usePage()

    const [open, setOpen] = useState(false)
    const handleOpen = ()=>setOpen(true)
    const handleClose = ()=>setOpen(false)

    return (
        <StaffContainer
        title='Invoices'
        breadcrumbs={breadcrumbs}
        flash={flash}
        >
            <IconButton
            onClick={handleOpen}
            >
                <Add/>
            </IconButton>
            <Box>
                <DataGrid
                showToolbar
                rows={invoices}
                columns={columns}
                />
            </Box>
        </StaffContainer>
    )
}
