import { Form, useForm } from "@inertiajs/react";
import { Alert, Box, Button, FormHelperText, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React, { SyntheticEvent, useState } from "react";
import AqademicEmblem from "@/components/AqademicEmblem";
import LoginCard from "@/components/LoginCard";
import LoginContainer from "@/components/LoginContainer";
import ThemeToggle from "@/components/ThemeToggle";

export default function Verify({
    email,
}: {
    email: string;
}) {
    const [otp, setOtp] = React.useState('')


    const pattern = /^[0-9]+$/

    const handleComplete = (value: string) => {
        console.log(value)
    }

    const handleChange = (newValue: string) => {
        setOtp(newValue)
    }

    const validateChar = (value: string, index: number) => {
        return (value.length > 0) && pattern.test(value)
    }

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

    const {put} = useForm()
    function resendOTP(e) {
        e.preventDefault()

        put(
            '/admin/check',
            {
                onFlash: ({success})=>{
                    setSnackMsg(success)
                    showSnackbar()
                }
            }
        )
    }

    return (
        <LoginContainer>
            <Form action="" method="post"
            transform={(data)=>({...data, otp: otp})}
            >
                {({
                    errors,
                })=>(
                    <LoginCard variant='outlined'>
                        <Box sx={{position: 'relative'}}>
                            <Box sx={{position: 'absolute', top: 0, right: 0}}>
                                <ThemeToggle/>
                            </Box>
                        </Box>
                        {/* <AqademicEmblem/> */}
                        <Box>
                            <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                            >Staff Login
                            </Typography>
                            <Typography
                            component="h4"
                            variant="h5"
                            sx={{ width: '100%' }}
                            >OTP Verification
                            </Typography>
                            <Typography>
                                We've send the code to {email}
                            </Typography>
                        </Box>
                        <MuiOtpInput value={otp} length={6}
                        onComplete={handleComplete} validateChar={validateChar}
                        autoFocus sx={{mt: 5}} onChange={handleChange}
                        />
                        <FormHelperText sx={{mb: 5}} color='error'>
                            {errors.otp}
                        </FormHelperText>
                        <Button
                            type='submit'
                            variant="contained"
                        >Verify</Button>
                        <Button
                            type='submit'
                            variant="outlined"
                            onClick={resendOTP}
                        >Resend OTP</Button>
                    </LoginCard>
                )}
            </Form>
            <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    open={openSnackbar}
                    onClose={handleCloseSnackbar}
                    action={<Button color="primary" size="small">Close</Button>}
                >
                    <Alert variant="filled" onClose={handleCloseSnackbar} severity={isSnackbarError ? "error" : "success"}>{snackbarMsg}</Alert>
                </Snackbar>
        </LoginContainer>
    )
}
