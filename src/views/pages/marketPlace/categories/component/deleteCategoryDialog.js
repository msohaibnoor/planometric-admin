import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, DialogContentText, Typography } from '@mui/material';
import { deleteCategory } from '../../../../../redux/marketPlace/actions';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function DeleteCategoryDialog({ deleteOpen, setDeleteOpen,categoryData, categoryId, brandId,page, limit, search }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleClose = () => {
        setDeleteOpen(false);
    };
    return (
        <>
            <Dialog
                open={deleteOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">Delete Category</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description1">
                        <Typography variant="body2" component="span">
                            Are you sure you want to delete this Category?
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
                                deleteCategory({
                                    categoryId: categoryId,
                                    brandId:categoryData.brandId,
                                    handleClose: handleClose,
                                    page: page,
                                    limit: limit,
                                    search: search
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
