import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Avatar, Button, Divider, Drawer, drawerClasses, Stack, Typography } from "@mui/material";
import MenuButton from "./MenuButton";
import MenuContent from "./MenuContent";
import BMenuContent from './BMenuContent';
import SelectContent from './SelectContent';
import { Link } from '@inertiajs/react';
import StaffProp from '@/data/StaffProp';

interface SideMenuMobileProps{
    open: boolean | undefined;
    site: string;
    menu: string;
    subMenu: string;
    staff: StaffProp;
    toggleDrawer: (newOpen: boolean)=> () => void;
}

export default function SideMenuMobile({open, site, menu, subMenu, staff, toggleDrawer}: SideMenuMobileProps) {
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                [`& .${drawerClasses.paper}`]: {
                backgroundImage: 'none',
                backgroundColor: 'background.paper',
                },
            }}
        >
            <Stack
                sx={{
                    maxWidth: '70dvw',
                    height: '100%',
                }}
            >
                {/* <Stack direction="row" sx={{ p: 2, pb: 2, gap: 1 }}>
                    <SelectContent site={site}/>
                </Stack> */}
                {/* <Divider /> */}
                <Stack sx={{flexGrow: 1}}>

                    <MenuContent menu={menu} subMenu={subMenu}/>
                    <Divider/>
                </Stack>
                <Stack sx={{p: 2}}>
                    <Button variant="outlined"
                    href={''}
                    component={Link}  fullWidth startIcon={<LogoutRoundedIcon/>}>
                        Logout
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    )
}
