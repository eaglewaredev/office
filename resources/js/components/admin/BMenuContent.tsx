import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DomainIcon from '@mui/icons-material/DomainRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import { Avatar, Box, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import React from 'react'
import { Link } from '@inertiajs/react';
import PDashboardController from '@/wayfinder/App/Http/Controllers/pos/PDashboardController';
import SalesController from '@/wayfinder/App/Http/Controllers/pos/SalesController';
import OrderController from '@/wayfinder/App/Http/Controllers/pos/OrderController';
import { Description } from '@mui/icons-material';
import InventoryController from '@/wayfinder/App/Http/Controllers/pos/InventoryController';
import AdminProp from '@/data/AdminProp';
// import schools from '@/routes/ctrl/schools';
// import ctrl from '@/routes/ctrl';

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


export default function BMenuContent({
    menu,
    subMenu,
    admin,
}:{
     menu: string;
    subMenu: string;
    admin: AdminProp;
}) {
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
            <List
            dense
            disablePadding
            // size="sm"
            sx={{
                gap: 1,
                '--List-nestedInsetStart': '30px',
                '--ListItemButton-radius': '10px',
            }}
            >
                <ListItem component={Link} href={PDashboardController.index().url} >
                    <ListItemButton selected={menu == 'Dashboard'}>
                        <DashboardRoundedIcon />
                        <ListItemText>
                            <Typography >Dashboard</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem component={Link} href={SalesController.index().url}>
                    <ListItemButton  selected={menu == 'Sales'} >
                        <DomainIcon />
                        <ListItemText>
                            <Typography >Sales</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>

            <ListItem component={Link} href={SalesController.receipt().url}>
                <ListItemButton   selected={menu == 'Receipts'}>
                <ShoppingCartRoundedIcon />
                <ListItemText>
                    <Typography >Receipts</Typography>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem component={Link} href={InventoryController.index().url}>
                <ListItemButton   selected={menu == 'Inventory'}>
                <Description />
                <ListItemText>
                    <Typography >Inventory</Typography>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            {
                admin.admin ?
                <ListItem sx={{display: 'flex', flexDirection: 'column'}}>
                    <Toggler
                    defaultExpanded={menu == 'Orders'}
                    renderToggle={({ open, setOpen }) => (
                        <ListItemButton
                        selected={menu == 'Orders'}
                        onClick={() => setOpen(!open)}  sx={{width: '100%'}}>
                            <SettingsRoundedIcon />
                            <ListItemText>
                                <Typography >Orders</Typography>
                            </ListItemText>
                            <KeyboardArrowDownIcon

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
                                selected={subMenu == 'Orders'}
                                LinkComponent={Link}
                                href={OrderController.index().url}
                            >
                                All Orders
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton
                            selected={subMenu == 'Suppliers'}
                            LinkComponent={Link}
                            href={OrderController.suppliers().url}
                            >Suppliers</ListItemButton>
                        </ListItem>
                    </List>
                    </Toggler>
                </ListItem>
                :<Box/>
            }
            </List>
        </Box>
        </>
    )
}
