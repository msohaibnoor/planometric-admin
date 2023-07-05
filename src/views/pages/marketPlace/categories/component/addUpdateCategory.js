import { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Grid, MenuItem } from '@mui/material';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { addCategory, updateCategory } from '../../../../../redux/marketPlace/actions';

export default function AddUpdateCategoryDialog({
    brandArray,
    addUpdateOpen,
    setAddUpdateOpen,
    page,
    limit,
    search,
    categoryData,
    setCategoryData,
    categoryId,
    mainBrandId
}) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleBrandChange = (event) => {
        setCategoryData({
            name: categoryData.name,
            brandId: event.target.value
        });
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Category Name is required!')
            .max(42, 'Category Name can not exceed 42 characters')
            .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Category name')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: categoryData.name
        },
        validationSchema,
        onSubmit: (values) => {
            if (categoryData.name == '') {
                dispatch(
                    addCategory({
                        name: values.name,
                        brandId: categoryData.brandId,
                        search: search,
                        page: page,
                        limit: limit,
                        mainBrandId: mainBrandId,
                        handleClose: handleClose,
                        setCategoryData: setCategoryData
                    })
                );
            } else {
                dispatch(
                    updateCategory({
                        categoryId: categoryId,
                        name: values.name,
                        brandId: categoryData.brandId,
                        search: search,
                        page: page,
                        limit: limit,
                        handleClose: handleClose,
                        setCategoryData: setCategoryData
                    })
                );
            }
        }
    });
    const handleClose = () => {
        setAddUpdateOpen(false);
        setCategoryData({
            name: '',
            brandId: 0
        });
        formik.resetForm();
    };

    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={addUpdateOpen}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">{categoryData.name == '' ? 'Add Category' : 'Update Category'}</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid item xs={12} pt={4}>
                            <TextField
                                id="name"
                                name="name"
                                label="Enter Category Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        {categoryData.name == '' && (
                            <Grid item xs={12} pt={4}>
                                <TextField
                                    className="brandSelectField"
                                    id="outlined-select-budget"
                                    select
                                    fullWidth
                                    label="Select Brand"
                                    value={categoryData.brandId}
                                    onChange={handleBrandChange}
                                >
                                    <MenuItem value={0}>Choose Brand</MenuItem>
                                    {brandArray &&
                                        brandArray.brandList &&
                                        brandArray.brandList.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                        )}
                    </form>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                        onClick={() => {
                            handleClose();
                        }}
                        color="secondary"
                    >
                        <FormattedMessage id="cancel" />
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        {categoryData.name == '' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
