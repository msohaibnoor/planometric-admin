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

import { addRestrictedUser } from '../../../../redux/users/actions';

export default function AddRestrictedUserDialog({ open, setOpen,page,limit,search, type}) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        walletAddress: Yup.string().required('Wallet Address is required!').min(42,"Invalid Wallet Address").max(42,"Invalid Wallet Address")
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            walletAddress: ''
        },
        validationSchema,
        onSubmit: (values) => {
         
            dispatch(
                addRestrictedUser({
                    walletAddress: values.walletAddress,
                    search: search,
                    page: page,
                    limit: limit,
                    type:type,
                    handleClose: handleClose,
                    
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
                <DialogTitle id="alert-dialog-slide-title1">Add Restricted User</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="walletAddress"
                            name="walletAddress"
                            label="Enter Wallet Address"
                            value={formik.values.walletAddress}
                            onChange={formik.handleChange}
                            error={formik.touched.walletAddress && Boolean(formik.errors.walletAddress)}
                            helperText={formik.touched.walletAddress && formik.errors.walletAddress}
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
                        Add To Black List
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
