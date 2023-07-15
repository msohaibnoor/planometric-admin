import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem } from '@mui/material';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

import { addMunicipality } from '../../../../redux/municipalities/actions';

export default function AddRestrictedUserDialog({ open, setOpen, page, limit, search, type }) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        state: Yup.string().required('State Address is required!'),
        // .min(42, 'Invalid Wallet Address')
        // .max(42, 'Invalid Wallet Address'),
        name: Yup.string().required('Name is required!')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            state: '',
            name: ''
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(
                addMunicipality({
                    state: values.state,
                    name: values.name,
                    search: search,
                    page: page,
                    limit: limit,
                    type: type,
                    handleClose: handleClose
                })
            );
        }
    });
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
                        />
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
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
