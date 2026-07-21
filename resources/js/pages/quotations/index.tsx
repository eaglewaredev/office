import FormGrid from "@/components/FormGrid";
import StaffContainer from "@/components/StaffContainer";
import ClientProp from "@/data/ClientProp";
import ModalStyle from "@/data/ModalStyle";
import numberRegex from "@/data/NumberRegex";
import QuotationProp from "@/data/QuotationProp";
import quotation from "@/wayfinder/routes/quotation";
import { setLayoutProps, useForm, usePage } from "@inertiajs/react";
import { Add, Close } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Breadcrumbs, Button, Container, FormHelperText, Grid, IconButton, InputAdornment, MenuItem, Modal, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";

const columns: GridColDef<typeof row>[] = [
    {
        field: 'refNo',
        headerName: 'Ref No',
    },
    {
        field: 'client.name',
        headerName: 'Company Name',
        minWidth: 180,
        valueGetter: (value, row)=>{
            return `${row.client.companyName}`
        }
    },
    {
        field: 'phone1',
        headerName: 'Phone',
        valueGetter: (value, row)=>{
            return `${row.client.phone1}`
        }
    },
    {
        field: 'total',
        headerName: 'Total',
    },
    {
        field: 'createdBy',
        headerName: 'Created By',
    },
    {
        field: 'dateCreated',
        headerName: 'Date Created',
    }
]

export default function Index({
    quotations,
    clients,
}:{
    quotations: QuotationProp[];
    clients: ClientProp[];
}){
    setLayoutProps({
        title: 'Quotations',
        menu: 'Quotations',
        subMenu: '',
    })
    const breadcrumbs = [
        <Typography>
            Showing All Quotations
        </Typography>
    ]

    const [open, setOpen] = useState(false)
    const handleOpenModal = ()=>setOpen(true)
    const handleCloseModal = ()=>setOpen(false)

    const [value, setValue] = useState<string | null>();

    const clientList = clients.map((client)=>({id: client.id, label: client.companyName, email: client.email, phone: client.phone1}))

    const {get, data, setData, post, errors, processing} = useForm({
        clientId: 0,
        name: '',
        phone: '',
        email: '',
        validityPeriod: 30,
        currency: 'KSH',
    })
    const {flash} = usePage()

    function handleSubmit(e){
        e.preventDefault()

        post(quotation.create().url)
    }

    return (
        <>
        <StaffContainer
        title='Quotations'
        breadcrumbs={breadcrumbs}
        flash={flash}>
            <Tooltip title='New Quotation'>
                <IconButton
                onClick={handleOpenModal}
                >
                    <Add/>
                </IconButton>
            </Tooltip>


            <Box>
                <DataGrid
                showToolbar
                columns={columns}
                rows={quotations}
                onRowClick={(params: GridRowParams)=>{
                    get(quotation.show({ref: params.row.refNo}).url)
                }}
                />
            </Box>

        </StaffContainer>
        <Modal
            open={open}
            onClose={handleCloseModal}
            >
                <Box sx={ModalStyle}>
                    <Stack
                    direction={'row'}
                    sx={{
                        justifyContent: 'space-between'
                    }}
                    >
                        <Typography variant='h6'>New Quotation</Typography>

                        <IconButton onClick={handleCloseModal}>
                            <Close/>
                        </IconButton>
                    </Stack>
                    <form onSubmit={handleSubmit}>
                    <Grid container sx={{my: 2}} spacing={2}>
                        <FormGrid size={12}>
                            <Autocomplete
                            value={value}
                            options={clientList}
                            error={errors.name}
                            name='name'
                            getOptionKey={(option)=>option.id}
                            onChange={(event: any, newValue: string|null)=>{
                                setValue(newValue)
                                setData('name', newValue['label'])
                                setData('phone', newValue['phone'])
                                setData('email', newValue['email'])
                                setData('clientId', newValue['id'])
                            }}
                            renderInput={(params) => <TextField {...params} label="Client Name" />}
                            />
                            <FormHelperText error={true}>{errors.name}</FormHelperText>
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label={'Phone'}
                            disabled
                            value={data.phone}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label={'Email'}
                            disabled
                            value={data.email}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label='Validity Period'
                            name='validityPeriod'
                            value={data.validityPeriod}
                            onChange={(e)=>{
                                const q = e.target.value
                                if(!numberRegex.test(q)){
                                    return false
                                }
                                const qV = Number(e.target.value)
                                setData('validityPeriod',qV)
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                },
                                input: {
                                    endAdornment : <InputAdornment position="end">Days</InputAdornment>
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label='Currency'
                            name='currency'
                            value={data.currency}
                            onChange={(e)=>{
                                setData('currency',e.target.value)
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            select
                            >
                                <MenuItem value='KSH'>KSH</MenuItem>
                                <MenuItem value='USD'>USD</MenuItem>
                            </TextField>
                        </FormGrid>
                    </Grid>

                    <Stack
                    direction={'row'}
                    sx={{
                        justifyContent: 'flex-end',
                        gap: 1
                    }}
                    >
                        <Button
                        variant="contained"
                        type='submit'
                        loading={processing}
                        loadingPosition="start"
                        >Save</Button>
                        <Button
                        onClick={handleCloseModal}
                        >Close</Button>
                    </Stack>
                    </form>
                </Box>
            </Modal>
            </>
    )
}
