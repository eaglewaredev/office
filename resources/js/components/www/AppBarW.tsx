'use client';
import styled from "@emotion/styled";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, InputAdornment, Menu, MenuItem, MenuProps, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import AqademicEmblem from "@/components/AqademicEmblem";
import ThemeToggle from "@/components/ThemeToggle";
import { SearchOutlined, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import www from "@/routes/www";
import { Link } from "@inertiajs/react";
// import { pricing } from "@/routes/www";

const StyledToolbar = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    px: 3
}));

const drawerWidth = 240;

export default function AppBarW({
    menu,
    toggleDrawer,
}: {
    menu: string;
    toggleDrawer: ()=>void;
}) {
    // const [open, setOpen] = useState(false)
    // const toggleDrawer = (newOpen: boolean) => ()=> {
    //     setOpen(newOpen)
    // }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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

    return (
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
                                sx={{display: {xs: 'flex', 'md': 'none'}}}
                                onClick={()=>toggleDrawer()}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Link href="/"><img src={`/haweya-suban.png`}  width='250px' /></Link>
                        </Stack>
                        {/* <Toolbar> */}

                            {/* </Toolbar> */}

                        <Box sx={{display: {xs: 'none', 'md': 'flex'}}}>
                            <TextField
                            placeholder="Search..."
                            size="small"
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
                            href={www.cart.get().url}
                            >
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
    )
}
