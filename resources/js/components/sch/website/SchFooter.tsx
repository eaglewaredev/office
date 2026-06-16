'use client'
import { Link } from '@inertiajs/react';
import { Avatar, Box, Card, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import AqademicEmblemWhite from '@/components/AqademicLogoWhite'
import type SchoolProp from '@/data/SchoolProp';
import { brand } from '@/theme/ThemePrimitives'

export default function SchFooter({
    school,
}:{
    school: SchoolProp;
}) {
    return (
        <Card sx={{p: 0, mt: 6, mb: 3}}>
            <Grid container sx={{py: 2}}>
                <Grid size={{xs: 12, md: 4}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar
                        alt={`${school.name}`}
                        src="Nexxus-Girls.png"
                        variant="square"
                        sx={{height: 100, width: 100}}
                    />
                    <Typography variant="h3">
                        {school.name}
                    </Typography>
                    <Typography>
                        {school.motto ?? ''}
                    </Typography>
                    <Typography>
                        &copy; {new Date().getFullYear()} Aqademic
                    </Typography>
                </Grid>
                <Grid size={{xs: 12, md: 4}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography sx={{fontWeight: 'bold'}}>
                        Our School
                    </Typography>
                    <List dense disablePadding>
                        <ListItem>
                            <ListItemText>Mission & Vision</ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid size={{xs: 12, md: 4}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography sx={{fontWeight: 'bold'}}>
                        Our Contact
                    </Typography>
                    <List dense disablePadding>
                        <ListItem>
                            <ListItemText>Phone: </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Email</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Location</ListItemText>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'space-between', background: brand[500], p: 1}}>
                <Box sx={{display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Link href="">User Agreement</Link>
                    <Link href="">Privacy Policy</Link>
                </Box>
                <AqademicEmblemWhite/>
            </Box>
        </Card>
    )
}
