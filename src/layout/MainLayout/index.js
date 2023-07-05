import { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from 'menu-items';
import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';
// assets
import { IconChevronRight } from '@tabler/icons';

const MainLayout = () => {
    const theme = useTheme();
    // language customization
    const customization = useSelector((state) => state.customization);
    const [language, setLanguage] = useState(customization.locale);
    useEffect(() => {
        setLanguage(customization.locale);
    }, [customization]);
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line
    }, [matchDownMd]);

    // styles
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, rightOpen }) => ({
        ...theme.typography.mainContent,
        ...(!open &&
            language == 'en' && {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
                [theme.breakpoints.up('md')]: {
                    marginLeft: -(drawerWidth - 20),
                    width: `calc(100% - ${drawerWidth}px)`
                },
                [theme.breakpoints.down('md')]: {
                    marginLeft: '20px',
                    width: `calc(100% - ${drawerWidth}px)`,
                    padding: '16px'
                },
                [theme.breakpoints.down('sm')]: {
                    marginLeft: '10px',
                    width: `calc(100% - ${drawerWidth}px)`,
                    padding: '16px',
                    marginRight: '10px'
                }
            }),

        ...(open &&
            language == 'en' && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                }),
                marginLeft: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: `calc(100% - ${drawerWidth}px)`,
                [theme.breakpoints.down('md')]: {
                    marginLeft: '20px'
                },
                [theme.breakpoints.down('sm')]: {
                    marginLeft: '10px'
                }
            }),
        ...(!rightOpen &&
            language !== 'en' && {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
                [theme.breakpoints.up('md')]: {
                    marginRight: -(drawerWidth - 20),
                    width: `calc(100% - ${drawerWidth}px)`
                },
                [theme.breakpoints.down('md')]: {
                    marginRight: '20px',
                    width: `calc(100% - ${drawerWidth}px)`,
                    padding: '16px'
                },
                [theme.breakpoints.down('sm')]: {
                    marginRight: '10px',
                    width: `calc(100% - ${drawerWidth}px)`,
                    padding: '16px',
                    marginLeft: '10px'
                }
            }),

        ...(rightOpen &&
            language !== 'en' && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                }),
                marginRight: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: `calc(100% - ${drawerWidth}px)`,
                [theme.breakpoints.down('md')]: {
                    marginRight: '20px'
                },
                [theme.breakpoints.down('sm')]: {
                    marginRight: '10px'
                }
            })
    }));

    // ==============================|| MAIN LAYOUT ||============================== //

    return language == 'en' ? (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}

            <Sidebar draw="left" drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                <Outlet />
            </Main>
        </Box>
    ) : (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* main content */}
            <Main
                // sx={{  marginLeft:"0" , marginRight: "-240px"  }}
                theme={theme}
                rightOpen={leftDrawerOpened}
            >
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                <Outlet />
            </Main>
            {/* drawer */}
            <div dir="rtl">
                <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} draw="right" />
            </div>
        </Box>
    );
};

export default MainLayout;
