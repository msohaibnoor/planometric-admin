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
import { addInstruction } from '../../../../redux/clientdata/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUpdateBrandDialog({
    openFeedback,
    setOpenFeedback,
    instructionId,
    instruction,
    setInstruction,
    setInstructionId,
    feedbackText
}) {
    console.log( {instruction});
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const validationSchema = Yup.object({
        feedbackText: Yup.string().required('Instruction text is required!'),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            feedbackText: instruction?.instruction,
        },
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            setLoader(true);
                dispatch(
                    addInstruction({
                        id: instructionId,
                        instruction: values.feedbackText,
                        handleClose: handleClose,
                        setLoader: setLoader
                    })
                );
            
            
        }
    });
    const handleClose = () => {
        setLoader(false);
        setOpenFeedback(false);
        // setInstruction(null);
        // setInstructionId(null);
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
                <DialogTitle id="alert-dialog-slide-title1">{feedbackText == '' ? 'Add Instruction' : 'Update Instruction'}</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        
                        <Typography sx={{ margin: '10px 0px' }} variant="h5" gutterBottom>
                            Enter Instruction Text
                        </Typography>
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="feedbackText"
                            name="feedbackText"
                            label="Write instruction"
                            value={formik.values.feedbackText}
                            onChange={formik.handleChange}
                            error={formik.touched.feedbackText && Boolean(formik.errors.feedbackText)}
                            helperText={formik.touched.feedbackText && formik.errors.feedbackText}
                            fullWidth
                            autoComplete="given-name"
                            focused={instruction ?? false}
                            style={{ width: '100%', resize: 'vertical' }}
                        />
                        {/* <TextareaAutosize
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
                        /> */}

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
