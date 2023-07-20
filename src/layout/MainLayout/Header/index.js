import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import LogoSection from '../LogoSection';
import kwikTrustLogo from '../../../assets/images/kwikTrustLogo.svg';
import SearchSection from './SearchSection';
import LocalizationSection from './LocalizationSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import MetaMaskSection from './MetaMaskSection';
import { FormattedMessage } from 'react-intl';

// assets
import { IconMenu2 } from '@tabler/icons';
import React from 'react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [language, setLanguage] = useState(customization.locale);
    useEffect(() => {
        setLanguage(customization.locale);
    }, [customization]);
    // const context = useContext(Context);

    return language == 'en' ? (
        <>
            {/* logo & toggler button */}

            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    {/* <img style={{ width: '170px' }} src={kwikTrustLogo} alt="Berry" /> */}
                    <h1>Planometric</h1>
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'block', marginRight: '10px' } }}>
                <LocalizationSection />
            </Box>
            <Box sx={{ display: { sm: 'block', marginRight: '10px' } }}>
                <MetaMaskSection />
            </Box>

            <ProfileSection />

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    ) : (
        <>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
            <ProfileSection />
            {/* live customization & localization */}

            <Box sx={{ display: { xs: 'none', sm: 'block', marginRight: '10px' } }}>
                <LocalizationSection />
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <p
                        style={{
                            fontStyle: 'oblique',
                            fontWeight: 800,
                            color: 'cadetblue',
                            margin: 0,
                            fontSize: '34px',
                            paddingTop: '7px',
                            paddingLeft: '30px'
                        }}
                    >
                        <FormattedMessage id="Tabshura" />
                    </p>

                    {/* <LogoSection /> */}
                </Box>
            </Box>
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
