import FormGrid from "@/components/FormGrid";
import { setLayoutProps } from "@inertiajs/react";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Card, CardContent, Container, Grid, Stack, Toolbar, Typography } from "@mui/material";

export default function Index({
    staffCount,
}:{
    staffCount: number;
}) {
    setLayoutProps({
        title: 'Dashboard',
        menu: 'Dashboard',
        subMenu: '',
    })
    return (
        <Container maxWidth='lg'>
            <Toolbar/>
            <Typography variant='h4'>
                Dashboard
            </Typography>
            <Grid container spacing={2} columns={12}>
                <FormGrid size={{xs: 12, md: 4}}>
                    <Card
                    sx={{p: 0}}
                    >
                        <CardContent
                        sx={{p: 2}}
                        >
                            <Stack
                            direction='row'
                            sx={{
                                justifyContent: 'space-between'
                            }}
                            >
                                <Stack>
                                    <Typography variant="h2">
                                        Staff
                                    </Typography>
                                    <Typography variant="h6">
                                        {staffCount}
                                    </Typography>
                                </Stack>
                                <AccountCircleOutlined
                                sx={{fontSize: 70}}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </FormGrid>
                <FormGrid size={{xs: 12, md: 4}}>
                    <Card
                    sx={{p: 0}}
                    >
                        <CardContent
                        sx={{p: 2}}
                        >
                            <Stack
                            direction='row'
                            sx={{
                                justifyContent: 'space-between'
                            }}
                            >
                                <Stack>
                                    <Typography variant="h2">
                                        Quotations
                                    </Typography>
                                    <Typography variant="h6">
                                        {staffCount}
                                    </Typography>
                                </Stack>
                                <AccountCircleOutlined
                                sx={{fontSize: 70}}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </FormGrid>
                <FormGrid size={{xs: 12, md: 4}}>
                    <Card
                    sx={{p: 0}}
                    >
                        <CardContent
                        sx={{p: 2}}
                        >
                            <Stack
                            direction='row'
                            sx={{
                                justifyContent: 'space-between'
                            }}
                            >
                                <Stack>
                                    <Typography variant="h2">
                                        Invoices
                                    </Typography>
                                    <Typography variant="h6">
                                        {staffCount}
                                    </Typography>
                                </Stack>
                                <AccountCircleOutlined
                                sx={{fontSize: 70}}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </FormGrid>
            </Grid>
            <Toolbar/>
        </Container>
    )
}
