
import ModalStyle from "@/data/ModalStyle";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import React from "react";

interface ModalProps{
    open: boolean;
    title: string;
    onClose: ()=>void;
    handleSubmit: (e)=>void;
    processing: boolean;
    children: React.ReactNode;
}

export default function FormModal({
    title,
    open,
    onClose,
    handleSubmit,
    processing,
    children
}: ModalProps){
    return (
        <Modal
        open={open}
        onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={1} sx={ModalStyle} >
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
                        <Button
                        type='submit'
                        loading={processing}
                        loadingPosition="start"
                        variant='contained' >Save</Button>
                        <Button onClick={onClose}>Close</Button>
                    </Stack>
                </Stack>
            </form>
        </Modal>
    )
}
