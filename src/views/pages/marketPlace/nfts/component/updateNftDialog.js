import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { updateNft } from '../../../../../redux/nft/actions';

export default function UpdateNftDialog({ open, setOpen, nftId, brandId, categoryId,subCategoryId, nftData,type }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!').min(2, 'Invalid Name').max(42, 'Invalid Name'),
        description: Yup.string().required('Name is required!').min(1, 'Invalid description').max(500, 'Invalid description'),
        price: Yup.number().min(0.01, 'Price cannot be 0').required('Price is required')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: nftData,
        validationSchema,
        onSubmit: (values) => {
            dispatch(
                updateNft({
                    id: nftId,
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    brandId: brandId,
                    categoryId: categoryId,
                    subCategoryId:subCategoryId,
                    type:type,
                    handleClose: handleClose
                })
            );
        }
    });
    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1"> Update NFT</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid item xs={12} pt={4}>
                            <TextField
                                id="name"
                                name="name"
                                label="Enter NFT Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} pt={4}>
                            <TextField
                                id="description"
                                name="description"
                                label="Enter Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} pt={4}>
                            <TextField
                                id="price"
                                name="price"
                                label="Enter NFT price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                        onClick={() => {
                            handleClose();
                        }}
                        color="secondary"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        Update Nft
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
