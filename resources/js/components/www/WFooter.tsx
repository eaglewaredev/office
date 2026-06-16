import LinkedIn  from "@mui/icons-material/LinkedIn";
import Telegram from "@mui/icons-material/Telegram";
import Twitter  from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import { Box, Card, Container, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
// import { aboutUs, contactUs } from "@/actions/App/Http/Controllers/www/HomeController";
import AqademicEmblem from "@/components/AqademicEmblem";
import { brand } from "@/theme/ThemePrimitives";
import AqademicEmblemWhite from "../AqademicEmblemWhite";
import { Link } from "@inertiajs/react";

export default function WFooter() {
    return (
        <Box sx={{
            background: brand[500],
            zIndex: (theme) => theme.zIndex.drawer + 2,}}>
            <Container maxWidth="lg" sx={{pt: 5}}>
                 <Divider/>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'},justifyContent: 'space-between' , py: 3}}>
                    <Box sx={{flexGrow: 1,}}>
                        <img src={``}/>
                        <Typography>
                            Enriching Education
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'space-between'}}>
                        <Box>
                            <Typography sx={{fontWeight: "bold"}}>
                                Our Product
                            </Typography>
                        </Box>
                        <Box>
                            <Typography  sx={{fontWeight: "bold"}}>
                                About Us
                            </Typography>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemButton href={'contactUs.get().url'}>Contact Us</ListItemButton>
                                </ListItem>
                                <ListItem >
                                    <ListItemButton href={'aboutUs.get().url '} >About Us</ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                        <Box>
                             <Typography  sx={{fontWeight: "bold"}}>
                                Connect with Us
                            </Typography>
                            <List dense={true}>
                                <ListItem sx={{display: 'flex', gap: 1}}>
                                    <IconButton size='small' href="https://x.com/AqademicOffice">
                                        <Twitter />
                                    </IconButton>
                                    <IconButton size='small' href="https://www.youtube.com/@Aqademic">
                                        <YouTube />
                                    </IconButton>
                                </ListItem>
                                <ListItem sx={{display: 'flex', gap: 1}}>
                                    <IconButton size='small' href="https://www.linkedin.com/company/aqademic">
                                        <LinkedIn />
                                    </IconButton>
                                    <IconButton size='small' href="https://www.linkedin.com/company/aqademic">
                                        <Telegram />
                                    </IconButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2}}>
                    Copyright &copy; Aqademic
                    <Grid container spacing={2}>
                        <Grid>

                        </Grid>
                        <Grid>

                        </Grid>
                        <Grid>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}
