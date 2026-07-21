import QuotationProp from "@/data/QuotationProp";
import { Add, Tag } from "@mui/icons-material";
import { Divider, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from "@mui/material";
import Quote from "./Quote";
import { useState } from "react";
import FormModal from "@/components/FormModal";
import { useForm } from "@inertiajs/react";
import FormGrid from "@/components/FormGrid";
import numberRegex from "@/data/NumberRegex";
import { newQuote } from "@/wayfinder/routes/quotation";

export default function Quotes({
    quotation,
}:{
    quotation: QuotationProp
}){
    const [open, setOpen] = useState(false)
    const handleOpenModal = ()=>setOpen(true)
    const handleCloseModal = ()=>setOpen(false)

    const { data, setData, errors, post, processing } = useForm({
        name: '',
        vat: 0
    })

    function handleSubmit(e){
        e.preventDefault()

        post(newQuote({ref: quotation.refNo}).url,{
            onFlash: ({success})=>{
                handleCloseModal()
            }
        })
    }

    return (
        <>
        <Grid size={12}>
            <Stack
                spacing={1}
            sx={{
                justifyContent: 'flex-end'
            }}
            >
                <Tooltip title='New Quotation Table'>
                    <IconButton
                    onClick={handleOpenModal}
                    >
                        <Add/>
                    </IconButton>
                </Tooltip>
                <Divider />
            </Stack>

            {
                quotation.quotes.length ?
                    quotation.quotes.map((quote, index)=>(
                        <Quote key={index} quote={quote} quotation={quotation}/>
                    ))
                :
                    <Stack
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 5
                    }}
                    >
                        <Tag sx={{fontSize: 40}}/>
                        <Typography>No Quotations Tables found</Typography>
                    </Stack>
            }


        </Grid>
        {/* [START new quotation table] */}
        <FormModal
        title={'New Quotation Table'}
        open={open}
        onClose={handleCloseModal}
        processing={processing}
        handleSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <FormGrid size={12}>
                    <TextField
                    label='Table Name*'
                    value={data.name}
                    onChange={(e)=>setData('name', e.target.value)}
                    error={errors.name ? true : false}
                    helperText={errors.name}
                    placeholder="eg. Quotation for Electrical Installation"
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                    />
                </FormGrid>
                <FormGrid size={12}>
                    <TextField
                    label='VAT'
                    value={data.vat}
                    error={errors.vat ? true : false}
                    helperText={errors.vat}
                    onChange={(e)=>{
                        const q = e.target.value

                        if(!numberRegex.test(q)){
                            return false
                        }

                        setData('vat', Number(q))
                    }}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                        input: {
                            endAdornment: <InputAdornment position="end">
                                %
                            </InputAdornment>
                        }
                    }}
                    />
                </FormGrid>
            </Grid>
        </FormModal>
        {/* [END new quotation table] */}
        </>
    )
}
