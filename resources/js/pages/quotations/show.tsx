import ClientProp from "@/data/ClientProp";
import ClientController from "@/wayfinder/App/Http/Controllers/ClientController";
import { Alert, Autocomplete, Box, Breadcrumbs, Button, Container, Divider, FormHelperText, Grid, IconButton, InputAdornment, Link, List, ListItem, ListItemText, MenuItem, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import {Link as ALink, setLayoutProps, useForm, usePage} from '@inertiajs/react'
import { Add, Close, Delete, DownloadOutlined, Edit, EditOutlined, Tag } from "@mui/icons-material";
import { useState } from "react";
import ModalStyle from "@/data/ModalStyle";
import FormGrid from "@/components/FormGrid";
import Tab from '@mui/material/Tab';
import QuotationProp from "@/data/QuotationProp";
import numberRegex from "@/data/NumberRegex";
import QuotationController from "@/wayfinder/App/Http/Controllers/QuotationController";
import StaffContainer from "@/components/StaffContainer";
import QuoteProp from "@/data/QuoteProp";
import QuotationDetails from "./components/QuotationDetails";
import Quotes from "./components/Quotes";
import { quotationDownload, updateQuotation } from "@/wayfinder/routes/quotation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Index({
    quotation,
    clients,
}:{
    quotation: QuotationProp;
    clients: ClientProp[];
}){
    setLayoutProps({
        title: 'Quoate: '+quotation.refNo,
        menu: 'Quotations',
        subMenu: '',
    })
    const breadcrumbs = [
        <Link component={ALink} href={QuotationController.index().url}>Quotations</Link>,
        <Typography>Client Details</Typography>
    ]

    const [open, setOpen] = useState(false)
    const handleOpenModal = ()=>setOpen(true)
    const handleCloseModal = ()=>setOpen(false)

    const {data, setData,post, reset, get,errors, processing} = useForm({
        clientId: quotation.client.id,
        name: quotation.client.companyName,
        phone: quotation.client.phone1,
        email: quotation.client.email,
        validityPeriod: quotation.validityDate,
        currency: quotation.currency,
    })

    function handleSubmit(e) {
        e.preventDefault()

        post(updateQuotation({ref: quotation.refNo}).url,{
            onFlash: ({success})=>{
                handleCloseModal()
            }
        })
    }

    const clientList = clients.map((client)=>({id: client.id, label: client.companyName, email: client.email, phone: client.phone1}))
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const {flash} = usePage()

    return (
        <>
        <StaffContainer
        title='Quotation Details'
        breadcrumbs={breadcrumbs}
        flash={flash}
        >
            <Stack spacing={1} direction={'row'}>
                <Tooltip title='Edit Quotation'>
                    <IconButton
                    size='small'
                    onClick={handleOpenModal}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Download Quotation PDF'>
                    <IconButton
                    size='small'
                    href={quotationDownload({ref: quotation.refNo}).url}>
                        <DownloadOutlined/>
                    </IconButton>
                </Tooltip>
            </Stack>

            <QuotationDetails quotation={quotation}/>

            <Quotes quotation={quotation}/>

        </StaffContainer>

        {/* [START update client modal] */}
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
            {/* [END new client modal] */}
            </>
    )
}

