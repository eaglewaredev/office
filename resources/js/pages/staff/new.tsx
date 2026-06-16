import FormGrid from "@/components/FormGrid";
import StaffController from "@/wayfinder/App/Http/Controllers/StaffController";
import { Form, setLayoutProps, Link, useForm } from "@inertiajs/react";
import { NavigateNext } from "@mui/icons-material";
import { Alert, Breadcrumbs, Button, Container, FormHelperText, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, SnackbarCloseReason, Stack, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";


const breadcrumbs = [
        <Link color='primary' key='2' href={StaffController.index().url}>Home</Link>,
        <Typography>New Staff</Typography>
    ]

export default function NewStaff() {
    setLayoutProps({
        title: "New Staff",
        menu: "Staff",
        subMenu: ''
    })

    const { data, setData, post, put, errors, setError, processing } = useForm({
        name: '',
        username: '@',
        admin: 0,
        email: '',
        phone: '',
        emailCode: '',
        phoneCode: '',
    })

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMsg, setSnackMsg] = useState('')
    const [isSnackbarError, setSnackbarError] = useState(false)

    const showSnackbar = () => {
        setOpenSnackbar(true)
    }

    const handleCloseSnackbar = (
        event: SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if(reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false)
      }

    const sendEmailCode = (e)=> {
        e.preventDefault()
        put("new/email",{
            onFlash: ({success})=> {
                setSnackMsg(success)
                showSnackbar()
            },
        })
    }

    const checkEmailValidationCode = () => {
        put("new/email-validate",{
            onFlash: ({success})=> {
                setSnackMsg(success)
                showSnackbar()
            },
        })
    }

    const sendPhoneCode = async()=> {
        put("new/phone",{
            onFlash: ({success})=> {
                setSnackMsg(success)
                showSnackbar()
            },
        })
    }

    const checkPhoneValidationCode = () => {
        put("new/phone-validate",{
            onFlash: ({success})=> {
                setSnackMsg(success)
                showSnackbar()
            },
        })
    }

    function handleSubmit() {
        post('');
    }

    return (
        <Container maxWidth="md" sx={{display: 'flex-col',gap: 2,mt: {'xs': '56px', md: '20px'}}}>
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                New Staff
            </Typography>
            <Stack direction='row' sx={{justifyContent: 'space-between', mb: 2}}>
                <Breadcrumbs
                separator={<NavigateNext fontSize='small'/>}
                >{breadcrumbs}</Breadcrumbs>
            </Stack>
            <form
            onSubmit={handleSubmit}
            action="">
                <Grid container spacing={2} sx={{gap: 2}} columns={12}>
                    <FormGrid size={12}>
                        <TextField
                        label='Name'
                        placeholder="Full Name"
                        name='name'
                        error={errors.name ? true : false}
                        helperText={errors.name}
                        value={data.name}
                        onChange={(e)=>setData('name', e.target.value.toLocaleUpperCase())}
                        autoFocus
                        />
                    </FormGrid>
                    <FormGrid size={{xs: 12, md: 6}}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                        id='username'
                        name='username'
                        placeholder='@Username'
                        error={errors.username ? true : false}
                        helperText={errors.username}
                        value={data.username}
                        onChange={(e)=>setData('username', e.target.value.toLocaleLowerCase())}
                        />
                    </FormGrid>
                    <FormGrid size={{xs: 12, md: 6}}>
                        <InputLabel id='admin'>Admin</InputLabel>
                        <Select
                        labelId='admin'
                        id='admin'
                        name='admin'
                        error={errors.admin ? true : false}
                        value={data.admin}
                        onChange={(e)=>setData('admin', e.target.value)}
                        >
                            <MenuItem value={1}>Yes</MenuItem>
                            <MenuItem value={0}>No</MenuItem>
                        </Select>
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="email" required>
                            Email
                        </FormLabel>
                        <OutlinedInput
                        id="email"
                        name="email"
                        value={data.email}
                        placeholder='email@email.com'
                        error={errors.email ? true : false}
                        onChange={(e)=>setData('email', e.target.value.toLowerCase())}
                        // disabled={processing}
                        // required
                        // size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                    size="small"
                                    variant="contained"
                                    loading={processing}
                                    loadingPosition='start'
                                    onClick={sendEmailCode}
                                    sx={{py: 0, height: 30}}>Send Code</Button>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={true}>{errors.email}</FormHelperText>
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="code" required>
                        Verification Code
                        </FormLabel>
                        <OutlinedInput
                        id="code"
                        name="code"
                        // required
                        disabled={processing}
                        value={data.emailCode}
                        placeholder='Email Code'
                        error={errors.emailCode ? true : false}
                        onChange={(e)=>setData('emailCode',e.target.value)}
                        // size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                    onClick={checkEmailValidationCode}
                                    variant="contained"
                                    loadingPosition='start'
                                    loading={processing}
                                    size="small"
                                    sx={{py: 0, height: 30}}>Verify Code</Button>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={true}>{errors.emailCode}</FormHelperText>
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="phone" required>
                            Phone
                        </FormLabel>
                        <OutlinedInput
                        id="phone"
                        name="phone"
                        placeholder='0712345678'
                        error={errors.phone ? true : false}
                        value={data.phone}
                        onChange={(e)=>setData('phone', e.target.value)}
                        // disabled={processing}
                        // required
                        // size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                    size="small"
                                    variant="contained"
                                    loading={processing}
                                    loadingPosition='start'
                                    onClick={sendPhoneCode}
                                    sx={{py: 0, height: 30}}>Send Code</Button>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={true}>{errors.phone}</FormHelperText>
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="code" required>
                        Verification Code
                        </FormLabel>
                        <OutlinedInput
                        id="code"
                        name="code"
                        // required
                        disabled={processing}
                        value={data.phoneCode}
                        placeholder='Phone Code'
                        error={errors.phoneCode ? true : false}
                        onChange={(e)=>setData('phoneCode',e.target.value)}
                        // size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                    onClick={checkPhoneValidationCode}
                                    variant="contained"
                                    loadingPosition='start'
                                    loading={processing}
                                    size="small"
                                    sx={{py: 0, height: 30}}>Verify Code</Button>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={true}>{errors.phoneCode}</FormHelperText>
                    </FormGrid>
                    <FormGrid size={12}>
                        <Button
                        variant='contained'
                        loading={processing}
                        loadingPosition="start"
                        type='submit'
                        onClick={handleSubmit}
                        >Save</Button>
                    </FormGrid>
                </Grid>
            </form>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    open={openSnackbar}
                    onClose={handleCloseSnackbar}
                    action={<Button color="primary" size="small">Close</Button>}
                >
                    <Alert variant="filled" onClose={handleCloseSnackbar} severity={isSnackbarError ? "error" : "success"}>{snackbarMsg}</Alert>
                </Snackbar>
        </Container>
    )
}
