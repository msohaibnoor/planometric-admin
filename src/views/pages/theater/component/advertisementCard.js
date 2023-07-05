import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CardContent, CardMedia, Grid, Rating, Stack, Typography, IconButton, Tooltip } from '@mui/material';
import MainCard from './mainCard';
import BlockIcon from '@mui/icons-material/Block';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddAdvertisementDialog from './addAdvertisementDialog';
import { changeSlotStatus, deleteSlot } from '../../../../redux/advertisement/actions';
import emptySlot from 'assets/images/empty-slot.png';
const AdvertisementCard = ({ advertisement, eventId, page, limit }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    return (
        <>
            <AddAdvertisementDialog open={open} setOpen={setOpen} advertisement={advertisement} page={page} limit={limit} />

            <MainCard
                content={false}
                boxShadow
                sx={{
                    '&:hover': {
                        transform: 'scale3d(1.02, 1.02, 1)',
                        transition: 'all .4s ease-in-out'
                    }
                }}
            >
                <CardMedia
                    component={advertisement && advertisement.url && advertisement.url.split('.').pop() == 'mp4' ? 'video' : 'image'}
                    onClick={() => {
                        setOpen(true);
                    }}
                    sx={{ height: 250 }}
                    image={advertisement.url ? advertisement.url : emptySlot}
                    autoPlay
                    loop
                    muted
                />
                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                {advertisement.slotNumber && 'Screen No: ' + advertisement.slotNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} style={{ marginTop: '-9px' }} display="flex">
                            <Tooltip placement="top" title={'Delete Slot'}>
                                <IconButton
                                    disabled={!advertisement.url}
                                    color={'error'}
                                    aria-label="delete"
                                    size="medium"
                                    onClick={() => {
                                        dispatch(
                                            deleteSlot({
                                                slotNumber: advertisement.slotNumber,
                                                eventId: advertisement.LobbieId,
                                                page: page,
                                                limit: limit
                                            })
                                        );
                                    }}
                                >
                                    <DeleteOutlineOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip placement="top" title={advertisement.isActive ? 'Turn Off' : 'Turn On'}>
                                <IconButton
                                    disabled={!advertisement.url}
                                    color={advertisement.isActive ? 'primary' : 'error'}
                                    aria-label="delete"
                                    size="medium"
                                    onClick={() => {
                                        dispatch(
                                            changeSlotStatus({
                                                slotId: advertisement.id,
                                                eventId: advertisement.LobbieId,
                                                page: page,
                                                limit: limit
                                            })
                                        );
                                    }}
                                >
                                    <BlockIcon sx={{ fontSize: '1.5rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default AdvertisementCard;
