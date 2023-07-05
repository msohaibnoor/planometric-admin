import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { getAllSlots } from '../../../redux/advertisement/actions';
import AdvertisementCard from './component/advertisementCard';
import { useLocation } from 'react-router-dom';
import lobbyMap from 'assets/images/lobby-map.png';

const Advertisements = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const location = useLocation();
    const advertisemntsList = useSelector((state) => state.advertisements.advertisementsList);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(35);

    useEffect(() => {
        dispatch(
            getAllSlots({
                eventId: location.state.eventId,
                page: page,
                limit: limit
            })
        );
    }, [page, limit]);

    return (
        <>
            <MainCard
                title={
                    <Typography variant="h3" sx={{ fontWeight: 500, color: 'cadetblue' }}>
                        Advertisement List of Event : {location.state.eventName}
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
                <Grid container spacing={gridSpacing} mt={4} mb={4} pl={2}>
                    <img src={lobbyMap} style={{ width: '100%' }} />
                </Grid>
                {advertisemntsList && advertisemntsList.advertisements && advertisemntsList.advertisements.length > 0 ? (
                    <>
                        <Grid container spacing={gridSpacing} mt={4} mb={4} pl={2}>
                            {advertisemntsList.advertisements &&
                                advertisemntsList.advertisements.map((advertisement, index) => {
                                    return (
                                        <Grid
                                            key={index}
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            onClick={() => {
                                                // console.log('advertisement', advertisement);
                                            }}
                                        >
                                            <AdvertisementCard
                                                advertisement={advertisement && advertisement}
                                                eventId={location.state.eventId}
                                                page={page}
                                                limit={limit}
                                            />
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item>
                            <Typography style={{ padding: '20px' }}> No Data Available</Typography>
                        </Grid>
                    </>
                )}
            </MainCard>
        </>
    );
};

export default Advertisements;
