import ModalStyle from "@/data/style/ModalStyle";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import React from "react";

interface ModalProps{
    open: boolean;
    title: string;
    onClose: ()=>void;
    onSave: ()=>void;
    children: React.ReactNode;
}

export default function AModal({
    title,
    open,
    onClose,
    onSave,
    children
}: ModalProps){
    return (
        <Modal
            open={open}
            onClose={onClose}
            >
            <Box sx={ModalStyle}>
                <Stack direction='row'
                sx={{justifyContent: 'space-between'}}>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} size='small'>
                        <Close />
                    </IconButton>
                </Stack>
                {children}
                <Stack
                sx={{
                    justifyContent: 'flex-end',
                    gap: 2,
                }}
                direction='row'>
                    <Button onClick={onSave} variant='contained' >Save</Button>
                    <Button onClick={onClose}>Close</Button>
                </Stack>
            </Box>
        </Modal>
    )
}
