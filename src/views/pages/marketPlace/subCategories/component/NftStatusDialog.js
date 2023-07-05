import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, DialogContentText, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
// animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { changeNftStatusOfSubCategory } from '../../../../../redux/marketPlace/actions';

export default function NftStatusDialog({ open, setOpen, subCategoryId, mainBrandId, mainCategoryId, limit, page, search,dialogContent }) {
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
                <DialogTitle id="alert-dialog-slide-title1">Change NFT Status of Subcategory</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description1">
                        <Typography variant="body2" component="span">
                            {dialogContent}
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
                                changeNftStatusOfSubCategory({
                                    mainBrandId: mainBrandId,
                                    mainCategoryId: mainCategoryId,
                                    subCategoryId: subCategoryId,
                                    search: search,
                                    page: page,
                                    limit: limit,
                                    handleClose: handleClose
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
