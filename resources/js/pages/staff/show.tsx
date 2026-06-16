import AModal from "@/components/AModal";
import FormGrid from "@/components/FormGrid";
import ModalStyle from "@/data/ModalStyle";
import StaffProp from "@/data/StaffProp";
import StaffController from "@/wayfinder/App/Http/Controllers/StaffController";
import { Form, Link, setLayoutProps, useForm, usePage } from "@inertiajs/react";
import { Close, Edit, NavigateNext } from "@mui/icons-material";
import { Alert, Box, Breadcrumbs, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const breadcrumbs = [
        // <Link component color='primary' key='1' href={}></Link>,
        <Link color='primary' href={StaffController.index().url} key='2'>Home</Link>,
        <Typography>Staff Details</Typography>
    ]

export default function Show({
    staff,
}: {
    staff: StaffProp;
}){
    setLayoutProps({
        title: "Staff Details",
        menu: 'Staff',
        subMenu: '',
    })

    const { flash } = usePage().props

    const [ open, setOpen] = useState(false)
    const handleOpenModal = ()=> setOpen(true)
    const handleCloseModal = ()=>setOpen(false)

    const [showAlert, setShowAlert]= useState('')

    const {data, setData, post, errors,processing} = useForm({
        name: staff.name,
        status: staff.status,
        username: staff.username,
        email: staff.email,
        phone: staff.phone,
        admin: staff.admin,
    })

    function handleSuccess(page) {
        setShowAlert(page.flash.success)
        handleCloseModal()
    }

    return (
        <Container maxWidth="md" sx={{display: 'flex-col',gap: 2,mt: {'xs': '56px', md: '20px'}}}>
            <Typography component="h2" variant='h6' sx={{mb: 2}}>
                Staff Details
            </Typography>
            <Stack direction='row' sx={{justifyContent: 'space-between'}}>
                <Breadcrumbs
                separator={<NavigateNext fontSize='small'/>}
                >{breadcrumbs}</Breadcrumbs>

                <IconButton
                size='small'
                color='primary'
                onClick={handleOpenModal}
                >
                    <Edit/>
                </IconButton>
            </Stack>
            {flash && flash.success ? <Alert variant="filled">{flash.success}</Alert> : <Box/> }
             {showAlert.length ? <Alert variant="filled">{showAlert}</Alert> : <Box/> }
            <List dense>
                <ListItem>
                    <ListItemText
                    primary={staff.name}
                    secondary='Full Name'
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <ListItemText
                    primary={staff.username}
                    secondary='@username'
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <ListItemText
                    primary={staff.phone}
                    secondary='Phone'
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <ListItemText
                    primary={staff.email}
                    secondary='Email'
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <ListItemText
                    sx={{color: staff.status ? 'success.main' : 'error.main'}}
                    primary={staff.status ? 'Active' : 'Inactive'}
                    secondary='Status'
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <ListItemText
                    primary={staff.admin ? 'Yes' : 'No'}
                    secondary='Admin'
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <ListItemText
                    primary={staff.updatedAt}
                    secondary='Date Updated'
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <ListItemText
                    primary={staff.createdAt}
                    secondary='Date Created'
                    />
                </ListItem>
            </List>
            <Modal
            open={open}
            onClose={handleCloseModal}
            >
            <Box sx={ModalStyle}>
                <Stack direction='row'
                sx={{justifyContent: 'space-between'}}>
                    <Typography variant="h4">
                        Update Staff
                    </Typography>
                    <IconButton onClick={handleCloseModal} size='small'>
                        <Close />
                    </IconButton>
                </Stack>
                <Form action='' onSuccess={handleSuccess} method='post'>
                    <Grid container spacing={2} columns={12} sx={{my: 2}}>
                        <FormGrid size={12}>
                            <TextField
                            label='Staff Name'
                            value={data.name}
                            name='name'
                            error={errors.name ? true : false}
                            helperText={errors.name}
                            onChange={(e)=>setData('name', e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={12}>
                            <TextField
                            label='Username'
                            value={data.username}
                            name='username'
                            error={errors.username ? true : false}
                            helperText={errors.username}
                            onChange={(e)=>setData('username', e.target.value.toLocaleLowerCase())}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={12}>
                            <TextField
                            label='Email'
                            value={data.email}
                            name='email'
                            onChange={(e)=>setData('email', e.target.value.toLocaleLowerCase())}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={12}>
                            <TextField
                            label='Phone'
                            value={data.phone}
                            name='phone'
                            error={errors.phone ? true : false}
                            helperText={errors.phone}
                            onChange={(e)=>setData('phone', e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            />
                        </FormGrid>
                        <FormGrid size={12}>
                            <TextField
                            label='Admin'
                            value={data.admin}
                            name='admin'
                            onChange={(e)=>setData('admin', e.target.value)}
                            select
                            >
                                <MenuItem value={1}>Yes</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </TextField>
                        </FormGrid>
                    </Grid>
                    <Stack
                    sx={{
                        justifyContent: 'flex-end',
                        gap: 2,
                    }}
                    direction='row'>
                        <Button type='submit' variant='contained' >Save</Button>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </Stack>
                </Form>
                </Box>
            </Modal>
        </Container>
    )
}
