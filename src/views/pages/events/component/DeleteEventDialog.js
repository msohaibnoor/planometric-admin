import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, DialogContentText, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
// animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { deleteEvent } from '../../../../redux/events/actions';

export default function DeleteEventDialog({ open, setOpen, eventId, page, limit, search }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">Delete Event</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description1">
                        <Typography variant="body2" component="span">
                            Are you sure you want to delete this event?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                        onClick={handleClose}
                        color="secondary"
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            dispatch(
                                deleteEvent({
                                    id: eventId,
                                    handleClose: handleClose,
                                    page: page,
                                    limit: limit,
                                    search: search,
                                   
                                })
                            );
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
