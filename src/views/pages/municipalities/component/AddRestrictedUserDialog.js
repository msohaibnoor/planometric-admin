import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem, Checkbox, Typography, Stack } from '@mui/material';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

import { addMunicipality, updateMunicipality } from '../../../../redux/municipalities/actions';

export default function AddRestrictedUserDialog({ open, setOpen, page, limit, search, type, municipality }) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        state: Yup.string().required('State Address is required!'),
        // .min(42, 'Invalid Wallet Address')
        // .max(42, 'Invalid Wallet Address'),
        name: Yup.string().required('Name is required!'),
        availability: Yup.boolean().optional(),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            state: municipality?.state || "",
            name: municipality?.name || "",
            availability: municipality?.availability || false,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log({ values })
            municipality ? dispatch(updateMunicipality({
                id: municipality.id,
                state: values.state,
                name: values.name,
                availability: values.availability,
                handleClose: handleClose
            })) :
                dispatch(
                    addMunicipality({
                        state: values.state,
                        name: values.name,
                        availability: values.availability,
                        handleClose: handleClose
                    })
                );
        }
    });
    console.log(formik.values)
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

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
                <DialogTitle id="alert-dialog-slide-title1">Add Municipality</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="state"
                            name="state"
                            label="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                            fullWidth
                            autoComplete="given-name"
                            focused={municipality}
                        />
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="name"
                            name="name"
                            label="Municipality"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                            autoComplete="given-name"
                            focused={municipality}

                        />
                        <Stack sx={{ marginTop: '25px' }} direction="row" alignItems="center" spacing={1}>

                            <Typography
                                gutterBottom
                                variant='p'
                            >
                                Availability
                            </Typography>
                            <Checkbox
                                sx={{ marginTop: '15px' }}
                                checked={formik.values.availability}
                                onChange={formik.handleChange}
                                name="availability"
                            />
                        </Stack>
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
                        <FormattedMessage id="cancel" />
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        {municipality ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
