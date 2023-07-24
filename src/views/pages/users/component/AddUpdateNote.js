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
    Typography,
    Grid
} from '@mui/material';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { updateTestimonial, addTestimonial, addNoteAction, deleteNote } from '../../../../redux/testimonials/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUpdateNote({
    openNotes,
    setOpenNotes,
    notes,
    page,
    limit,
    search,
    testimonialId,
    testimonial,
    feedbackText,
    userId
}) {
    // console.log(notes);
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [_notes, _setNotes] = useState([]);
    console.log({ openNotes, addNote });
    const validationSchema = Yup.object({
        note: Yup.string().required('Feedback text is required!')
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
    const noteFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            note: testimonial?.note
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('values');
            console.log(values);
            setLoader(true);
            dispatch(
                addNoteAction({
                    note: values.note,
                    userId: userId,
                    handleClose: handleClose,
                    setLoader: setLoader,
                    setAddNote: setAddNote
                })
            );
        }
    });
    // console.log(formik);
    const handleClose = () => {
        setLoader(false);
        setOpenNotes(false);
        setAddNote(false);
        formik.resetForm();
        noteFormik.resetForm();
    };

    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={openNotes || addNote}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'} direction={'row'}>
                    <DialogTitle id="alert-dialog-slide-title1">Notes</DialogTitle>
                    <Grid>
                        <Button
                            onClick={() => {
                                setAddNote(true);
                                setOpenNotes(false);
                            }}
                            sx={{ marginRight: '20px', marginBottom: '20px' }}
                            variant="contained"
                            size="small"
                        >
                            Add note
                        </Button>
                        <Button
                            onClick={() => {
                                handleClose();
                            }}
                            sx={{ marginRight: '20px', marginBottom: '20px' }}
                            variant="contained"
                            size="small"
                            // color='red'
                        >
                            Close
                        </Button>
                    </Grid>
                </Grid>
                {openNotes && !addNote && (
                    <DialogContent>
                        {notes.map((item) => (
                            <Box mt={3} display="flex" justifyContent="center" alignItems="center">
                                <Paper elevation={3} style={{ padding: '5px', maxWidth: '600px', width: '100%' }}>
                                    <TextareaAutosize
                                        id="note"
                                        name="note"
                                        minRows={4}
                                        label="Enter feedback"
                                        aria-label="text area"
                                        rowsMin={4}
                                        placeholder="Start typing here..."
                                        value={item.note}
                                        // onChange={formik.handleChange}
                                        style={{
                                            width: '100%',
                                            resize: 'vertical',
                                            marginBottom: '10px',
                                            border: '2px solid #2196f3',
                                            borderRadius: '10px',
                                            padding: '10px'
                                        }}
                                    />
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
                                                        dispatch(deleteNote({ noteId: item.id, handleClose: handleClose }));
                                                    }}
                                                    color="secondary"
                                                >
                                                    Delete
                                                </Button>

                                                {/* <Button variant="contained" size="small" onClick={formik.handleSubmit}>
                                                    {feedbackText == '' ? 'Add' : 'Update'}
                                                </Button> */}
                                            </>
                                        )}
                                    </DialogActions>
                                </Paper>
                            </Box>
                        ))}
                    </DialogContent>
                )}

                {addNote && !openNotes && (
                    <DialogContent>
                        <form onSubmit={noteFormik.handleSubmit}>
                            <TextareaAutosize
                                id="note"
                                name="note"
                                minRows={4}
                                label="Write your note here"
                                aria-label="text area"
                                rowsMin={4}
                                placeholder="Start typing here..."
                                value={noteFormik.values.feedbackText}
                                onChange={noteFormik.handleChange}
                                // onError={()=>}
                                style={{
                                    width: '100%',
                                    resize: 'vertical',
                                    marginBottom: '10px',
                                    border: '2px solid #2196f3',
                                    borderRadius: '10px',
                                    padding: '10px'
                                }}
                            />
                        </form>
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
                                            setAddNote(false);
                                            setOpenNotes(true);
                                        }}
                                        color="secondary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button variant="contained" size="small" onClick={noteFormik.handleSubmit}>
                                        {'Add'}
                                    </Button>
                                </>
                            )}
                        </DialogActions>
                    </DialogContent>
                )}
            </Dialog>
        </>
    );
}
