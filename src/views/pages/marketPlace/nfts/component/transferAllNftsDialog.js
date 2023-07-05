import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, MenuItem } from '@mui/material';
import { transferNft } from 'redux/nft/actions';
import MarketplaceAbi from '../../../../../contractAbi/KwikTrustMarketplace.json';
import MarketplaceAddress from '../../../../../contractAbi/KwikTrustMarketplace-address.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function TransferAllNftsDialog({
    open,
    setOpen,
    brand,
    category,
    subCategory,
    type,
    page,
    limit,
    nftList,
    loader,
    setLoader
}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.auth.walletAddress);
    const handleTranfer = async (tokenIdArray, nftIdArray) => {
        console.log('Brand contract address', nftList[0].Brand.contractAddress);
        let contractAddress = nftList[0].Brand.contractAddress;
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
                const tx = await (await marketplace.transferNft(address, tokenId, contractAddress)).wait();
                if (tx.events) {
                    toast.success('NFT transfer successfully');
                    transfered = true;
                }
            } catch (error) {
                toast.error(error.reason);
                handleClose()
                setLoader(false);
            }
        } else {
            console.log('address 2', address);
            console.log('tokenIdArray 2', tokenIdArray);
            try {
                const tx = await (await marketplace.transferNftBunch(address, tokenId, contractAddress)).wait();
                if (tx.events) {
                    toast.success('NFT transfer successfully');
                    transfered = true;
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
    const validationSchema = Yup.object({
        walletAddress: Yup.string()
            .required('Wallet Address is required!')
            .min(42, 'Invalid Wallet Address')
            .max(42, 'Invalid Wallet Address')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            walletAddress: ''
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('values', formik.values);
            console.log('nftList', nftList);
            setLoader(true);
            let tokenIdArray = [];
            let nftIdArray = [];

            nftList.map((item) => {
                nftIdArray.push(item.id);
                item.NftTokens.map((token) => {
                    tokenIdArray.push(token.tokenId);
                });
            });
            console.log('tokenIdArray', tokenIdArray);
            console.log('nftIdArray', nftIdArray);

            if (walletAddress == undefined) {
                handleClose();
                toast.error('Connect Metamask');
                setLoader(false);
            } else {
                handleTranfer(tokenIdArray, nftIdArray);
            }
        }
    });
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setLoader(false);
    };

    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">Transfer All Nfts</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{ marginTop: '25px' }}
                            id="walletAddress"
                            name="walletAddress"
                            label="Enter Wallet Address"
                            value={formik.values.walletAddress}
                            onChange={formik.handleChange}
                            error={formik.touched.walletAddress && Boolean(formik.errors.walletAddress)}
                            helperText={formik.touched.walletAddress && formik.errors.walletAddress}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </form>
                </DialogContent>

                <DialogActions sx={{ pr: 2.5 }}>
                    {loader ? (
                        <Button variant="contained" size="small">
                            <Oval
                                ariaLabel="loading-indicator"
                                height={20}
                                width={20}
                                strokeWidth={5}
                                strokeWidthSecondary={1}
                                color="blue"
                                secondaryColor="white"
                            />
                        </Button>
                    ) : (
                        <>
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
                                    if (nftList.length < 1) {
                                        toast.error("No NFT's available to transfer");
                                    } else {
                                        formik.handleSubmit();
                                    }
                                }}
                            >
                                Transfer All
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
