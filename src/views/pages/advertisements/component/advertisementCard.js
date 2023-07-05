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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
const AdvertisementCard = ({ advertisement, eventId, page, limit }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [dimension, setDimension] = useState({
        width: 0,
        height: 0
    });
    const resolutionArray = [
        {
            slotNo: 1,
            width: 478,
            height: 1024
        },
        {
            slotNo: 2,
            width: 1024,
            height: 766
        },
        {
            slotNo: 3,
            width: 478,
            height: 1024
        },
        {
            slotNo: 4,
            width: 1024,
            height: 766
        },
        {
            slotNo: 5,
            width: 478,
            height: 1024
        },
        {
            slotNo: 6,
            width: 1024,
            height: 766
        },
        {
            slotNo: 7,
            width: 478,
            height: 1024
        },
        {
            slotNo: 8,
            width: 1024,
            height: 766
        },
        {
            slotNo: 9,
            width: 478,
            height: 1024
        },
        {
            slotNo: 10,
            width: 1024,
            height: 766
        },
        {
            slotNo: 11,
            width: 478,
            height: 1024
        },
        {
            slotNo: 12,
            width: 2048,
            height: 587
        },
        {
            slotNo: 13,
            width: 478,
            height: 1024
        },
        {
            slotNo: 14,
            width: 478,
            height: 1024
        },
        {
            slotNo: 15,
            width: 1024,
            height: 415
        },
        {
            slotNo: 16,
            width: 1024,
            height: 415
        },
        {
            slotNo: 17,
            width: 478,
            height: 1024
        },
        {
            slotNo: 18,
            width: 478,
            height: 1024
        },
        {
            slotNo: 19,
            width: 478,
            height: 1024
        },
        {
            slotNo: 20,
            width: 1024,
            height: 648
        },
        {
            slotNo: 21,
            width: 1024,
            height: 371
        },
        {
            slotNo: 22,
            width: 2048,
            height: 436
        },
        {
            slotNo: 23,
            width: 1024,
            height: 371
        },
        {
            slotNo: 24,
            width: 676,
            height: 1024
        },
        {
            slotNo: 25,
            width: 2048,
            height: 635
        },
        {
            slotNo: 26,
            width: 1024,
            height: 496
        },
        {
            slotNo: 27,
            width: 2048,
            height: 372
        },
        {
            slotNo: 28,
            width: 1024,
            height: 547
        },
        {
            slotNo: 29,
            width: 1024,
            height: 547
        },
        {
            slotNo: 30,
            width: 1024,
            height: 547
        },
        {
            slotNo: 31,
            width: 1024,
            height: 547
        },
        {
            slotNo: 32,
            width: 1024,
            height: 547
        },
        {
            slotNo: 33,
            width: 1024,
            height: 547
        }
    ];

    return (
        <>
            <AddAdvertisementDialog
                open={open}
                setOpen={setOpen}
                advertisement={advertisement}
                page={page}
                limit={limit}
                dimensionValue={dimension}
            />

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
                        setDimension({
                            width: resolutionArray[advertisement.slotNumber - 1].width,
                            height: resolutionArray[advertisement.slotNumber - 1].height
                        });
                    }}
                    sx={{ height: 250 }}
                    image={advertisement.url ? advertisement.url : emptySlot}
                    autoPlay
                    loop
                    muted
                />
                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                {advertisement.slotNumber && 'Screen No: ' + advertisement.slotNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: '-9px' }} display="flex">
                            <Tooltip placement="top" title={'View Advertisement'}>
                                <IconButton
                                    aria-label="delete"
                                    size="medium"
                                    color="primary"
                                    disabled={!advertisement.url}
                                    onClick={() => {
                                        window.open(advertisement && advertisement.url);
                                    }}
                                >
                                    <VisibilityOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                </IconButton>
                            </Tooltip>
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
                        <Grid item xs={12} display="flex" style={{ marginTop: '-9px' }}>
                            <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                Dimensions :
                            </Typography>
                            <Typography variant="subtitle1" sx={{ textDecoration: 'none', marginLeft: '5px' }}>
                                {resolutionArray[advertisement.slotNumber - 1].width} *{' '}
                                {resolutionArray[advertisement.slotNumber - 1].height}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default AdvertisementCard;
