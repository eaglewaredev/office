import { Avatar, Box, Typography } from "@mui/material";
import type SchoolProp from "@/data/SchoolProp";

export default function SchHeader({
    school,
}:{
    school: SchoolProp;
}) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, gap: 3}}>
            <Avatar
                alt={`${school.name} Logo` }
                src="Nexxus-Girls.png"
                variant="square"
                sx={{height: {xs: 80, md: 100}, width: {xs: 80, md: 100}}}
            />
            <Box>
                <Typography
                sx={{
                    fontSize: {xs: '1.5rem', md: '3rem'},
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                variant="h1">{school.name}</Typography>
                <Typography
                sx={{fontSize: {xs: '1rem', md: '2rem'}}}
                variant="h5">{school.motto ?? ''}</Typography>
            </Box>
        </Box>
    )
}
