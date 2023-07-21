import { forwardRef, useState } from 'react';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Oval } from 'react-loader-spinner';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    TextareaAutosize,
    Box,
    Paper,
    Typography
} from '@mui/material';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { updateTestimonial, addTestimonial } from '../../../../redux/testimonials/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUpdateBrandDialog({
    openFeedback,
    setOpenFeedback,
    page,
    limit,
    search,
    testimonialId,
    testimonial,
    setTestimonialId,
    feedbackText
}) {
    // console.log(openFeedback, testimonialId, testimonial);
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const validationSchema = Yup.object({
        feedbackText: Yup.string().required('Feedback text is required!'),
        // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid values'),
        clientName: Yup.string().required('Name is required!').max(50, 'Name can not exceed 50 characters'),
        clientImageUrl: Yup.string().required('Image url is required!'),
        clientDesignation: Yup.string().required('Designation is required!').max(200, 'Designation can not exceed 50 characters')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            feedbackText: testimonial?.feedbackText,
            clientName: testimonial?.clientName,
            clientDesignation: testimonial?.clientDesignation,
            clientImageUrl: testimonial?.clientImageUrl
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('values');
            console.log(values);
            setLoader(true);
             if (!testimonial) {
                 dispatch(
                 addTestimonial({
                         feedbackText: values.feedbackText,
                         clientDesignation: values.clientDesignation,
                         clientName: values.clientName,
                         clientImageUrl: values.clientImageUrl,
                         search: search,
                         page: page,
                         limit: limit,
                         handleClose: handleClose,
                         setLoader: setLoader
                     })
                 );
             }
            dispatch(
               
                updateTestimonial({
                    id: testimonialId,
                    feedbackText: values.feedbackText,
                    clientDesignation: values.clientDesignation,
                    clientName: values.clientName,
                    clientImageUrl: values.clientImageUrl,
                    search: search,
                    page: page,
                    limit: limit,
                    handleClose: handleClose,
                    setLoader: setLoader
                })
            );
        }
    });
    console.log(formik);
    const handleClose = () => {
        setLoader(false);
        setOpenFeedback(false);
        formik.resetForm();
    };

    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={openFeedback}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">{feedbackText == '' ? 'Add Feedback' : 'Update Feedback'}</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        {/* <TextField
                            rowsMin={4}
                            sx={{ marginTop: '25px' }}
                            id="feedbackText"
                            name="feedbackText"
                            label="Enter feedback"
                            type="textarea"
                            value={formik.values.feedbackText}
                            onChange={formik.handleChange}
                            error={formik.touched.feedbackText && Boolean(formik.errors.feedbackText)}
                            helperText={formik.touched.feedbackText && formik.errors.feedbackText}
                            fullWidth
                            autoComplete="given-name"
                            focused={testimonial ?? false}
                            style={{ width: '100%', resize: 'vertical' }}
                        /> */}
                        {/* <Box mt={3} display="flex" justifyContent="center" alignItems="center"> */}
                        {/* <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', width: '100%' }}> */}
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="clientName"
                            name="clientName"
                            label="Enter name"
                            value={formik.values.clientName}
                            onChange={formik.handleChange}
                            error={formik.touched.clientName && Boolean(formik.errors.clientName)}
                            helperText={formik.touched.clientName && formik.errors.clientName}
                            fullWidth
                            autoComplete="given-name"
                            focused={testimonial ?? false}
                            style={{ width: '100%', resize: 'vertical' }}
                        />
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="clientDesignation"
                            name="clientDesignation"
                            label="Enter designation"
                            value={formik.values.clientDesignation}
                            onChange={formik.handleChange}
                            error={formik.touched.clientDesignation && Boolean(formik.errors.clientDesignation)}
                            helperText={formik.touched.clientDesignation && formik.errors.clientDesignation}
                            fullWidth
                            autoComplete="given-name"
                            focused={testimonial ?? false}
                            style={{ width: '100%', resize: 'vertical' }}
                        />
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="clientImageUrl"
                            name="clientImageUrl"
                            label="Enter image URL"
                            value={formik.values.clientImageUrl}
                            onChange={formik.handleChange}
                            error={formik.touched.clientImageUrl && Boolean(formik.errors.clientImageUrl)}
                            helperText={formik.touched.clientImageUrl && formik.errors.clientImageUrl}
                            fullWidth
                            autoComplete="given-name"
                            focused={testimonial ?? false}
                            style={{ width: '100%', resize: 'vertical' }}
                        />
                        <Typography sx={{ margin: '10px 0px' }} variant="h5" gutterBottom>
                            Enter Feedback Text
                        </Typography>
                        <TextareaAutosize
                            id="feedbackText"
                            name="feedbackText"
                            label="Enter feedback"
                            aria-label="text area"
                            // rowsMin={4}
                            placeholder="Start typing here..."
                            value={formik.values.feedbackText}
                            onChange={formik.handleChange}
                            style={{
                                width: '100%',
                                resize: 'vertical',
                                marginBottom: '10px',
                                border: '2px solid #2196f3',
                                borderRadius: '10px',
                                padding: '10px'
                            }}
                        />

                        {/* </Paper>
                        </Box> */}
                    </form>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    {loader ? (
                        <Button variant="contained" size="small">
                            <Oval
                                ariaLabel="loading-indicator"
                                height={20}
                                width={20}
                                strokeWidth={5}
                                strokeWidthSecondary={1}
                                color="blue"
                                secondaryColor="white"
                            />
                        </Button>
                    ) : (
                        <>
                            <Button
                                sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                                onClick={() => {
                                    handleClose();
                                }}
                                color="secondary"
                            >
                                cancel
                            </Button>

                            <Button variant="contained" size="small" onClick={formik.handleSubmit}>
                                {feedbackText == '' ? 'Add' : 'Update'}
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
