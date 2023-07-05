import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Grid,
    Typography,
    Link,
    Checkbox
} from '@mui/material';
import { Oval } from 'react-loader-spinner';
import FileInput from './FileInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTheaterContent } from '../../../../redux/events/actions';
import { isValid } from 'date-fns';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function TheaterManagementDialog({ open, setOpen, theaterData, setTheaterData, eventData, page, limit, search }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const fileRef1 = useRef();
    const [loader, setLoader] = useState();
    const [isLive, setIsLive] = useState(false);

    const handleClose = () => {
        fileRef1.current.value = null;
        formik.handleReset();
        setOpen(false);
    };
    const theaterSchema = Yup.object().shape({
        url: Yup.mixed(),
        content: Yup.mixed()
    });

    function validateTwitchAndYoutubeUrl(urlToParse) {
        let isValid = false;
        if (urlToParse) {
            var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            if (urlToParse.match(regExp)) {
                isValid = true;
            }
            var twitchRegex = /^(?:https?:\/\/)?(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/g;

            if (urlToParse.match(twitchRegex)) {
                isValid = true;
            }
        }
        return isValid;
    }

    const formik = useFormik({
        initialValues: {
            url: '',
            content: null
        },
        enableReinitialize: true,
        validationSchema: theaterSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            console.log('theaterData', theaterData);
            let isValid = true;
            if (values.url !== '' && values.content == null) {
                isValid = validateTwitchAndYoutubeUrl(values.url);
                if (!isValid) {
                    toast.error('Upload youtube or twitch link only');
                }
            }

            if (values.url == '' && values.content == null) {
                toast.error('Enter either link or theater content');
            } else if (values.url !== '' && values.content !== null) {
                toast.error('link and theater content can not be entered at the same time');
            } else if (isValid) {
                setLoader(true);
                dispatch(
                    addTheaterContent({
                        url: values.content == null ? values.url : values.content,
                        isLive: isLive,
                        eventId: eventData.id,
                        page: page,
                        limit: limit,
                        search: search,
                        setTheaterData: setTheaterData,
                        handleReset: formik.handleReset,
                        setLoader: setLoader,
                        handleClose: handleClose
                    })
                );
            }
        }
    });

    return (
        <>
            <Dialog
                className="responsiveDialog"
                maxWidth="md"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle
                    id="alert-dialog-slide-title1"
                    onClick={() => {
                        console.log('theaterData', theaterData);
                    }}
                >
                    Theater Management
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent="center" style={{ padding: '20px' }}>
                        <Grid item xs={9}>
                            <TextField
                                sx={{ marginTop: '25px' }}
                                id="url"
                                name="url"
                                label="Enter URL Address"
                                value={formik.values.url}
                                onChange={formik.handleChange}
                                error={formik.touched.url && Boolean(formik.errors.url)}
                                helperText={formik.touched.url && formik.errors.url}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={3} display="flex">
                            <Typography variant="h5" sx={{ marginTop: '35px', marginLeft: '30px' }}>
                                {' '}
                                Is Live
                            </Typography>
                            <Checkbox
                                sx={{ marginTop: '15px' }}
                                checked={isLive}
                                onChange={() => {
                                    setIsLive(!isLive);
                                }}
                                name="checked"
                            />
                        </Grid>
                        <Grid item xs={12} pt={2} textAlign="center">
                            <Typography variant="h5"> OR</Typography>
                        </Grid>
                        <Grid item xs={12} pt={0}>
                            <FileInput
                                formik={formik}
                                accept="video/*"
                                fieldName="content"
                                placeHolder="Upload Theater Content"
                                fileRef1={fileRef1}
                            />
                        </Grid>
                        <Grid item xs={12} pt={2} display="flex">
                            <Typography variant="h4"> Content :</Typography>
                            {theaterData ? (
                                <>
                                    <Link ml={2} mt={0.2} href={theaterData.url} underline="hover">
                                        {theaterData.url}
                                    </Link>
                                    <Typography variant="h6" style={{ marginLeft: '20px', marginTop: '2px' }}>
                                        {' '}
                                        isLive : {theaterData.isLive ? 'Yes' : 'No'}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h6" ml={2} mt={0.2}>
                                    Nothing is uploaded yet
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                        onClick={() => {
                            handleClose();
                        }}
                        color="secondary"
                    >
                        cancel
                    </Button>

                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {
                            if (!loader) {
                                formik.handleSubmit();
                            }
                        }}
                    >
                        {loader ? (
                            <Oval
                                ariaLabel="loading-indicator"
                                height={20}
                                width={20}
                                strokeWidth={5}
                                strokeWidthSecondary={1}
                                color="blue"
                                secondaryColor="white"
                            />
                        ) : (
                            'Add Content'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
