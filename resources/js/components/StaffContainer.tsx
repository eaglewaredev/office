import staff from "@/wayfinder/routes/staff";
import { Link, setLayoutProps, usePage } from "@inertiajs/react";
import { Add, NavigateNext } from "@mui/icons-material";
import { Alert, Box, Breadcrumbs, Button, Container, Divider, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import HeaderVert from "./HeaderVert";
import { PageFlashData } from "@inertiajs/core";

interface Props{
    title: string;
    breadcrumbs: React.ReactElement[];
    flash: PageFlashData;
    children: React.ReactElement[];
}



export default function StaffContainer(props: Props){
    const {title, breadcrumbs, flash, children} = props

    return (
        <Container maxWidth='lg'>
            <Toolbar sx={{display: {xs: 'flex', md: 'none'}}}/>
            <Stack spacing={1} sx={{mt: {xs: 0, md: 1}}}>
                <Stack>
                    <Typography variant="h4" sx={{fontSize: {xs: 20, md: 25}}}>
                        {title}
                    </Typography>
                    <Stack
                    direction={'row'}
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    >
                        <Breadcrumbs separator={<NavigateNext/>}>{breadcrumbs}</Breadcrumbs>
                        <Stack direction={'row'} sx={{alignItems: 'center',}} spacing={1}>
                            {children.length > 1 ?
                            children[0] : <span/>
                            }
                            <HeaderVert/>
                        </Stack>

                    </Stack>
                </Stack>

                <Divider/>
                {flash && flash.success ? <Alert variant='filled'>{flash.success}</Alert>: <span/>}
                {flash && flash.error ? <Alert color="error" variant='filled'>{flash.error}</Alert>: <span/>}
                {children[1]}
            </Stack>

            <Toolbar/>
            {children.length > 2 ?
            children[2] : <span/>
            }
        </Container>
    )
}
