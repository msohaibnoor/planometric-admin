import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import { FormattedMessage } from 'react-intl';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from '../../../../redux/auth/actions';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../../../redux/auth/actions';

const LoginForm = ({ loginProp, ...others }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customization = useSelector((state) => state.customization);
    const [language, setLanguage] = useState(customization.locale);
    useEffect(() => {
        setLanguage(customization.locale);
    }, [customization]);
    const loader = useSelector((state) => state.auth.loader);
    const theme = useTheme();
    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(setLoader(false));
    }, []);
    return (
        <>
            <div dir={language == 'ro' ? 'rtl' : 'ltr'}>
                {' '}
                <Formik
                    enableReinitialize
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email(<FormattedMessage id="signIn.validEmail" />)
                            .max(255)
                            .required(<FormattedMessage id="signIn.emailRequired" />),
                        password: Yup.string().max(255).required('Password is required!')
                    })}
                    onSubmit={async (values) => {
                        await dispatch(setLoader(true));
                        dispatch(
                            login({
                                email: values.email,
                                password: values.password,
                                navigate: navigate
                            })
                        );
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-email-login">
                                    {<FormattedMessage id="signIn.emailUserName" />}
                                </InputLabel>
                                <OutlinedInput
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label={<FormattedMessage id="signIn.emailUserName" />}
                                    inputProps={{}}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                fullWidth
                                error={Boolean(touched.password && errors.password)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-login">
                                    {<FormattedMessage id="signIn.password" />}
                                </InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                    label={<FormattedMessage id="signIn.password" />}
                                    inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={<FormattedMessage id="signIn.rememberMe" />}
                                />
                                <Typography
                                    variant="subtitle1"
                                    component={Link}
                                    to={'/forgetpassword'}
                                    color="secondary"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    {<FormattedMessage id="signIn.forgotPassword" />}
                                </Typography>
                            </Stack>
                            {errors.submit && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Box>
                            )}

                            <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                    {loader ? (
                                        <Button
                                            disabled
                                            disableElevation
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            {<FormattedMessage id="signIn.button" />}
                                        </Button>
                                    ) : (
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            {<FormattedMessage id="signIn.button" />}
                                        </Button>
                                    )}
                                </AnimateButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default LoginForm;
