import StaffProp from "@/data/StaffProp";
import StaffController from "@/wayfinder/App/Http/Controllers/StaffController";
import { Link, setLayoutProps, useForm } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { Box, Button, Chip, Container, Stack, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

function renderStatus(status: 0 | 1) {
    const colors: { [index: string]: 'success' | 'error' } ={
        1: 'success',
        0: 'error',
    }

    return <Chip label={status ? 'Active' : 'Inactive'} color={colors[status]} />
}

const columns: GridColDef<(typeof row)[number]>[] = [
    {
        field: 'username',
        headerName: 'Username',
        minWidth: 150,
    },
    {
        field: 'name',
        headerName: 'Name',
        minWidth: 150,
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 80,
        renderCell: (params)=>renderStatus(params.value as any),
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },
]

export default function Index({
    staffs,
}:{
    staffs: StaffProp[];
}) {
    console.log(staffs)
    setLayoutProps({
        title: 'Staff',
        menu: 'Staff',
        subMenu: '',
    })
    const {get} = useForm()
    return (
        <Container maxWidth='lg'>
            <Toolbar/>
           <Stack
            direction='row'
            sx={{
                justifyContent: 'space-between',
                mb: 1,
            }}
            >
                <Typography variant='h4'>
                    Staff
                </Typography>
                <Button
                variant="contained"
                startIcon={<Add/>}
                LinkComponent={Link}
                href={StaffController.newStaff().url}
                >
                    New Staff
                </Button>
            </Stack>
            <Box>
                <DataGrid
                showToolbar
                columns={columns}
                rows={staffs}
                onRowClick={(params: GridRowParams)=>{
                    console.log(params.row.email)
                    get(StaffController.show({ref: params.row.refNo}).url)
                }}/>
            </Box>
        </Container>
    )
}
