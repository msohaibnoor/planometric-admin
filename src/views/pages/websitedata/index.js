import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Oval } from 'react-loader-spinner';

import {
    OutlinedInput,
    InputAdornment,
    Button,
    Grid,
    Typography,
    Pagination,
    Menu,
    MenuItem,
    TextField,
    TextareaAutosize
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';
import { gridSpacing } from 'store/constant';
import { IconSearch } from '@tabler/icons';
import { getAllTestimonials } from '../../../redux/testimonials/actions';
import { getAllData, updateData } from '../../../redux/clientdata/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const WebsiteData = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const clientData = useSelector((state) => state.clientData.clientData.dashboard);

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    // console.log('dataaaa');
    // console.log(data);

    const [openFeedback, setOpenFeedback] = useState(false);

    const [testimonialId, setTestimonialId] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [openRestricted, setRestrictedOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [limit, setLimit] = useState(10);
    const [type, setType] = useState('all');

    const handleType = (event) => {
        setType(event.target.value);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        dispatch(
            getAllData({
                search: search,
                page: page,
                limit: limit,
                type: type
            })
        );
    }, [search, page, limit, type]);

    useEffect(() => {
        if (clientData) {
            setData(clientData);
        }
    }, [clientData]);

    const validationSchema = Yup.object({
        planometricPlanFee: Yup.number().required('Fee is required!').min(1, 'Invalid Event Name'),
        businessDesc: Yup.string().required('Field is required!').min(1, 'Invalid description').max(500, 'Invalid description'),
        businessInformation: Yup.string().required('Field is required!').min(1, 'Invalid description').max(500, 'Invalid description'),
        costDescription: Yup.string().required('Field is required!').min(1, 'Invalid description').max(500, 'Invalid description')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: data,
        validationSchema,
        onSubmit: (values) => {
            // const isValid = errorHandler(values);
            // if (isValid) {
            setLoader(true);
            console.log(values);
            dispatch(
                updateData({
                    id: values.id,
                    businessDesc: values.businessDesc,
                    businessInformation: values.businessInformation,
                    costDescription: values.costDescription,
                    planometricPlanFee: Number(values.planometricPlanFee),
                    stripeText: values.stripeText,
                    createPlanInstruction1: values.createPlanInstruction1,
                    createPlanInstruction2: values.createPlanInstruction2,
                    createPlanInstruction3: values.createPlanInstruction3,
                    howItWorksStep1: values.howItWorksStep1,
                    howItWorksStep1Green: values.howItWorksStep1Green,
                    howItWorksStep2: values.howItWorksStep2,
                    howItWorksStep2Green: values.howItWorksStep2Green,
                    howItWorksStep3: values.howItWorksStep3,
                    howItWorksStep3Green: values.howItWorksStep3Green,
                    setLoader: setLoader,
                    handleClose: handleClose
                })
            );
            // }
        }
    });



    console.log(formik);
    return (
        <>
            <HeadingCard title="Update Planometric data" />
            <MainCard content={false}>
                <form>
                    <Grid container flexDirection={'column'}>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="businessDesc"
                                name="businessDesc"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.businessDesc}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="costDescription"
                                name="costDescription"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.costDescription}
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
                        </Grid>
                        <h2 style={{marginLeft: "20px"}} >Business Information</h2>

                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="businessInformation"
                                name="businessInformation"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.businessInformation}
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
                        </Grid>
                        <h2 style={{marginLeft: "20px"}} >Stripe Text</h2>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="stripeText"
                                name="stripeText"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.stripeText}
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
                        </Grid>
                        <h2 style={{marginLeft: "20px"}}>Create plan Instructions</h2>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="createPlanInstruction1"
                                name="createPlanInstruction1"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.createPlanInstruction1}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="createPlanInstruction2"
                                name="createPlanInstruction2"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.createPlanInstruction2}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="createPlanInstruction3"
                                name="createPlanInstruction3"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.createPlanInstruction3}
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
                        </Grid>
                        <h2 style={{marginLeft: "20px"}}>How It works (steps)</h2>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="howItWorksStep1"
                                name="howItWorksStep1"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.howItWorksStep1}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="howItWorksStep1Green"
                                name="howItWorksStep1Green"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.howItWorksStep1Green}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="howItWorksStep2"
                                name="howItWorksStep2"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.howItWorksStep2}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="howItWorksStep2Green"
                                name="howItWorksStep2Green"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.howItWorksStep2Green}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="howItWorksStep3"
                                name="howItWorksStep3"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.howItWorksStep3}
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
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextareaAutosize
                                id="howItWorksStep3Green"
                                name="howItWorksStep3Green"
                                label="Enter feedback"
                                aria-label="text area"
                                // rowsMin={4}
                                placeholder="Start typing here..."
                                value={formik.values?.howItWorksStep3Green}
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
                        </Grid>
                        <h2 style={{marginLeft: "20px"}}>Planometric project fee</h2>

                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
                            <TextField
                                id="planometricPlanFee"
                                name="planometricPlanFee"
                                label="Enter fee"
                                value={formik?.values?.planometricPlanFee}
                                onChange={formik.handleChange}
                                error={formik.touched.planometricPlanFee && Boolean(formik.errors.planometricPlanFee)}
                                // helperText={formik.touched.name && formik.errors.name}
                                fullWidth
                                autoComplete="given-name"
                                focused={true}
                            />
                        </Grid>
                        <Grid item xs={6} pt={4} pr={4} sx={{ padding: '10px' }}>
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
                                    'Update'
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </MainCard>
        </>
    );
};

export default WebsiteData;
