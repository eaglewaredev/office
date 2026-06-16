'use client'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { AppBar, Stack, Toolbar } from "@mui/material";
import React from 'react'
import AqademicEmblem from "@/components/AqademicEmblem";
import ThemeToggle from "@/components/ThemeToggle";
import MenuButton from "./MenuButton";
import SideMenuMobile from './SideMenuMobile';
import StaffProp from '@/data/StaffProp';

export default function Header({
    site,
    menu,
    subMenu,
    staff,
}:{
    site: string;
    menu: string;
    subMenu: string;
    staff: StaffProp;
}) {
    const [open, setOpen] = React.useState(false)
    const toggleDrawer = (newOpen: boolean)=> () => {
        setOpen(newOpen)
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                display: { xs: 'auto', md: 'none' },
                boxShadow: 0,
                bgcolor: 'background.paper',
                backgroundImage: 'none',
                borderBottom: '1px solid',
                borderColor: 'divider',
                // top: 'var(--template-frame-height, 0px)',
            }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        flexGrow: 1,
                        width: '100%',
                        gap: 1,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: 'center', mr: 'auto' }}
                    >
                        <MenuButton aria-label='menu' onClick={toggleDrawer(true)}>
                            <MenuRoundedIcon color='primary'/>
                        </MenuButton>
                        <img src={`/haweya-suban.png`}  width='140px' />
                    </Stack>
                    <ThemeToggle/>
                    <SideMenuMobile menu={menu} staff={staff} subMenu={subMenu} site={site} open={open} toggleDrawer={toggleDrawer}/>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
