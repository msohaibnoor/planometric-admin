import { forwardRef, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Grid } from '@mui/material';
import { updateSlot } from '../../../../redux/advertisement/actions';
import { Oval } from 'react-loader-spinner';
import FileInput from '../../events/component/FileInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function AddAdvertisementDialog({ open, setOpen, advertisement, page, limit, dimensionValue }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const fileRef1 = useRef();
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    const validationSchema = Yup.object({
        ad: Yup.mixed().required('Image is required')
    });
    const getHeightAndWidthFromDataUrl = (dataURL) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    height: img.height,
                    width: img.width
                });
            };
            img.src = dataURL;
        });
    const checkImageDimension = async (fileAsDataURL, file) => {
        const dimensions = await getHeightAndWidthFromDataUrl(fileAsDataURL);
        console.log('dimensions of image file uploaded', dimensions);
        console.log('required dimension', dimensionValue);
        if (dimensionValue.width == dimensions.width && dimensionValue.height == dimensions.height) {
            dispatch(
                updateSlot({
                    lobbyId: advertisement.LobbieId,
                    slotNumber: advertisement.slotNumber,
                    adv: file,
                    page: page,
                    limit: limit,
                    setLoader: setLoader,
                    handleClose: handleClose
                })
            );
        } else {
            toast.error('Upload the files with proper dimensions');
            setLoader(false);
        }
    };
    const checkVideoDimension = async (fileAsDataURL, file) => {
        var video = document.createElement('video');
        video.src = fileAsDataURL;
        video.onloadedmetadata = () => {
            console.log('required dimension', dimensionValue);
            console.log('dimensions of video file uploaded', video.videoWidth, '*', video.videoHeight);

            if (dimensionValue.width == video.videoWidth && dimensionValue.height == video.videoHeight) {
                dispatch(
                    updateSlot({
                        lobbyId: advertisement.LobbieId,
                        slotNumber: advertisement.slotNumber,
                        adv: file,
                        page: page,
                        limit: limit,
                        setLoader: setLoader,
                        handleClose: handleClose
                    })
                );
            } else {
                toast.error('Upload the files with proper dimensions');
                setLoader(false);
            }
        };
    };

    const checkFileType = (fileType) => {
        if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'mp4' || fileType == 'gif') {
            return true;
        } else {
            return false;
        }
    };

    const handleAdvertisementSubmit = async (fileType, fileAsDataURL, file) => {
        console.log('fileType', fileType);
        console.log('fileAsDataURL', fileAsDataURL);
        let checkFile = await checkFileType(fileType);
        if (checkFile) {
            setLoader(true);
            if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif') {
                console.log('check image dimensions');
                await checkImageDimension(fileAsDataURL, file);
            } else if (fileType == 'mp4') {
                console.log('check video dimensions');
                await checkVideoDimension(fileAsDataURL, file);
            }
        } else {
            setLoader(false);
            toast.error('Upload the files with these extensions: PNG, JPG,JPEG, MP4,GIF');
        }
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ad: null
        },
        validationSchema,
        onSubmit: (values) => {
            let fileType = values.ad.name.split('.').pop();
            const file = values.ad;
            const fileAsDataURL = window.URL.createObjectURL(file);
            handleAdvertisementSubmit(fileType, fileAsDataURL, file);
        }
    });
    const handleClose = () => {
        setOpen(false);
        setLoader(false);
        formik.resetForm();
        fileRef1.current.value = null;
        setImageUrl(null);
        setVideoUrl(null);
    };

    return (
        <>
            <Dialog
                className="brandDialog"
                maxWidth="sm"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">
                    {'Add Advertisement' + ' ' + '(Dimensions ' + dimensionValue.width + '*' + dimensionValue.height + ')'}
                </DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} pt={2}>
                                <FileInput
                                    formik={formik}
                                    accept="image/*"
                                    fieldName="ad"
                                    placeHolder="Add content"
                                    fileRef1={fileRef1}
                                    imageUrl={imageUrl}
                                    setImageUrl={setImageUrl}
                                    videoUrl={videoUrl}
                                    setVideoUrl={setVideoUrl}
                                />
                            </Grid>
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
                        <FormattedMessage id="cancel" />
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            if (!loader) {
                                if (formik.values.ad !== null) {
                                    formik.handleSubmit();
                                } else {
                                    setLoader(false);
                                    toast.error('Upload the files with these extensions: PNG, JPG,JPEG, MP4,GIF');
                                }
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
                            'Add'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
