// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../../redux/auth/actions';
import { FormattedMessage } from 'react-intl';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const ForgetForm = ({ ...others }) => {
    const theme = useTheme();
    // language customization

  const customization = useSelector((state) => state.customization);
  const [language, setLanguage] = useState(customization.locale);
  useEffect(() => {
      setLanguage(customization.locale);
  }, [customization]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <><div dir={language=='ro'?'rtl':'ltr'}>  <Formik
            initialValues={{
                email: ''
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email(<FormattedMessage id="signIn.validEmail" />).max(255).required(<FormattedMessage id="signIn.emailRequired" />)
            })}
            onSubmit={async (values) => {
                await dispatch(
                    forgotPassword({
                        email: values.email,
                        navigate: navigate
                    })
                );
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-forgot">{<FormattedMessage id="signIn.emailUserName" />}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label={<FormattedMessage id="signIn.emailUserName" />}
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
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
                                {<FormattedMessage id="forgot.button" />}
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik></div></>
        
      
    );
};

export default ForgetForm;
