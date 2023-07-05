import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Grid } from '@mui/material';
import { transferNft } from 'redux/nft/actions';
import MarketplaceAbi from '../../../../../contractAbi/KwikTrustMarketplace.json';
import MarketplaceAddress from '../../../../../contractAbi/KwikTrustMarketplace-address.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function NftAuctionDialog({ open, setOpen, brand, category, subCategory, type, page, limit, checkedArray }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.auth.walletAddress);
    const handleTranfer = async (tokenIdArray, nftIdArray) => {
        console.log('MarketplaceAddress.address', MarketplaceAddress.address);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
        let transfered = false;
        if (tokenIdArray.length == 1) {
            console.log('address 1', address);

            let tokenId = tokenIdArray[0];
            console.log('tokenId 1', tokenId);
            try {
                const tx = await (await marketplace.transferNft(address, tokenId)).wait();
                if (tx.events) {
                    toast.success('NFT transfer successfully');
                    transfered = true;
                }
            } catch (error) {
                toast.error(error.reason);
                handleClose()
            }
        } else {
            console.log('address 2', address);
            console.log('tokenIdArray 2', tokenIdArray);
            try {
                const tx = await (await marketplace.transferNftBunch(address, tokenIdArray)).wait();
                if (tx.events) {
                    toast.success('NFT transfer successfully');
                    transfered = true;
                } else {
                    toast.error('Transaction Failed');
                }
            } catch (error) {
                toast.error(error.reason);
                handleClose()
            }
        }

        if (transfered) {
            dispatch(
                transferNft({
                    nftIdArray: nftIdArray,
                    page: page,
                    limit: limit,
                    type: type,
                    brand: brand,
                    category: category,
                    subCategory: subCategory,
                    handleClose: handleClose
                })
            );
        }
    };
    const initialValues = {
        price: 0
        // endTime: new Date(new Date().getTime() + 725 * 60000)
    };
    const validationSchema = Yup.object({
        price: Yup.number()
            .min(0.0001, 'Price must be greater than 0.0001')
            .required('Price is required')
            .typeError('Enter price correctly'),
        endTime: Yup.mixed()
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log('values', formik.values);
            console.log('checkedArray', checkedArray);
            let tokenIdArray = [];
            let nftIdArray = [];
            checkedArray.map((item) => {
                nftIdArray.push(item.nftId);
                item.tokenIds.map((token) => {
                    tokenIdArray.push(token);
                });
            });
            if (walletAddress == undefined) {
                handleClose();
                toast.error('Connect Metamask');
            } else {
                handleTranfer(tokenIdArray, nftIdArray);
            }
        }
    });
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    return (
        <>
            <Dialog
                className="brandDialog"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">Set NFT for auction</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid display="flex">
                            <Grid item xs={3} pt={4} pr={3}>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Enter Base Price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={9} pt={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                                        label="Auction End Time"
                                        minDateTime={formik.values.endTime}
                                        value={formik.values.endTime}
                                        onChange={(newValue) => {
                                            formik.setFieldValue('endTime', newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
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
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
