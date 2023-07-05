import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch } from 'react-redux';
import { resetPassword } from 'redux/auth/actions';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { FormattedMessage } from 'react-intl';

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const ResetPasswordForm = ({ token, ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // language customization

    const customization = useSelector((state) => state.customization);
    const [language, setLanguage] = useState(customization.locale);
    useEffect(() => {
        setLanguage(customization.locale);
    }, [customization]);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .max(255)
                        .required(<FormattedMessage id="reset.passwordRequired" />),
                    confirmPassword: Yup.string().when('password', {
                        is: (val) => !!(val && val.length > 0),
                        then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must be match!')
                    })
                })}
                onSubmit={async (values) => {
                    await dispatch(
                        resetPassword({
                            password: values.password,
                            token: token,
                            navigate: navigate
                        })
                    );
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-reset">{<FormattedMessage id="signIn.password" />}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-reset"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                        </FormControl>
                        {touched.password && errors.password && (
                            <FormControl fullWidth>
                                <FormHelperText error id="standard-weight-helper-text-reset">
                                    {errors.password}
                                </FormHelperText>
                            </FormControl>
                        )}

                        <FormControl
                            fullWidth
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-reset">
                                {<FormattedMessage id="reset.confirmpassword" />}{' '}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirmpassword-reset"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                        </FormControl>

                        {touched.confirmPassword && errors.confirmPassword && (
                            <FormControl fullWidth>
                                <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                    {' '}
                                    {errors.confirmPassword}{' '}
                                </FormHelperText>
                            </FormControl>
                        )}

                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box
                            sx={{
                                mt: 1
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    {<FormattedMessage id="reset.resetPasswordHeading" />}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default ResetPasswordForm;
