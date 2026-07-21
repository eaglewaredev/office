import LoginCard from "@/components/LoginCard";
import LoginContainer from "@/components/LoginContainer";
import ThemeToggle from "@/components/ThemeToggle";
import LoginController from "@/wayfinder/App/Http/Controllers/LoginController";
import { Form, Link, setLayoutProps, useForm } from "@inertiajs/react";
import { CheckBox, ChevronLeftOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
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
    return (
        <LoginContainer>
            <Form
            action=""
            method="post"
            >
                {({errors, processing})=>(
                    <LoginCard variant='outlined'>
                        <Stack direction='row' sx={{justifyContent: 'space-between'}}>
                            <IconButton LinkComponent={Link} href={LoginController.login().url}>
                                <ChevronLeftOutlined/>
                            </IconButton>
                            <ThemeToggle/>
                        </Stack>

                        <Typography
                        component="h1" variant="h4" sx={{mb: 0}}>
                            Forgot Password?
                        </Typography>
                        <Typography variant="h6">
                            We need to verify your account
                        </Typography>
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

                        <Button
                        type='submit'
                        variant="contained"
                        loading={processing}
                        loadingPosition="start"
                        >Verify</Button>
                    </LoginCard>
                )}
            </Form>
        </LoginContainer>
    )
}
