import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import StarsTwoToneIcon from '@mui/icons-material/StarsTwoTone';
import BrandingWatermarkTwoToneIcon from '@mui/icons-material/BrandingWatermarkTwoTone';
// project imports
import UserCountCard from 'shared/Card/UserCountCard';
import EventCountCard from 'shared/Card/EventCountCard';
import BrandCountCard from 'shared/Card/BrandCountCard';
import NftCountCard from 'shared/Card/NftCountCard';
import { getDashboardData } from 'redux/dashboard/actions';
import { FormattedMessage } from 'react-intl';
const Dashboard = () => {
    const dispatch = useDispatch();

    const customization = useSelector((state) => state.customization);
    const dashboardData = useSelector((state) => state.superAdminDashboard.dashboardData);
    console.log(dashboardData);
    const [language, setLanguage] = useState(customization.locale);
    useEffect(() => {
        setLanguage(customization.locale);
    }, [customization]);

    const [isLoading, setLoading] = useState(true);

    const theme = useTheme();
    useEffect(() => {
        dispatch(getDashboardData());
        setLoading(false);
    }, []);

    return (
        <>
            <div dir={language == 'ro' ? 'rtl' : 'ltr'}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                 {/* Dashboard coming soon */}
                                <UserCountCard
                                    primary={<FormattedMessage id="dashboardUsers" />}
                                    secondary={dashboardData?.users ?? '...'}
                                    iconPrimary={AccountCircleTwoTone}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <EventCountCard
                                    primary={<FormattedMessage id="projectsCreated" />}
                                    secondary={dashboardData?.projects ?? '...'}
                                    iconPrimary={EmojiEventsTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <BrandCountCard
                                    primary={<FormattedMessage id="totalMunicipalities" />}
                                    secondary={dashboardData?.municipalities ?? '...'}
                                    iconPrimary={BrandingWatermarkTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>

                            {/* <Grid item lg={6} md={4} sm={6} xs={12}>
                                <EventCountCard
                                    primary={<FormattedMessage id="dashboardEvents" />}
                                    secondary={dashboardData?.totalEvents ?? '...'}
                                    iconPrimary={EmojiEventsTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <BrandCountCard
                                    primary={<FormattedMessage id="dashboardBrands" />}
                                    secondary={dashboardData?.brands ?? '...'}
                                    iconPrimary={BrandingWatermarkTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <NftCountCard
                                    primary={<FormattedMessage id="dashboardNFTS" />}
                                    secondary={dashboardData?.totalNft ?? '...'}
                                    iconPrimary={StarsTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <NftCountCard
                                    primary={<FormattedMessage id="mintedNFTS" />}
                                    secondary={dashboardData?.totaldirectMintedNft ?? '...'}
                                    iconPrimary={StarsTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <NftCountCard
                                    primary={<FormattedMessage id="draftNFTS" />}
                                    secondary={dashboardData?.totalDraftNfts ?? '...'}
                                    iconPrimary={StarsTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <NftCountCard
                                    primary={<FormattedMessage id="soldNFTS" />}
                                    secondary={dashboardData?.totalSoldNfts ?? '...'}
                                    iconPrimary={StarsTwoToneIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Dashboard;
