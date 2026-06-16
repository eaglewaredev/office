import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, Box, Button, Divider, Drawer, IconButton, Menu, MenuItem, Stack, styled } from '@mui/material';
import { AppBar, Container } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from "react";
import ThemeToggle from '@/components/ThemeToggle';
import { brand } from '@/theme/ThemePrimitives';
import { Link } from '@inertiajs/react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: theme.shape.borderRadius,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: brand[25],
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
  ...theme.applyStyles('dark', {
    borderColor: brand[500],
  })
}));

export default function SchAppBar({menu}: {menu: string}) {
    const [open, setOpen] = React.useState(false);
    const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)
    const loginMenuOpen = Boolean(anchorMenuEl)
    const handleLoginMenuClick = (event: React.MouseEvent<HTMLElement>)=>{
        setAnchorMenuEl(event.currentTarget)
    }
    const handleLoginMenuClose = () => {
        setAnchorMenuEl(null)
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
        position="sticky"
        enableColorOnDark
        sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            width: '100%',
            mt: 'calc(var(--template-frame-height, 0px) + 1rem)',
            top: '1rem',
            px: 0,
        }}>
            <StyledToolbar variant="dense" disableGutters>
                <Box sx={{  display: { xs: 'none', md: 'flex' }, alignItems: 'center', px: 0 }}>
                    <Button  component={Link} href="/" variant={menu == 'Home' ? 'contained' : "text"} color="info" size="small">
                        Home
                    </Button>
                    <Button variant={menu == 'News' ? 'contained' : "text"} color="info" size="small">
                        News & Events
                    </Button>
                    <Button variant={menu == 'Student Admission' ? 'contained' : "text"} color="info" size="small">
                        Student Admission
                    </Button>
                    <Button variant={menu == 'Fee Structure' ? 'contained' : "text"} color="info" size="small">
                        Fee Structure
                    </Button>
                    <Button component={Link} href="/contact-us" variant={menu == 'Contact Us' ? 'contained' : "text"} color="info" size="small" sx={{ minWidth: 0 }}>
                        Contact Us
                    </Button>
                </Box>
                <Box
                    sx={{
                    display: { xs: 'none', md: 'flex' },
                    gap: 1,
                    alignItems: 'center',
                    }}
                >
                    <Button  component="a" href="/student-login" color="primary" variant="text" size="small">
                        Student Login
                    </Button>
                    <Button component="a" href="/staff-login" color="primary" variant="contained" size="small">
                        Staff Login
                    </Button>
                    <ThemeToggle />
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, width: '100%', justifyContent: 'space-between' }}>
                    <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Stack direction="row">
                        <Button
                            onClick={handleLoginMenuClick}
                            color="primary" variant="contained"
                            endIcon={<KeyboardArrowDownIcon/>}
                            fullWidth>
                            Login
                        </Button>
                        <Menu
                        anchorEl={anchorMenuEl}
                        open={loginMenuOpen}
                        onClose={handleLoginMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                            <MenuItem onClick={handleLoginMenuClose}>Staff Login</MenuItem>
                            <MenuItem onClick={handleLoginMenuClose}>Student Login</MenuItem>
                        </Menu>
                        <ThemeToggle />
                    </Stack>

                    <Drawer
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                    >
                        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}>
                                <IconButton onClick={toggleDrawer(false)}>
                                    <CloseRoundedIcon />
                                </IconButton>
                            </Box>
                            <Stack sx={{alignItems: 'start'}}>
                                <Button component={Link}
                                variant={menu == 'Home' ? 'contained' : "text"}
                                href="/">Home</Button>
                                <Button variant={menu == 'News' ? 'contained' : "text"} color="info" size="small">
                                    News & Events
                                </Button>
                                <Button variant={menu == 'Student Admission' ? 'contained' : "text"} color="info" size="small">
                                    Student Admission
                                </Button>
                                <Button variant={menu == 'Fee Structure' ? 'contained' : "text"} color="info" size="small">
                                    Fee Structure
                                </Button>
                                <Button component={Link} href="/contact-us" variant={menu == 'Contact Us' ? 'contained' : "text"} color="info" size="small" sx={{ minWidth: 0 }}>
                                    Contact Us
                                </Button>
                            </Stack>
                        </Box>
                    </Drawer>
                </Box>
            </StyledToolbar>
        </AppBar>
    )
}
