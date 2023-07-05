import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Typography,TextField  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
const Theater = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {}, []);

    const uploadNftSchema = Yup.object().shape({
        url: Yup.mixed()
    });

    const formik = useFormik({
        initialValues: {
            url: []
        },
        enableReinitialize: true,
        validationSchema: uploadNftSchema,
        onSubmit: async (values) => {}
    });

    return (
        <>
            <MainCard
                title={
                    <Typography variant="h3" sx={{ fontWeight: 500, color: 'cadetblue' }}>
                        Theater Management of Event : {location.state.eventName}
                    </Typography>
                }
                secondary={
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            navigate('/events');
                        }}
                    >
                        back
                    </Button>
                }
                content={false}
            >
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent="center" style={{ padding: '20px' }}>
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
                    <Grid textAlign="center" padding={2}>
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
                    </Grid>
                </form>
            </MainCard>
        </>
    );
};

export default Theater;
