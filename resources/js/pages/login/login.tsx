import LoginCard from "@/components/LoginCard";
import LoginContainer from "@/components/LoginContainer";
import ThemeToggle from "@/components/ThemeToggle";
import LoginController from "@/wayfinder/App/Http/Controllers/LoginController";
import { Form, Link, setLayoutProps, useForm, usePage } from "@inertiajs/react";
import { CheckBox, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Login() {

    setLayoutProps({
        title: 'Admin Login',
    })

    const {data, setData, errors, processing} = useForm({
        username: '',
    })

    const [showPassword, setShowPassword] = useState(false)

    function togglePassword() {
        setShowPassword(!showPassword)
    }

    const {flash} = usePage()

    return (
        <LoginContainer>
            <Form
            action=""
            method="post"
            >
                {({errors, processing})=>(
                    <LoginCard variant='outlined'>
                        <Box sx={{position: 'relative'}}>
                            <Box sx={{position: 'absolute', top: 0, right: 0}}>
                                <ThemeToggle/>
                            </Box>
                        </Box>
                        <Typography
                        component="h1" variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem'}}>
                            Login
                        </Typography>
                        {flash && flash.success ? <Alert variant="filled" sx={{my: 2}}>{flash.success}</Alert> : <Box/> }
                        <FormControl>
                            <TextField
                            error={errors.username ? true : false }
                            helperText={errors.username}
                            label='Username'
                            name="username"
                            placeholder="@username or email or phone"
                            id="username"
                            autoFocus
                            required
                            disabled={processing}
                            fullWidth
                            variant="outlined"
                            color={errors.username ? 'error' : 'primary'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                            label='Password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            error={errors.password ? true : false }
                            helperText={errors.password}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            onClick={togglePassword}
                                            >
                                                {showPassword ?
                                                <VisibilityOutlined/>
                                                :<VisibilityOffOutlined/>
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            />
                        </FormControl>
                        <FormControlLabel
                            disabled={processing}
                            control={<CheckBox  name="rememberMe" color='primary'/>}
                            label="Remember me"
                        />

                        <Button
                        type='submit'
                        variant="contained"
                        loading={processing}
                        loadingPosition="start"
                        >Login</Button>

                        <Link href={LoginController.checkAccount().url}>
                        <Typography color='primary' sx={{my: 2}}>
                            Forgot password?
                        </Typography>

                        </Link>
                    </LoginCard>
                )}
            </Form>
        </LoginContainer>
    )
}
