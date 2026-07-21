import DeleteFormModal from "@/components/DeleteFormModal";
import FormGrid from "@/components/FormGrid";
import FormModal from "@/components/FormModal";
import numberRegex from "@/data/NumberRegex";
import QuoteItemProp from "@/data/QouteItemProp";
import QuotationProp from "@/data/QuotationProp";
import { deleteQuoteItem, updateQuoteItem } from "@/wayfinder/routes/quotation";
import { useForm } from "@inertiajs/react";
import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TableCell, TableRow, TextField, Tooltip } from "@mui/material";
import { useState } from "react";

export default function QuoteItem({
    quotation,
    quoteItem,
}:{
    quotation: QuotationProp;
    quoteItem: QuoteItemProp;
}){
    const [open, setOpen] = useState(false)
    const handleOpenModal = ()=>setOpen(true)
    const handleCloseModal = ()=>setOpen(false)



    const {post, data, setData, errors, processing} = useForm({
        id: quoteItem.id,
        quantity: quoteItem.quantity,
        description: quoteItem.description,
        unitPrice: quoteItem.unitPrice,
        total: quoteItem.total
    })

    function handleSubmit(e){
        e.preventDefault()

        post(updateQuoteItem({ref: quotation.refNo}).url,{
            onFlash: ({success})=>{
                handleCloseModal()
            }
        })
    }

    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDeleteModal = ()=>setOpenDelete(true)
    const handleCloseDeleteModal = ()=>setOpenDelete(false)

    function handleDeleteSubmit(e){
        e.preventDefault()

        post(deleteQuoteItem({ref: quotation.refNo}).url,{
            onFlash: ({success})=>{
                handleCloseDeleteModal()
            }
        })
    }

    return (
        <TableRow>
        <TableCell>{quoteItem.quantity}</TableCell>
        <TableCell>{quoteItem.description}</TableCell>
        <TableCell>{quoteItem.unitPrice}</TableCell>
        <TableCell>{quoteItem.total}</TableCell>
        <TableCell sx={{display: 'flex', gap: 1}}>
            <Tooltip title='Edit Quote Item'>
                <IconButton
                size='small'
                onClick={handleOpenModal}
                >
                    <Edit/>
                </IconButton>
            </Tooltip>
            <Tooltip title='Delete Quote Item'>
                <IconButton
                size='small'
                onClick={handleOpenDeleteModal}
                >
                    <Delete/>
                </IconButton>
            </Tooltip>
        </TableCell>
        {/* [START new quotation table] */}
        <FormModal
        title={'Update Quote Item'}
        open={open}
        onClose={handleCloseModal}
        processing={processing}
        handleSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <FormGrid size={12}>
                    <TextField
                    label='Qty'
                    value={data.quantity}
                    onChange={(e)=>{
                        const q = e.target.value
                        if(!numberRegex.test(q)){
                            return false
                        }
                        const qV = Number(e.target.value)
                        setData('quantity',qV)
                        setData('total', qV * data.unitPrice)
                    }}
                    error={errors.quantity ? true : false}
                    helperText={errors.quantity}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                    />
                </FormGrid>
                <FormGrid size={12}>
                    <TextField
                        label='Description*'
                        value={data.description}
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
                <FormGrid size={12}>
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
                            setData('total', qV*data.quantity)
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
                <FormGrid size={12}>
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
            </Grid>
        </FormModal>
        {/* [END new quotation table] */}
        {/* [START delete quote item] */}
        <DeleteFormModal
        title={'Update Quote Item'}
        open={openDelete}
        onClose={handleCloseDeleteModal}
        processing={processing}
        handleSubmit={handleDeleteSubmit}
        >
            Do you want to delete this quote item?
            <b>{quoteItem.description}</b>
        </DeleteFormModal>
        {/* [START delete quote item] */}
        </TableRow>
    )
}
