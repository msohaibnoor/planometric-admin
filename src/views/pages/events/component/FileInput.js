import { useDispatch } from 'react-redux';
import { Fragment, useState, useEffect, useRef } from 'react';
import { Grid, Typography, IconButton, Tooltip, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// Props needed for component formik ,correctOption, setCorrectOption , optionValue , formikFieldName , PlaceHOLDER
const FileInput = ({ formik, fieldName, placeHolder, accept, fileRef1, imageUrl, setImageUrl, videoUrl, setVideoUrl }) => {
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    return (
        <>
            <Grid item className="displayFlex">
                <Fragment>
                    {imageUrl ? (
                        <img src={imageUrl} width={40} height={40} style={{ borderRadius: '50%', marginRight: '8px', margin: '14px' }} />
                    ) : videoUrl ? (
                        <video src={videoUrl} width={40} height={40} style={{ borderRadius: '50%', marginRight: '8px', margin: '14px' }} />
                    ) : (
                        <Tooltip placement="top" title={accept == 'image/*' ? 'Add Image' : 'Add Audio'}>
                            <IconButton color="primary" aria-label="delete" size="large" onClick={() => fileRef1.current.click()}>
                                <AddCircleOutlinedIcon sx={{ fontSize: '3.0rem' }} />
                            </IconButton>
                        </Tooltip>
                    )}

                    <input
                        hidden
                        ref={fileRef1}
                        fullWidth
                        type="file"
                        className="chooseFileInput"
                        accept={accept}
                        onChange={(event) => {
                            formik.setFieldValue(fieldName, event.currentTarget.files[0]);
                            const file = event.currentTarget.files[0];
                            if (file.type.startsWith('image')) {
                                setImageUrl(URL.createObjectURL(event.currentTarget.files[0]));
                            }

                            if (file.type.startsWith('video')) {
                                const videoUrl = URL.createObjectURL(file);
                                setVideoUrl(videoUrl);
                            }
                        }}
                        error={formik.touched[`${fieldName}`] && Boolean(formik.errors[`${fieldName}`])}
                        helperText={formik.touched[`${fieldName}`] && formik.errors[`${fieldName}`]}
                    />

                    <Grid className="displayFlex">
                        {formik?.values[`${fieldName}`]?.name?.length < 40 ? (
                            <Typography mt={3.5} variant="h5">
                                {formik.values[`${fieldName}`]?.name}
                            </Typography>
                        ) : (
                            <Typography mt={3.5} variant="h5">
                                {formik.values[`${fieldName}`]?.name?.substring(0, 40)}
                            </Typography>
                        )}
                        {formik?.values[`${fieldName}`] && (
                            <Typography mt={3.5} variant="h5" ml={2}>
                                {'(' + (formik.values[`${fieldName}`]?.size / 1000000).toFixed(2) + '  mb)'}
                            </Typography>
                        )}

                        {formik.values[`${fieldName}`] ? (
                            <Tooltip placement="top" title={accept == 'image/*' ? 'Clear Image' : 'Clear Audio'}>
                                <IconButton
                                    style={{ marginTop: '6px' }}
                                    color="primary"
                                    aria-label="delete"
                                    size="large"
                                    onClick={() => {
                                        formik.setFieldValue(fieldName, null);
                                        fileRef1.current.value = null;
                                        setImageUrl(null);
                                        setVideoUrl(null);
                                    }}
                                >
                                    <CloseOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Typography mt={3.5} variant="h5">
                                {placeHolder}
                            </Typography>
                        )}
                    </Grid>
                </Fragment>
            </Grid>

            <Grid item>
                <p className={'fileError'}>
                    {formik.touched[`${fieldName}`] && Boolean(formik.errors[`${fieldName}`]) ? formik.errors[`${fieldName}`] : ''}
                </p>
            </Grid>
        </>
    );
};

export default FileInput;
