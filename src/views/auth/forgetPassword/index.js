import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import AuthWrapper from '../../../shared/component/AuthWrapper';
import LoginCardWrapper from '../../../shared/component/LoginCardWrapper';
import Logo from 'ui-component/Logo';
import ForgetForm from './component/ForgetForm';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ForgotPassword = () => {
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <LoginCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    color={theme.palette.secondary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                     {<FormattedMessage id="signIn.forgotPassword" />}   
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" fontSize="16px" textAlign="center">
                                                {<FormattedMessage id="forgotPassword.emailAddressBelow" />}     
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ForgetForm />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to={'/'} variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                            {<FormattedMessage id="forgot.alreadyAccount" />}   
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </LoginCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default ForgotPassword;
