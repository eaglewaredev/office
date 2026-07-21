import FormGrid from "@/components/FormGrid";
import ClientProp from "@/data/ClientProp";
import ModalStyle from "@/data/ModalStyle";
import ClientController from "@/wayfinder/App/Http/Controllers/ClientController";
import { setLayoutProps, useForm } from "@inertiajs/react";
import { Add, Close, NavigateNext } from "@mui/icons-material";
import { Alert, Box, Breadcrumbs, Button, Container, Divider, Grid, IconButton, Modal, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";

const columns: GridColDef<typeof row>[] = [
    {
        field: 'refNo',
        headerName: 'Ref No',
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        minWidth: 180,
    },
    {
        field: 'phone1',
        headerName: 'Phone1',
    },
    {
        field: 'email',
        headerName: 'Email',
    }
]

export default function Index({
    clients,
}:{
    clients: ClientProp[];
}) {
    setLayoutProps({
        title: 'Clients',
        menu: 'Clients',
        subMenu: '',
    })
    const breadcrumbs = [
        <Typography>
            Clients
        </Typography>
    ]
    const [open, setOpen] = useState(false)
    const handleOpenModal = ()=>setOpen(true)
    const handleCloseModal = ()=>setOpen(false)

    const {data, setData,post, reset, get,errors, processing} = useForm({
        companyName: '',
        contactPerson: '',
        phone1: '',
        phone2: '',
        email: '',
        pin: '',
        location: '',
    })

    const [showAlert, setShowAlert] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        post('',{
            onFlash: ({success})=>{
                setShowAlert(success)
                reset()
                handleCloseModal()
            }
        })
    }

    return (
        <Container maxWidth='lg'>
            <Toolbar/>
            <Typography variant='h3'>
                Clients
            </Typography>
            <Stack
            sx={{justifyContent: 'space-between'}}
            direction='row'>
                <Breadcrumbs
                seperator={<NavigateNext fontSize='small'/>}
                >{breadcrumbs}</Breadcrumbs>
                <Button
                variant="contained"
                onClick={handleOpenModal}
                startIcon={<Add/>}
                >New Client</Button>
            </Stack>
            <Divider sx={{my: 1}}/>
            {showAlert.length ? <Alert sx={{mb: 1}} variant="filled">{showAlert}</Alert>:<Box/>}
            <Box>
                <DataGrid
                showToolbar
                columns={columns}
                rows={clients}
                onRowClick={(params: GridRowParams)=>{
                    get(ClientController.show({ref: params.row.refNo}).url)
                }}
                />
            </Box>
            {/* [START new client modal] */}
            <Modal
            open={open}
            onClose={handleCloseModal}
            >
                <Box sx={ModalStyle}>
                    <form onSubmit={handleSubmit} method='post'>
                    <Stack
                    direction={'row'}
                    sx={{
                        justifyContent: 'space-between'
                    }}
                    >
                        <Typography variant="h3">
                            New Client
                        </Typography>
                        <IconButton
                        onClick={handleCloseModal}
                        >
                            <Close/>
                        </IconButton>
                    </Stack>
                    <Grid container
                    sx={{my: 1}}
                    spacing={2}>
                        <FormGrid size={12}>
                            <TextField
                            label='Company Name*'
                            placeholder='Company/Person/Institution name'
                            value={data.companyName}
                            error={errors.companyName ? true : false}
                            helperText={errors.companyName}
                            onChange={(e)=>setData('companyName', e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={12}>
                            <TextField
                            label='Contact Person'
                            placeholder='Contact name'
                            value={data.contactPerson}
                            error={errors.contactPerson ? true : false}
                            helperText={errors.contactPerson}
                            onChange={(e)=>setData('contactPerson', e.target.value.toLocaleLowerCase())}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label='Phone1'
                            placeholder='0712345678'
                            value={data.phone1}
                            error={errors.phone1 ? true : false}
                            helperText={errors.phone1}
                            placeholder=''
                            onChange={(e)=>setData('phone1', e.target.value.toLocaleLowerCase())}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label='Phone2'
                            value={data.phone2}
                            error={errors.phone2 ? true : false}
                            helperText={errors.phone2}
                            placeholder=''
                            onChange={(e)=>setData('phone2', e.target.value.toLocaleLowerCase())}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={12}>
                            <TextField
                            label='Email'
                            placeholder=''
                            value={data.email}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            onChange={(e)=>setData('email', e.target.value.toLocaleLowerCase())}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label='KRA PIN'
                            placeholder=''
                            value={data.pin}
                            error={errors.pin ? true : false}
                            helperText={errors.pin}
                            onChange={(e)=>setData('pin', e.target.value.toLocaleLowerCase())}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={6}>
                            <TextField
                            label='Location'
                            placeholder='eg. Nairobi'
                            value={data.pin}
                            error={errors.pin ? true : false}
                            helperText={errors.pin}
                            onChange={(e)=>setData('location', e.target.value.toLocaleLowerCase())}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormGrid>
                    </Grid>
                    <Stack
                    direction={'row'}
                    sx={{
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                    >
                        <Button
                        variant="contained"
                        type='submit'
                        loading={processing}
                        loadingPosition="start"
                        >
                            Save
                        </Button>
                        <Button
                        onClick={handleCloseModal}
                        >
                            Close
                        </Button>
                    </Stack>
                    </form>
                </Box>
            </Modal>
            {/* [END new client modal] */}
        </Container>
    )
}
