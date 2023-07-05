import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
    Grid,
    Radio,
    FormControl,
    RadioGroup,
    FormControlLabel
} from '@mui/material';
import { Oval } from 'react-loader-spinner';
// animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { ethers } from 'ethers';
import MarketplaceAbi from '../../../../../contractAbi/KwikTrustMarketplace.json';
import MarketplaceAddress from '../../../../../contractAbi/KwikTrustMarketplace-address.json';
import NFTAbi from '../../../../../contractAbi/KwikTrustNFT.json';
import NFTAddress from '../../../../../contractAbi/NFT-address.json';
import { listNftOnMarketPlace } from 'redux/nft/actions';

export default function BunchListOnMarketPlaceDialog({
    open,
    setOpen,
    brandId,
    categoryId,
    subCategoryId,
    type,
    page,
    limit,
    nftList,
    loader,
    setLoader,
    checkedArray,
    // listingPrice,
    setCheckedArray,
    setShowCheckBox
}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.auth.walletAddress);
    const handleClose = () => {
        setLoader(false);
        setOpen(false);
        // setCheckedArray([]);
        // setShowCheckBox(false);
    };

    const listOnMarketPlace = async () => {
        // let tokenType = nftList[0].currencyType;
        // console.log('tokenType', tokenType);
        // if (tokenType == 'KTX') {
        //     tokenAddress = ' ';
        // }

        console.log('nftList', nftList);
        let contractAddress = nftList[0].Brand.contractAddress;
        let tokenAddress = '0x60E6895184448f3e8EF509D083e3cC3AC31F82Fd';
        let nftIdArray = [];
        let marketPlaceIds = [];
        nftList.map((item) => {
            nftIdArray.push(item.id);
            item.NftTokens.map((token) => {
                marketPlaceIds.push(token.tokenId);
            });
        });

        let listingPrice = nftList[0].price;
        console.log('marketPlaceIds', marketPlaceIds);
        console.log('nftIdArray', nftIdArray);
        console.log('listingPrice', listingPrice);
        console.log('contractAddress ', contractAddress);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
        if (marketPlaceIds.length > 1) {
            const price = ethers.utils.parseEther(listingPrice.toString());
            try {
                const tx = await (
                    await marketplace.makeItemBulk(tokenAddress, marketPlaceIds, contractAddress, price)).wait();
                if (tx.events) {
                    dispatch(
                        listNftOnMarketPlace({
                            nftIdArray: nftIdArray,
                            brand: brandId,
                            category: categoryId,
                            subCategory: subCategoryId,
                            type: type,
                            page: page,
                            limit: limit,
                            handleClose: handleClose
                        })
                    );
                } else {
                    toast.error('Transcation Failed');
                }
            } catch (error) {
                toast.error(error.reason);
                handleClose()
            }
        } else if (marketPlaceIds.length == 1) {
            let id = marketPlaceIds[0];
            const price = ethers.utils.parseEther(listingPrice.toString());
            try {
                const tx = await (await marketplace.makeItem(tokenAddress, id, contractAddress, price)).wait();
                if (tx.events) {
                    dispatch(
                        listNftOnMarketPlace({
                            nftIdArray: nftIdArray,
                            brand: brandId,
                            category: categoryId,
                            subCategory: subCategoryId,
                            type: type,
                            page: page,
                            limit: limit,
                            handleClose: handleClose
                        })
                    );
                } else {
                    toast.error('Transcation Failed');
                }
            } catch (error) {
                toast.error(error.reason);
                handleClose()
            }
        }
    };

    return (
        <>
            <Dialog
                className="responsiveDialog"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1">List on Marketplace</DialogTitle>
                <DialogContent>Are you sure you want to list All NFT's of this subcategory on Marketplace?</DialogContent>

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
                                onClick={handleClose}
                                color="secondary"
                            >
                                No
                            </Button>

                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    if (nftList.length < 1) {
                                        toast.error("No NFT's available to be sent to marketplace");
                                    } else {
                                        if (!loader) {
                                            if (walletAddress == undefined) {
                                                setOpen(false);
                                                toast.error('Connect Metamask');
                                            } else {
                                                listOnMarketPlace();
                                                setLoader(true);
                                            }
                                        }
                                    }
                                }}
                            >
                                {' '}
                                Yes
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
