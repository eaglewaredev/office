import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, AppBar, Box, Button, Container, Drawer, IconButton, styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { brand } from '@/theme/ThemePrimitives';
import AqademicEmblem from '../AqademicEmblem';
import ThemeToggle from '../ThemeToggle';
import AqademicBlogLogo from '../AqademicBlogLogo';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
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

export default function BAppBar(){
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    return (
        <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2, //'calc(var(--template-frame-height, 0px) + 28px)',
        }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant='dense' disableGutters>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', px: 0}}>
                        <AqademicBlogLogo/>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Button variant="text" color="info" size="small">
                                Features
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Testimonials
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Highlights
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Pricing
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                FAQ
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                Blog
                            </Button>
                        </Box>
                    </Box>
                    <Box
                    sx={{
                    display: { xs: 'none', md: 'flex' },
                    gap: 1,
                    alignItems: 'center',
                    }}>
                        {/* <Button color="primary" variant="text" size="small">
                            Sign in
                        </Button>
                        <Button color="primary" variant="contained" size="small">
                            Sign up
                        </Button> */}
                        <ThemeToggle />
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ThemeToggle />
                        <IconButton aria-label="Menu button" onClick={()=>toggleDrawer(true)}>
                        <MenuIcon />
                        </IconButton>
                        <Drawer
                        anchor="top"
                        open={open}
                        onClose={()=>toggleDrawer(false)}
                        >
                        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                            >
                            <IconButton onClick={()=>toggleDrawer(false)} >
                                <CloseRoundedIcon />
                            </IconButton>
                            </Box>
                            <Button>Features</Button>
                            <Button>Testimonials</Button>
                            <Button>Highlights</Button>
                            <Button>Pricing</Button>
                            <Button>FAQ</Button>
                            <Button>Blog</Button>
                        </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    )
}
