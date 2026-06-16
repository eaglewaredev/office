'use client';
import styled from "@emotion/styled";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, List, Drawer, IconButton, InputAdornment, ListItem, ListItemButton, ListItemText, Menu, MenuItem, MenuProps, Stack, TextField, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import AqademicEmblem from "@/components/AqademicEmblem";
import ThemeToggle from "@/components/ThemeToggle";
import { SearchOutlined, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import { Form, Link, usePage } from "@inertiajs/react";
import PublicController from "@/wayfinder/App/Http/Controllers/www/PublicController";
import CartController from "@/wayfinder/App/Http/Controllers/www/CartController";

const StyledToolbar = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    px: 3
}));

const drawerWidth = 240;


export default function WAppBar({
    menu,
}: {
    menu: string;
}) {
    const [open, setOpen] = useState(false)
    const toggleDrawer = () => {
        console.log(open)
      setOpen( !open);
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // login menu
    const [anchorMenuEl, setAnchorMenuEl] = useState<null |HTMLElement>(null)
    const loginMenuOpen = Boolean(anchorMenuEl)
    const handleLoginMenuClick = (event: React.MouseEvent<HTMLElement>)=>{
        setAnchorMenuEl(event.currentTarget)
    }
    const handleLoginMenuClose = () => {
        setAnchorMenuEl(null)
    }

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
        <>
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
        </>
    );
}

    const { departments } = usePage().props

    const drawer = (
    <List
        dense
        disablePadding
        // size="sm"
        sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItemButton-radius': '10px',
        }}>
            {departments.map((dept, index)=>{
                return (
                    <ListItem key={index} sx={{display: 'flex', flexDirection: 'column', px: 0}}>
                        <Toggler
                        defaultExpanded={false}
                        renderToggle={({ open, setOpen }) => (
                            <ListItemButton onClick={() => setOpen(!open)}  sx={{width: '100%'}}>
                                <ListItemText>
                                    <Typography>{dept.name}</Typography>
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
                            {dept.categories.map((category, index)=>{
                                return (
                                    <ListItem key={index} sx={{ mt: 0.5 }}>
                                        <ListItemButton
                                             role="menuitem"
                                            LinkComponent={Link}
                                            href={PublicController.department([dept.url, category.url]).url}
                                        >
                                            <Typography  >
                                                {category.name}
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                            </List>
                        </Toggler>
                    </ListItem>
                )
            })}
        </List>

  );

    return (
        <>
        <AppBar
        position="fixed"
        sx={{
            boxShadow: 0,
            bgcolor: '#fff',
            backgroundImage: 'none',
            // backdropFilter: 'blur(24px)',
            px: 2,
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
            {/* <Container > */}
                <StyledToolbar>
                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '0.3rem'}}>
                        <Stack direction='row'>
                            <IconButton
                                size="small"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                // sx={{display: {xs: 'flex', 'md': 'none'}}}
                                onClick={()=>toggleDrawer()}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Link href={PublicController.index().url}><img src={`/haweya-suban.png`}  width='250px' /></Link>
                        </Stack>
                        {/* <Toolbar> */}

                            {/* </Toolbar> */}

                        <Form action='/search'>
                            <Box sx={{display: {xs: 'none', 'md': 'flex'}}}>
                                <TextField
                                placeholder="Search..."
                                size="small"
                                name='search'
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined/>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={{ ml: 'auto', mr: 2, maxWidth: 320, width: '100%' }}
                                />
                            </Box>
                        </Form>

                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <ThemeToggle/>
                            <Button
                            onClick={handleLoginMenuClick}
                            variant="contained"
                            sx={{ display: { xs: 'none', md: 'flex' }}}
                            >Login</Button>
                            <Button
                            onClick={handleLoginMenuClick}
                            variant="outlined"
                            sx={{ display: { xs: 'none', md: 'flex' }}}
                            >Signup</Button>
                            <IconButton
                            LinkComponent={Link}
                            href={CartController.index().url}>
                                <ShoppingCartCheckoutOutlined/>
                            </IconButton>
                            {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                                {/* <IconButton color="primary" onClick={toggleDrawer(true)}>
                                    <MenuIcon />
                                </IconButton>
                                <Drawer
                                anchor="top"
                                open={open}
                                onClose={toggleDrawer(false)}
                                >
                                    <Box sx={{p: 2, backgroundColor: 'background.default'}}>
                                        <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                        >
                                            <IconButton onClick={toggleDrawer(false)}>
                                                <CloseRoundedIcon />
                                            </IconButton>
                                        </Box>
                                        <Stack sx={{alignItems: 'start'}}>
                                            <Button component={Link}
                                            size='small' color='info'
                                            variant={menu == 'Features' ? 'contained' : 'text'}>
                                                <Typography sx={{fontWeight: "bold", fontSize: "1rem"}}>
                                                    Features
                                                </Typography>
                                            </Button>
                                            <Button component={Link}
                                            href={`pricing.get().url`}
                                            size='small' color='info'
                                            variant={menu == 'Pricing' ? 'contained' : 'text'}>
                                                <Typography sx={{fontWeight: "bold", fontSize: "1rem"}}>
                                                Pricing
                                                </Typography>
                                            </Button>
                                            <Button component={Link}
                                            size='small' color='info'
                                            variant={menu == 'Features' ? 'contained' : 'text'}>
                                                <Typography sx={{fontWeight: "bold", fontSize: "1rem"}}>
                                                    FAQs
                                                </Typography>
                                            </Button>
                                            <Button component={Link}
                                            size='small' color='info'
                                            variant={menu == 'Features' ? 'contained' : 'text'}>
                                                <Typography sx={{fontWeight: "bold", fontSize: "1rem"}}>
                                                Demos
                                                </Typography>
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Drawer>
                            </Box> */}
                        </Box>
                    </Box>
                </StyledToolbar>
            {/* </Container> */}
        </AppBar>
        <Drawer
            open={open}
            onClose={handleClose}
            variant="temporary"
            sx={{
                // display: { xs: 'block', sm: 'none' },
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}>
                <Toolbar/>
            {drawer}
        </Drawer>
        </>
    )
}
