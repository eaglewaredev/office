'use client'
import styled from "@emotion/styled"
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import AqademicEmblem from "@/components/AqademicEmblem";
import ThemeToggle from "@/components/ThemeToggle";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import SelectContent from "./SelectContent";
import StaffProp from "@/data/StaffProp";

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
})
export default function SideMenu({
    staff,
    site,
    menu,
    subMenu,
}: {
    staff: StaffProp;
    site: string;
    menu: string;
    subMenu: string;
}) {
    return (
        <Drawer
        variant="permanent"
        sx={{
            display: { xs: 'none', md: 'block' },
            // [`& .${drawerClasses.paper}`]: {
            // backgroundColor: brand[25],

            // },
        }}
        >
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
            mt: 'calc(var(--template-frame-height, 0px) + 4px)',
            p: 1.5,
            }}
            >
                {/* <img src={`/haweya-suban.png`}  width='140px' /> */}
                <ThemeToggle/>
            </Box>
            <Divider/>
            {/* <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1,
            mt: 'calc(var(--template-frame-height, 0px) + 4px)',
            p: 1.5,
            }}
            >
                <SelectContent site={site}/>
            </Box>
            <Divider/> */}
            <Box
                sx={{
                overflow: 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                }}
            >
                <MenuContent menu={menu} subMenu={subMenu}/>
            </Box>
            <Stack
                direction="row"
                sx={{
                p: 2,
                gap: 1,
                alignItems: 'center',
                borderTop: '1px solid',
                borderColor: 'divider',
                }}
            >
                <Avatar
                sizes="small"
                alt={staff.email}
                // src="/static/images/avatar/7.jpg"
                sx={{ width: 36, height: 36 }}
                />
                <Box sx={{mr: 'auto'}}>
                    <Typography variant="body2" sx={{fontWeight: 500, lineHeight: '16px'}}>
                        {staff.username}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {staff.email}
                    </Typography>
                </Box>
                <OptionsMenu/>
            </Stack>
        </Drawer>
    )
}
