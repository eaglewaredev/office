import LoginCard from "@/components/LoginCard";
import LoginContainer from "@/components/LoginContainer";
import ThemeToggle from "@/components/ThemeToggle";
import LoginController from "@/wayfinder/App/Http/Controllers/admin/LoginController";
import { Form, Link, setLayoutProps, useForm } from "@inertiajs/react";
import { CheckBox, ChevronLeftOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Login({
    email,
}:{
    email: string;
}) {

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
                        <Stack direction='row' sx={{justifyContent: 'flex-end'}}>
                            <ThemeToggle/>
                        </Stack>

                        <Typography
                        component="h1" variant="h4" sx={{mb: 0}}>
                            Change Password
                        </Typography>
                        <Typography sx={{mb: 2}}>
                                Changing password for {email}
                            </Typography>
                        <FormControl>
                            <TextField
                            label='New Password'
                            autoFocus
                            required
                            name='password'
                            disabled={processing}
                            fullWidth
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

                        <Button
                        type='submit'
                        variant="contained"
                        loading={processing}
                        loadingPosition="start"
                        >Save</Button>
                    </LoginCard>
                )}
            </Form>
        </LoginContainer>
    )
}
