import FormGrid from "@/components/FormGrid";
import numberRegex from "@/data/NumberRegex";
import QuotationProp from "@/data/QuotationProp";
import QuoteProp from "@/data/QuoteProp";
import { deleteQuote, newQuoteItem, updateQuote } from "@/wayfinder/routes/quotation";
import { useForm } from "@inertiajs/react";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import QuoteItem from "./QuoteItem";
import FormModal from "@/components/FormModal";
import DeleteFormModal from "@/components/DeleteFormModal";

export default function Quote({
    quotation,
    quote,
}:{
    quotation: QuotationProp;
        quote: QuoteProp;
}){

    const [open, setOpen] = useState(false)
    const handleOpenModal = ()=>setOpen(true)
    const handleCloseModal = ()=>setOpen(false)

    const {data, setData,post, reset, get,errors, processing} = useForm({
        id: quote.id,
        qty: 0,
        description: '',
        unitPrice: 0,
        total: 0,

        name: quote.name,
        vat: quote.vat,
    })

    function handleSubmit(e) {
        e.preventDefault()

        post(newQuoteItem({ref: quotation.refNo}).url,{
            onFlash: ({success})=>{
                setData('qty', 0)
                setData('description', '')
                setData('unitPrice', 0)
                setData('total', 0)
                handleCloseModal()
            }
        })
    }

    function handleUpdate(e){
        e.preventDefault()

        post(updateQuote({ref: quotation.refNo}).url, {
            onFlash: ({success})=>{
                handleCloseModal();
            }
        })
    }

    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDeleteModal = ()=>setOpenDelete(true)
    const handleCloseDeleteModal = ()=>setOpenDelete(false)

    function handleDeleteSubmit(e){
        e.preventDefault()

        post(deleteQuote({ref: quotation.refNo}).url,{
            onFlash: ({success})=>{
                handleCloseDeleteModal()
            }
        })
    }

    return (
        <>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`${quote.id}-panel1-content`}
                id={`${quote.id}-panel1-header`}
                >
                <Typography component="span">{quote.name} | VAT: {quote.vat}% | Total: {quote.total}</Typography>
            </AccordionSummary>
                <AccordionDetails>
                    <Stack direction={'row'}  spacing={1} sx={{mb: 1}}>
                        <Tooltip title='Edit quotation table'>
                            <IconButton
                            onClick={handleOpenModal}
                            >
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        {
                            quote.quoteItems.length ?
                            <Box/>:
                            <Tooltip title='Delete quotation table'>
                                <IconButton
                                onClick={handleOpenDeleteModal}
                                >
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                        }

                    </Stack>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <FormGrid size={{xs: 12, md: 2}}>
                                <TextField
                                    label='Qty'
                                    value={data.qty}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        }
                                    }}
                                    onChange={(e)=>{
                                        const q = e.target.value
                                        if(!numberRegex.test(q)){
                                            return false
                                        }
                                        const qV = Number(e.target.value)
                                        setData('qty',qV)
                                        setData('total', qV * data.unitPrice)
                                    }}
                                />
                            </FormGrid>
                            <FormGrid size={{xs: 12, md: 5}}>
                                <TextField
                                    label='Description*'
                                    value={data.description}
                                    placeholder='Quote Item Description'
                                    onChange={(e)=>setData('description', e.target.value)}
                                    error={errors.description ? true : false}
                                    helperText={errors.description}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        }
                                    }}
                                />
                            </FormGrid>
                            <FormGrid size={{xs: 12, md: 2}}>
                                <TextField
                                    label='Unit Price'
                                    value={data.unitPrice}
                                    onChange={(e)=>{
                                        const q = e.target.value
                                        if(!numberRegex.test(q)){
                                            return false
                                        }
                                        const qV = Number(e.target.value)
                                        setData('unitPrice',qV)
                                        setData('total', qV*data.qty)
                                    }}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                        input: {
                                            startAdornment: <InputAdornment position="start">
                                                {quotation.currency}
                                            </InputAdornment>
                                        }
                                    }}
                                />
                            </FormGrid>
                            <FormGrid size={{xs: 12, md: 2}}>
                                <TextField
                                    label='Total'
                                    value={data.total}
                                    error={errors.total ? true : false}
                                    helperText={errors.total}
                                    onChange={(e)=>{
                                        const q = e.target.value
                                        if(!numberRegex.test(q)){
                                            return false
                                        }
                                        const qV = Number(e.target.value)
                                        setData('total',qV)
                                    }}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                        input: {
                                            startAdornment: <InputAdornment position="start">
                                                {quotation.currency}
                                            </InputAdornment>
                                        }
                                    }}
                                />
                            </FormGrid>
                            <FormGrid size={{xs: 12, md: 1}}>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    loading={processing}
                                    loadingPosition="start"
                                >Save</Button>
                            </FormGrid>
                        </Grid>
                        </form>
                        <TableContainer component={Paper} sx={{mt: 2}}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quote.quoteItems.map((quoteItem)=>(
                                    <QuoteItem quotation={quotation} quoteItem={quoteItem}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
        </Accordion>
        {/* [START edit quotation table] */}
        <FormModal
        title={'Update Quotation Table'}
        open={open}
        onClose={handleCloseModal}
        processing={processing}
        handleSubmit={handleUpdate}
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
        {/* [END edit quotation table] */}
        {/* [START delete quote item] */}
        <DeleteFormModal
        title={'Delete Quote Table'}
        open={openDelete}
        onClose={handleCloseDeleteModal}
        processing={processing}
        handleSubmit={handleDeleteSubmit}
        >
            Do you want to delete this quote table?
            <b>{quote.name}</b>
        </DeleteFormModal>
        {/* [START delete quote item] */}
        </>
    )
}
