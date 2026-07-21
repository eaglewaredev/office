import ClientController from '@/wayfinder/App/Http/Controllers/ClientController';
import DashboardController from '@/wayfinder/App/Http/Controllers/DashboardController';
import StaffController from '@/wayfinder/App/Http/Controllers/StaffController';
import quotation from '@/wayfinder/routes/quotation';
import styled from '@emotion/styled';
import { Link } from '@inertiajs/react';
import { AccountBox, AccountBoxOutlined, AccountCircleOutlined, Inventory } from '@mui/icons-material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Avatar, Box, Button, Card, Chip, Divider, IconButton, LinearProgress, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import React from 'react'

const Nav = styled(List)<{ component?: React.ElementType }>({
  '.MuiListItem-root':{
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'start',
  },
  '& .MuiListItemButton-root': {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});


export default function MenuContent({
    menu,
    subMenu,
}:{
    menu: string;
    subMenu: string;
}) {
    function Toggler({
    defaultExpanded = false,
    renderToggle,
    children,
    }: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
    }) {
    const [open, setOpen] = React.useState(defaultExpanded);

    return (
        <React.Fragment>
        {renderToggle({ open, setOpen })}
        <Box
            sx={[
            {
                display: 'grid',
                transition: '0.2s ease',
                '& > *': {
                overflow: 'hidden',
                },
            },
            open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
            ]}
        >
            {children}
        </Box>
        </React.Fragment>
    );
    }

    return (
        <>
        <Box
            sx={{
            minHeight: 0,
            overflow: 'hidden auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            [`& .${listItemButtonClasses.root}`]: {
                gap: 1.5,
            },
            }}
        >
            <Nav
            dense
            disablePadding
            // size="sm"
            sx={{
                gap: 1,
                '--List-nestedInsetStart': '30px',
                '--ListItemButton-radius': '10px',
            }}
            >
                <ListItem >
                    <ListItemButton
                    LinkComponent={Link} href={DashboardController.index().url}
                     selected={menu == 'Dashboard'}>
                        <DashboardRoundedIcon
                        color={menu == 'Dashboard' ? 'primary' : undefined}
                         />
                        <ListItemText>
                            <Typography
                            color={menu == 'Dashboard' ? 'primary' : 'default'}
                             >Dashboard</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem >
                    <ListItemButton
                    LinkComponent={Link} href={StaffController.index().url}
                    selected={menu == 'Staff'} >
                        <AccountCircleOutlined
                            color={menu == 'Staff' ? 'primary' : undefined}
                          />
                        <ListItemText>
                            <Typography
                            color={menu == 'Staff' ? 'primary' : 'default'}
                             >Staff</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton
                    LinkComponent={Link}
                    href={ClientController.index().url}
                    selected={menu == 'Clients'} >
                    <AccountBoxOutlined />
                    <ListItemText>
                        <Typography >Clients</Typography>
                    </ListItemText>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton
                    LinkComponent={Link}
                    href={quotation.list().url}
                    selected={menu == 'Quotations'} >
                    <AccountBoxOutlined />
                    <ListItemText>
                        <Typography >Quotations</Typography>
                    </ListItemText>
                    </ListItemButton>
                </ListItem>

{/*
            <ListItem>
                <ListItemButton
                role="menuitem"
                component="a"
                // href="/joy-ui/getting-started/templates/messages/"
                >
                <QuestionAnswerRoundedIcon />
                <ListItemText>
                    <Typography >Messages</Typography>
                </ListItemText>
                <Chip size="small" color="primary" label="6" />
                </ListItemButton>
            </ListItem> */}
            <ListItem sx={{display: 'flex', flexDirection: 'column'}}>
                <Toggler
                defaultExpanded={menu == 'Settings'}
                renderToggle={({ open, setOpen }) => (
                    <ListItemButton onClick={() => setOpen(!open)}  sx={{width: '100%'}}>
                        <SettingsRoundedIcon
                        color={menu == 'Settings' ? 'primary' : undefined} />
                        <ListItemText>
                            <Typography
                             color={menu == 'Settings' ? 'primary' : 'default'}
                             >Settings</Typography>
                        </ListItemText>
                        <KeyboardArrowDownIcon
                        color={menu == 'Settings' ? 'primary' : undefined}
                            sx={[
                            open
                                ? {
                                    transform: 'rotate(180deg)',
                                }
                                : {
                                    transform: 'none',
                                },
                            ]}
                        />
                    </ListItemButton>
                )}
                >
                <List dense disablePadding sx={{ gap: 0.5 }}>
                    <ListItem sx={{ mt: 0.5 }}>
                        <ListItemButton
                            role="menuitem"
                            LinkComponent={Link}
                            // component="a"
                            href={``}
                        >
                            <Typography color={subMenu == 'Departments' ? 'primary' : 'default'} >
                                Departments
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                    <ListItemButton>Company Info</ListItemButton>
                    </ListItem>
                </List>
                </Toggler>
            </ListItem>
            </Nav>

        </Box>
        </>
    )
}
