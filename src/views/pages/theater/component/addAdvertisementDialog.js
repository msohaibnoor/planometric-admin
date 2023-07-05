import { forwardRef, useState, useEffect } from 'react';
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
export default function AddAdvertisementDialog({ open, setOpen, advertisement, page, limit }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const validationSchema = Yup.object({
        ad: Yup.mixed().required('Image is required')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ad: null
        },
        validationSchema,
        onSubmit: (values) => {
            let checkFile;
            if (values.eventImage) {
            }
            if (values.ad !== null) {
                if (
                    values.ad.name.split('.').pop() == 'jpg' ||
                    values.ad.name.split('.').pop() == 'png' ||
                    values.ad.name.split('.').pop() == 'jpeg' ||
                    values.ad.name.split('.').pop() == 'mp4' ||
                    values.ad.name.split('.').pop() == 'gif'
                ) {
                    checkFile = true;
                } else {
                    checkFile = false;
                }

                if (checkFile) {
                    setLoader(true);
                    dispatch(
                        updateSlot({
                            lobbyId: advertisement.LobbieId,
                            slotNumber: advertisement.slotNumber,
                            adv: values.ad,
                            page: page,
                            limit: limit,
                            setLoader: setLoader,
                            handleClose: handleClose
                        })
                    );
                } else {
                    setLoader(false);
                    toast.error('Upload the files with these extensions: PNG, JPG,JPEG, MP4,GIF');
                }
            }
        }
    });
    const handleClose = () => {
        setOpen(false);
        setLoader(false);
        formik.resetForm();
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
                <DialogTitle id="alert-dialog-slide-title1">Add Advertisement</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} pt={2}>
                                <FileInput formik={formik} accept="image/*" fieldName="ad" placeHolder="Add content" />
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
                            'Add'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
