import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Grid, Typography } from '@mui/material';
import moment from 'moment';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function EventDetailDialog({ open, setOpen, eventData }) {
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                className="brandDialog"
                maxWidth="md"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle
                    id="alert-dialog-slide-title1"
                    onClick={() => {
                        console.log('event detail', eventData);
                    }}
                >
                    Event Detail
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item lg={4} className="optionImageContainer">
                            <img src={eventData && eventData.imageUrl} alt="Statement Image" className="imageSize" />
                        </Grid>
                        <Grid item lg={8} mt={3}>
                            <Grid container>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Name :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && eventData.lobbyName}
                                </Grid>
                            </Grid>
                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Brand Name :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && eventData.Brand.name}
                                </Grid>
                            </Grid>
                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Start Time :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && moment(eventData.startTime).format(' MMMM Do YYYY, h:mm a')}{' '}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        End Time :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && moment(eventData.endTime).format(' MMMM Do YYYY, h:mm a')}{' '}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Status :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && eventData.isActive ? 'Active' : 'InActive'}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Description :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && eventData.description}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Ticket Price :
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && eventData.ticketPrice} {eventData && eventData.currencyType}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Collection Address :
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {eventData && eventData.collectionAddress ? eventData.collectionAddress : 'No collection entered'}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                        onClick={() => {
                            handleClose();
                        }}
                        color="secondary"
                    >
                       close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
