import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { fData } from '../../../../../utils/formatNumber';
import {
    Grid,
    Box,
    Typography,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    TextField,
    MenuItem
} from '@mui/material';
import { Icon } from '@iconify/react';
import fileFill from '@iconify-icons/eva/file-fill';
import closeFill from '@iconify-icons/eva/close-fill';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { Oval } from 'react-loader-spinner';
import { motion, AnimatePresence } from 'framer-motion';
import UploadImage from 'assets/images/icons/image-upload.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllBrandList, getAllCategoriesByBrand, getAllSubCategoriesByBrandAndCategory } from '../../../../../redux/marketPlace/actions';
import { addNft } from '../../../../../redux/nft/actions';
import QuantitySelector from './quantitySelector';

const AddNft = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const brandArray = useSelector((state) => state.marketPlace.brandArray);
    const categoryArray = useSelector((state) => state.marketPlace.categoryArray);
    const subCategoryArray = useSelector((state) => state.marketPlace.subCategoryArray);
    const [brand, setBrand] = useState(0);
    const [category, setCategory] = useState(0);
    const [subCategory, setSubCategory] = useState(0);
    const [loader, setLoader] = useState(false);
    const handleClose = () => {
        formik.resetForm();
        setLoader(false);
        setUploadedImages([]);
        setBrand(0);
        setCategory(0);
        setSubCategory(0);
    };

    const uploadNftSchema = Yup.object().shape({
        images: Yup.mixed()
    });

    const formik = useFormik({
        initialValues: {
            images: []
        },
        enableReinitialize: true,
        validationSchema: uploadNftSchema,
        onSubmit: async (values) => {
            let checkFiles;
            values.images.length > 0 &&
                values.images.map((image) => {
                    if (
                        image.image.name.split('.').pop() == 'jpg' ||
                        image.image.name.split('.').pop() == 'jpeg' ||
                        image.image.name.split('.').pop() == 'png' ||
                        image.image.name.split('.').pop() == 'gif'
                    ) {
                        checkFiles = true;
                    } else {
                        checkFiles = false;
                    }
                });
            let filesArray =
                values.images.length > 0 &&
                values.images.map((image) => {
                    return image.image;
                });

            let quantityCounter = 0;
            let quantityValidator = true;
            let quantityArray =
                values.images.length > 0 &&
                values.images.map((image) => {
                    if (image.quantity < 1) {
                        toast.error('NFT Quantity must be greater than zero');
                        quantityValidator = false;
                    } else {
                        if (image.quantity < 1) {
                            toast.error('NFT Quantity must be greater than zero');
                            quantityValidator = false;
                        } else {
                            quantityCounter = parseInt(quantityCounter) + parseInt(image.quantity);
                            return parseInt(image.quantity);
                        }
                    }
                });

            if (quantityValidator) {
                if (checkFiles) {
                    setLoader(true);
                    dispatch(
                        addNft({
                            assets: filesArray,
                            quantityArray: quantityArray,
                            brandId: brand,
                            categoryId: category,
                            subCategoryId: subCategory,
                            navigate: navigate,
                            setLoader: setLoader,
                            handleClose: handleClose
                        })
                    );
                } else {
                    toast.error('Upload the files with these extensions: PNG, JPG, GIF');
                }
            }
        }
    });
    console.log(formik.values);
    const hasFile = formik.values.images.length > 0;
    const [uploadedImages, setUploadedImages] = useState([]);
    const handleDrop = useCallback(
        (acceptedFiles) => {
            let newUploadedImages = [...uploadedImages];
            acceptedFiles.map(async (acceptedFile) => {
                let data = { image: acceptedFile, quantity: 1 };
                newUploadedImages = [...newUploadedImages, data];
            });
            formik.setFieldValue('images', newUploadedImages);
            setUploadedImages(newUploadedImages);
        },

        [formik.setFieldValue, uploadedImages]
    );
    const handleRemoveFile = (file, index) => {
        const newFiles = [...formik.values.images];
        newFiles.splice(index, 1);
        setUploadedImages(newFiles);
        formik.setFieldValue('images', newFiles);
    };
    const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
        accept: '.jpeg,.png,.jpg,.gif',
        onDrop: handleDrop
    });

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleSubCategoryChange = (event) => {
        setSubCategory(event.target.value);
    };
    useEffect(() => {
        dispatch(getAllBrandList());
    }, []);
    useEffect(() => {
        dispatch(
            getAllCategoriesByBrand({
                brandId: brand
            })
        );
    }, [brand]);
    useEffect(() => {
        dispatch(
            getAllSubCategoriesByBrandAndCategory({
                categoryId: category
            })
        );
    }, [category]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <MainCard
                title={
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="h3" sx={{ fontWeight: 500, color: 'cadetblue', paddingTop: '10px' }}>
                                Add NFT
                            </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'end' }}>
                            <Button variant="contained" size="small" onClick={() => navigate(-1)} sx={{ marginRight: '10px' }}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent="center" style={{ padding: '20px' }}>
                        <Grid item xs={12} sm={4} pt={4} pr={4}>
                            <TextField
                                className="brandSelectField"
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
                        <Grid item xs={12} sm={4} pt={4} pr={4}>
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
                        <Grid item xs={12} sm={4} pt={4} pr={4}>
                            <TextField
                                className="selectField"
                                id="outlined-select-budget"
                                select
                                fullWidth
                                label="Select Subcategory"
                                value={subCategory}
                                onChange={handleSubCategoryChange}
                            >
                                <MenuItem value={0}>Choose Subcategory</MenuItem>
                                {subCategoryArray &&
                                    subCategoryArray.subCategoriesList &&
                                    subCategoryArray.subCategoriesList.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>

                        <Grid item lg={12} mt={3}>
                            <div className={clsx('dropZoneContainer', 'xyz')}>
                                <div
                                    className={clsx('dropZone', {
                                        isDragActive: isDragActive,
                                        isDragAccept: isDragAccept,
                                        isDragReject: isDragReject
                                    })}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />

                                    <Grid container direction="column">
                                        <Box textAlign="center" component="img" alt="Select File" src={UploadImage} sx={{ height: 60 }} />

                                        <Box mt={4} textAlign="center" sx={{ ml: { md: 0 } }}>
                                            <Typography variant="subtitle" sx={{ color: 'grey', textAlign: 'center' }}>
                                                Drop your image or&nbsp;
                                                <Link underline="always">browse</Link>.&nbsp;
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </div>

                                <List disablePadding className={clsx({ list: hasFile })}>
                                    <AnimatePresence>
                                        {formik.values.images &&
                                            formik.values.images.map((file, index) => (
                                                <ListItem key={file.image.name} component={motion.div} className="listItem">
                                                    <ListItemIcon>
                                                        {/* <Icon icon={fileFill} width={32} height={32} /> */}
                                                        <img
                                                            src={URL.createObjectURL(file.image)}
                                                            width={40}
                                                            height={40}
                                                            style={{ borderRadius: '50%', marginRight: '8px' }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={file.image.name ? file.image.name : ''}
                                                        secondary={fData(file.image.size) ? fData(file.image.size) : ''}
                                                        primaryTypographyProps={{
                                                            variant: 'subtitle2'
                                                        }}
                                                    />
                                                    <ListItemSecondaryAction style={{ display: 'flex' }}>
                                                        <QuantitySelector formik={formik} fileArray={formik.values.images} index={index} />

                                                        <IconButton
                                                            color="error"
                                                            edge="end"
                                                            size="small"
                                                            onClick={() => handleRemoveFile(file.image, index)}
                                                        >
                                                            <Icon icon={closeFill} width={28} height={28} />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                    </AnimatePresence>
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid textAlign="center" padding={2}>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {
                                if (!loader) {
                                    formik.handleSubmit();
                                }
                            }}
                        >
                            {loader ? (
                                <Oval
                                    ariaLabel="loading-indicator"
                                    height={20}
                                    width={20}
                                    strokeWidth={5}
                                    strokeWidthSecondary={1}
                                    color="blue"
                                    secondaryColor="white"
                                />
                            ) : (
                                'Add NFT'
                            )}
                        </Button>
                    </Grid>
                </form>
            </MainCard>
        </>
    );
};

export default AddNft;
