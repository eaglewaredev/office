import LinkedIn  from "@mui/icons-material/LinkedIn";
import Twitter  from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import { Box, Card, Container, Divider, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import AqademicEmblem from "@/components/AqademicEmblem";
import { brand } from "@/theme/ThemePrimitives";

export default function BFooter() {
    return (
        <Card>
            <Container maxWidth="lg" sx={{mt: 5}}>
                <Divider/>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'},justifyContent: 'space-between' , py: 3}}>
                    <Box sx={{flexGrow: 1,}}>
                        <AqademicEmblem/>
                        <Typography>
                            Enriching Education
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'space-between'}}>
                        <Box>
                            <Typography fontWeight="bold">
                                Our Products
                            </Typography>
                        </Box>
                        <Box>
                            <Typography  fontWeight="bold">
                                About Us
                            </Typography>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemText>Contact Us</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>About Us</ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                        <Box>
                            <Typography  fontWeight="bold">
                                Agreement &  Policy
                            </Typography>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemText>User Agreement</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Privacy Policy</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Cookie Policy</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Sales Agreement</ListItemText>
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
                            <IconButton href="https://x.com/AqademicOffice">
                                <Twitter color='primary'/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton href="https://www.youtube.com/@Aqademic">
                                <YouTube color='primary'/>
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton href="https://www.linkedin.com/company/aqademic">
                                <LinkedIn color='primary'/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Card>
    )
}
