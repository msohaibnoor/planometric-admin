import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Grid, MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { addEvent, updateEvent } from '../../../../redux/events/actions';
import { getAllBrandList } from '../../../../redux/marketPlace/actions';
import FileInput from './FileInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';
import moment from 'moment';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const typeArray = [
    {
        value: 'KTX',
        label: 'KTX'
    },
    {
        value: 'MATIC',
        label: 'MATIC'
    },

    {
        value: 'USDT',
        label: 'USDT'
    }
];

export default function AddEditEventDialog({
    open,
    setOpen,
    page,
    limit,
    search,
    eventDetail,
    setEventDetail,
    eventId,
    setIsUpdate,
    isUpdate,
    type,
    setType,
    loader,
    setLoader
}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const fileRef1 = useRef();
    const [imageUrl, setImageUrl] = useState(null);
    const brandArray = useSelector((state) => state.marketPlace.brandArray);
    const [isOptional, setIsOptional] = useState(false);

    const handleClose = () => {
        fileRef1.current.value = null;
        setOpen(false);
        setIsUpdate(false);
        setEventDetail({
            name: '',
            price: 0,
            description: '',
            collectionAddress: '',
            eventImage: null,
            startTime: new Date(new Date().getTime() + 10 * 60000),
            endTime: new Date(new Date().getTime() + 725 * 60000),
            brand: 0
        });
        formik.resetForm();
        setType('KTX');
        setLoader(false);
        setImageUrl(null);
    };
    const handleBrandChange = (event) => {
        formik.setFieldValue('brand', event.target.value);
    };
    const handleType = (event) => {
        setType(event.target.value);
    };

    const errorHandler = (values) => {
        console.log('values', values);
        if (values.brand == 0) {
            toast.error('Brand is required');
            return false;
        }
        if ((values.price <= 0 || values.price == '') && values.collectionAddress == '') {
            toast.error('Enter either Price or Collection address');
            return false;
        }
        if (values.price > 0 && values.collectionAddress !== '') {
            toast.error('Enter either Price or Collection address');
            return false;
        }
        if (!isUpdate) {
            if (values.endTime < values.startTime) {
                toast.error("Start time can't be less than end time");
                return false;
            }
            if (values.startTime < new Date()) {
                toast.error("Start time can't be in past");
                return false;
            }
        }

        if (values.eventImage) {
            console.log('...eventImage');
            // console.log(values.eventImage);
            console.log('extensionNAme', values.eventImage.name.split('.').pop());
            if (
                values.eventImage.name.split('.').pop() == 'jpg' ||
                values.eventImage.name.split('.').pop() == 'png' ||
                values.eventImage.name.split('.').pop() == 'jpeg'
            ) {
                return true;
            } else {
                toast.error('Upload the files with these extensions: PNG, JPG, JPEG');
                return false;
            }
        }
        return true;
    };
    const validationSchema = Yup.object({
        isUpdate: Yup.boolean().default(isUpdate),
        isOptional: Yup.boolean().default(isOptional),
        isOptional: Yup.boolean().default(isOptional),
        name: Yup.string()

            .required('Event Name is required!')

            .min(2, 'Invalid Event Name')

            .max(42, 'Invalid Event Name')
            .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Event name')
            .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Event name'),
        description: Yup.string().required('Name is required!').min(1, 'Invalid description').max(500, 'Invalid description'),
        eventImage: Yup.mixed().when(['isUpdate'], {
            is: true,
            then: Yup.mixed(),
            otherwise: Yup.mixed().required('Image is required')
        }),

        price: Yup.mixed().when(['isOptional'], {
            is: true,
            then: Yup.number().typeError('Enter price correctly'),
            otherwise: Yup.number()
                .min(0.0001, 'Price must be greater than 0.0001')
                .required('Price is required')
                .typeError('Enter price correctly')
        }),

        collectionAddress: Yup.mixed().when(['isOptional'], {
            is: true,
            then: Yup.mixed(),
            otherwise: Yup.string().required('Collection Address is required')
        }),

        price: Yup.mixed().when(['isOptional'], {
            is: true,
            then: Yup.number().typeError('Enter price correctly'),
            otherwise: Yup.number()
                .min(0.0001, 'Price must be greater than 0.0001')
                .required('Price is required')
                .typeError('Enter price correctly')
        }),

        collectionAddress: Yup.mixed().when(['isOptional'], {
            is: true,
            then: Yup.mixed(),
            otherwise: Yup.string().required('Collection Address is required')
        })
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: eventDetail,
        validationSchema,
        onSubmit: (values) => {
            const isValid = errorHandler(values);
            if (isValid) {
                setLoader(true);
                dispatch(
                    isUpdate
                        ? updateEvent({
                              id: eventId,
                              lobbyName: values.name,
                              ticketPrice: values.price ? values.price : 0,
                              currencyType: type,
                              description: values.description,
                              collectionAddress: values.collectionAddress ? values.collectionAddress : '',
                              image: values.eventImage,
                              startTime: values.startTime,
                              endTime: values.endTime,
                              brandId: values.brand,
                              search: search,
                              page: page,
                              limit: limit,
                              setLoader: setLoader,
                              handleClose: handleClose
                          })
                        : addEvent({
                              lobbyName: values.name,
                              ticketPrice: values.price ? values.price : 0,
                              currencyType: type,
                              description: values.description,
                              collectionAddress: values.collectionAddress,
                              image: values.eventImage,
                              startTime: values.startTime,
                              endTime: values.endTime,
                              brandId: values.brand,
                              search: search,
                              page: page,
                              limit: limit,
                              setLoader: setLoader,
                              handleClose: handleClose
                          })
                );
            }
        }
    });

    useEffect(() => {
        dispatch(getAllBrandList());
    }, []);
    useEffect(() => {
        console.log('price in useEffect', typeof formik.values.price);
        console.log('collectionAddress in useEffect', formik.values.collectionAddress);
        if (formik.values.collectionAddress == '' && formik.values.price == 0) {
            setIsOptional(false);
        } else {
            setIsOptional(true);
        }
    }, [formik.values.collectionAddress, formik.values.price]);

    return (
        <>
            <Dialog
                className="brandDialog"
                maxWidth="md"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">{isUpdate ? 'Edit Event' : 'Add Event'}</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid container>
                            <Grid item xs={6} pt={4} pr={4}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Enter Event Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={6} pt={4}>
                                <TextField
                                    className="brandSelectField"
                                    id="outlined-select-budget"
                                    select
                                    fullWidth
                                    label="Select Brand"
                                    value={formik.values.brand}
                                    onChange={handleBrandChange}
                                >
                                    <MenuItem value={0}>Choose Brand</MenuItem>
                                    {brandArray &&
                                        brandArray.brandList &&
                                        brandArray.brandList.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6} pt={4} pr={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                                        label="Start Time"
                                        minDateTime={new Date()}
                                        value={formik.values.startTime}
                                        onChange={(newValue) => {
                                            formik.setFieldValue('startTime', newValue);
                                        }}
                                        timeZone="UTC"
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} pt={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                                        label="End Time"
                                        minDateTime={new Date(formik.values.startTime)}
                                        value={formik.values.endTime}
                                        onChange={(newValue) => {
                                            formik.setFieldValue('endTime', newValue);
                                        }}
                                        timeZone="UTC"
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6} pt={2}>
                                <FileInput
                                    formik={formik}
                                    accept="image/*"
                                    fieldName="eventImage"
                                    placeHolder="Add Event Image"
                                    fileRef1={fileRef1}
                                    imageUrl={imageUrl}
                                    setImageUrl={setImageUrl}
                                />
                            </Grid>

                            <Grid item xs={6} pt={4}>
                                <TextField
                                    id="collectionAddress"
                                    name="collectionAddress"
                                    label="Enter Collection Address"
                                    value={formik.values.collectionAddress}
                                    onChange={formik.handleChange}
                                    error={formik.touched.collectionAddress && Boolean(formik.errors.collectionAddress)}
                                    helperText={formik.touched.collectionAddress && formik.errors.collectionAddress}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={6} pt={4} pr={4}>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Event Enterance price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={6} pt={4}>
                                <TextField
                                    id="outlined-select-budget"
                                    select
                                    fullWidth
                                    label="Select Token"
                                    value={type}
                                    onChange={handleType}
                                >
                                    {typeArray.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} pt={4}>
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Enter Event Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    fullWidth
                                    autoComplete="given-name"
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
                        cancel
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
                        ) : isUpdate ? (
                            'Edit'
                        ) : (
                            'Add'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
