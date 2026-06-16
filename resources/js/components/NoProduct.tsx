import { Receipt } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export default function NoProducts() {
    return (
        <Stack
        direction='column'
         sx={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',

            }}>
                <Receipt
                sx={{
                    fontSize: 40,
                    mb: 3
                }}
                />
            <Typography variant="subtitle2">
                Products not uploaded yet
            </Typography>
        </Stack>
    )
}
