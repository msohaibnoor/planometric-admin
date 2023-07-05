import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Grid, MenuItem } from '@mui/material';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { addSubCategory, updateSubCategory, getAllCategoriesByBrand } from '../../../../../redux/marketPlace/actions';

const typeArray = [
    {
        value: 'KTX',
        label: 'KTX'
    },
];

export default function AddUpdateSubCategoryDialog({
    mainBrandId,
    mainCategoryId,
    categoryArray,
    brandArray,
    page,
    limit,
    search,
    addUpdateOpen,
    setAddUpdateOpen,
    subCategoryData,
    setSubCategoryData,
    type,
    setType
}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [brand, setBrand] = useState(0);
    const [category, setCategory] = useState(0);

    const handleType = (event) => {
        setType(event.target.value);
    };
    const handleBrandChange = (event) => {
        setBrand(event.target.value);
        setCategory(0);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Subcategory Name is required!')
            .max(42, 'Subcategory Name can not exceed 42 characters')
            .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Subcategory name'),

        nftName: Yup.string()
            .required('NFT Name is required!')
            .max(42, 'NFT Name can not exceed 42 characters')
            .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid NFT name'),
        nftDescription: Yup.string()
            .required('NFT Description is required!')
            .max(500, 'Invalid NFT description can not exceed 500 characters')
            .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid NFT description'),
        nftPrice: Yup.number().min(0.000001, 'Price should not less than zero').required('NFT Price is required').typeError('Invalid Price')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: subCategoryData.name,
            nftName: subCategoryData.nftName,
            nftDescription: subCategoryData.nftDescription,
            nftPrice: subCategoryData.nftPrice
        },
        validationSchema,
        onSubmit: (values) => {
            if (subCategoryData.name == '') {
                dispatch(
                    addSubCategory({
                        name: values.name,
                        nftName: values.nftName,
                        nftDescription: values.nftDescription,
                        nftPrice: values.nftPrice,
                        currencyType: type,
                        categoryId: category,
                        search: search,
                        page: page,
                        limit: limit,
                        mainBrandId: mainBrandId,
                        mainCategoryId: mainCategoryId,
                        handleClose: handleClose,
                        setBrand: setBrand,
                        setCategory: setCategory
                    })
                );
            } else {
                dispatch(
                    updateSubCategory({
                        name: values.name,
                        nftName: values.nftName,
                        nftDescription: values.nftDescription,
                        nftPrice: values.nftPrice,
                        currencyType: type,
                        subCategoryId: subCategoryData.subCategoryId,
                        search: search,
                        page: page,
                        limit: limit,
                        mainBrandId: mainBrandId,
                        mainCategoryId: mainCategoryId,
                        handleClose: handleClose
                    })
                );
            }
        }
    });

    const handleClose = () => {
        setAddUpdateOpen(false);
        setSubCategoryData({
            name: '',
            nftName: '',
            nftDescription: '',
            nftPrice: 0,
            subCategoryId: 0
        });
        setType('KTX');
        formik.resetForm();
    };
    useEffect(() => {
        dispatch(
            getAllCategoriesByBrand({
                brandId: brand
            })
        );
    }, [brand]);

    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={addUpdateOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">
                    {subCategoryData.name == '' ? 'Add Subcategory' : 'Update Subcategory'}
                </DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid container display="flex">
                            {subCategoryData.name == '' && (
                                <Grid item xs={12} pt={4}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Enter Subcategory Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12} pt={4}>
                                <TextField
                                    id="nftName"
                                    name="nftName"
                                    label="Enter NFT Name"
                                    value={formik.values.nftName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nftName && Boolean(formik.errors.nftName)}
                                    helperText={formik.touched.nftName && formik.errors.nftName}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={6} pt={4} pr={2}>
                                <TextField
                                    id="nftPrice"
                                    name="nftPrice"
                                    label="Enter NFT price"
                                    value={formik.values.nftPrice}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nftPrice && Boolean(formik.errors.nftPrice)}
                                    helperText={formik.touched.nftPrice && formik.errors.nftPrice}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={6} pt={4}>
                                <TextField
                                    id="outlined-select-budget"
                                    select
                                    fullWidth
                                    label="Select Token"
                                    value={type}
                                    onChange={handleType}
                                >
                                    {typeArray.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} pt={4}>
                                <TextField
                                    id="nftDescription"
                                    name="nftDescription"
                                    label="Enter NFT Description"
                                    value={formik.values.nftDescription}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nftDescription && Boolean(formik.errors.nftDescription)}
                                    helperText={formik.touched.nftDescription && formik.errors.nftDescription}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>

                            {subCategoryData.name == '' && (
                                <>
                                    <Grid item xs={12} pt={4}>
                                        <TextField
                                            className="selectField"
                                            id="outlined-select-budget"
                                            select
                                            fullWidth
                                            label="Select Brand"
                                            value={brand}
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
                                    <Grid item xs={12} pt={4}>
                                        <TextField
                                            className="brandSelectField"
                                            id="outlined-select-budget"
                                            select
                                            fullWidth
                                            label="Select Category"
                                            value={category}
                                            onChange={handleCategoryChange}
                                        >
                                            <MenuItem value={0}>Choose Category</MenuItem>
                                            {categoryArray &&
                                                categoryArray.categoryList &&
                                                categoryArray.categoryList.map((option, index) => (
                                                    <MenuItem key={index} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                    </Grid>
                                </>
                            )}
                        </Grid>
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
                        {subCategoryData.name == '' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
