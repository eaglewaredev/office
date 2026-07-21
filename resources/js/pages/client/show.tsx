import ClientProp from "@/data/ClientProp";
import ClientController from "@/wayfinder/App/Http/Controllers/ClientController";
import { Alert, Box, Breadcrumbs, Button, Container, Grid, IconButton, Link, List, ListItem, ListItemText, Modal, Stack, Tabs, TextField, Toolbar, Typography } from "@mui/material";
import {Link as ALink, setLayoutProps, useForm} from '@inertiajs/react'
import { Close, EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import ModalStyle from "@/data/ModalStyle";
import FormGrid from "@/components/FormGrid";
import Tab from '@mui/material/Tab';

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
    client,
}:{
    client: ClientProp
}){
    setLayoutProps({
        title: 'Clients: '+client.companyName,
        menu: 'Clients',
        subMenu: '',
    })
    const breadcrumbs = [
        <ALink href={ClientController.index().url}>Clients</ALink>,
        <Typography>Client Details</Typography>
    ]
    const [alert, setAlert] = useState('')

    const [open, setOpen] = useState(false)
    const handleOpenModal = ()=>setOpen(true)
    const handleCloseModal = ()=>setOpen(false)

    const {data, setData,post, reset, get,errors, processing} = useForm({
        companyName: client.companyName,
        contactPerson: client.contactPerson,
        phone1: client.phone1,
        phone2: client.phone2,
        email: client.email,
        pin: client.pin,
        location: client.location,
    })

    function handleSubmit(e) {
        e.preventDefault()

        post('',{
            onFlash: ({success})=>{
                setAlert(success)
                // reset()
                handleCloseModal()
            }
        })
    }

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    return (
        <Container maxWidth='lg'>
            <Toolbar/>
            <Typography variant='h6'>
                Client Details
            </Typography>
            <Stack
            sx={{justifyContent: 'space-between'}}
            direction={'row'}>
                <Breadcrumbs

                >{breadcrumbs}</Breadcrumbs>
                <Button
                variant="contained"
                onClick={handleOpenModal}
                startIcon={<EditOutlined/>}
                >Edit Client</Button>
            </Stack>
            {
                alert.length ?
                <Alert variant="filled" sx={{my: 1}}>{alert}</Alert>
                :<Box/>
            }
            <List dense disablePadding>
                <ListItem>
                    <ListItemText
                    primary={client.companyName}
                    secondary={'Company/Person/Institution Name'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary={client.contactPerson ?? 'NULL'}
                    secondary={'Contact Person'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary={client.phone1}
                    secondary={'Phone 1'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary={client.phone2 ?? 'NULL'}
                    secondary={'Phone 2'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary={client.pin ?? 'NULL'}
                    secondary={'KRA Pin'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary={client.email ?? 'NULL'}
                    secondary={'Email'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    primary={client.location ?? 'NULL'}
                    secondary={'Location'}
                    />
                </ListItem>
            </List>

            <Box sx={{width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Quotations" {...a11yProps(0)} />
                        <Tab label="Invoice" {...a11yProps(1)} />
                        <Tab label="Payments" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    Quotations
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Invoice
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Payments/>
                </CustomTabPanel>
            </Box>

            {/* [START update client modal] */}
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

function Payments(){
    return (
        <Stack>
            <Typography variant="h5">
                Payments
            </Typography>
            asf
        </Stack>
    )
}
