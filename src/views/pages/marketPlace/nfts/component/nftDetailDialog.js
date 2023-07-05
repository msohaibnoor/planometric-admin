import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Grid, Typography, Tooltip, Link } from '@mui/material';
import moment from 'moment';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function NftDetailDialog({ open, setOpen, nftDetails }) {
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
                        console.log('nftDetails', nftDetails);
                    }}
                >
                    NFT Metadata
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item lg={4} className="optionImageContainer">
                            <img
                                src={nftDetails && nftDetails.asset}
                                alt="NFT Image"
                                className="imageSize"
                                onClick={() => {
                                    window.open(nftDetails && nftDetails.ipfsUrl);
                                }}
                            />
                        </Grid>
                        <Grid item lg={8}>
                            <Grid container>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Name :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.name}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Project Name:
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    KwikTrust
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Description :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.description}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Brand :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.Brand?.name}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Category :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.Category?.name}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Subcategory :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.SubCategory?.name}
                                </Grid>
                            </Grid>
                            {/* <hr /> */}
                            {nftDetails.mintType !== null ? (
                                <>
                                    <Grid container mt={2}>
                                        <Grid item lg={4} textAlign="center">
                                            <Typography fontSize={18} variant="h5">
                                                Token URI :{' '}
                                            </Typography>
                                        </Grid>
                                        <Tooltip placement="top" title={nftDetails && nftDetails.tokenUri}>
                                            <Grid item lg={8} mt={-0.5} className="customLink">
                                                <Button
                                                    variant="text"
                                                    color="primary"
                                                    sx={{ marginRight: '5px' }}
                                                    onClick={() => {
                                                        window.open(nftDetails && nftDetails.tokenUri);
                                                    }}
                                                >
                                                    <Typography style={{ textDecoration: 'underline' }}> KwikTrust SuperNFT</Typography>
                                                </Button>
                                            </Grid>
                                        </Tooltip>
                                    </Grid>
                                    <Grid container mt={2}>
                                        <Grid item lg={4} textAlign="center">
                                            <Typography fontSize={18} variant="h5">
                                                {nftDetails.mintType == 'lazyMint' ? ' Signature' : ' Transaction Hash'} :
                                            </Typography>
                                        </Grid>
                                        <Tooltip
                                            placement="top"
                                            title={
                                                nftDetails.mintType == 'lazyMint'
                                                    ? nftDetails && nftDetails?.NftTokens[0]?.signature
                                                    : nftDetails && nftDetails.transactionHash
                                            }
                                        >
                                            <Grid item lg={8} mt={0.3} className="customLink">
                                                {nftDetails.mintType == 'lazyMint' ? (
                                                    nftDetails && nftDetails?.NftTokens[0]?.signature
                                                ) : (
                                                    <Link href={nftDetails && nftDetails.transactionHash} underline="hover" target="_blank">
                                                        {nftDetails && nftDetails.transactionHash}
                                                    </Link>
                                                )}
                                            </Grid>
                                        </Tooltip>
                                    </Grid>

                                    <Grid container mt={2}>
                                        <Grid item lg={4} textAlign="center">
                                            <Typography fontSize={18} variant="h5">
                                                Contract Address :
                                            </Typography>
                                        </Grid>
                                        <Tooltip
                                            placement="top"
                                            title={'https://polygonscan.com/address/' + nftDetails?.Brand?.contractAddress}
                                        >
                                            <Grid item lg={8} mt={0.3} className="customLink">
                                                <Link
                                                    href={'https://polygonscan.com/address/' + nftDetails?.Brand?.contractAddress}
                                                    underline="hover"
                                                    target="_blank"
                                                >
                                                    {'https://polygonscan.com/address/' + nftDetails?.Brand?.contractAddress}
                                                </Link>
                                            </Grid>
                                        </Tooltip>
                                    </Grid>

                                    <Grid container mt={2}>
                                        <Grid item lg={4} textAlign="center">
                                            <Typography fontSize={18} variant="h5">
                                                {nftDetails.mintType == 'lazyMint' ? "Signer's Address" : "Creator's Address"}:{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={8} mt={0.3}>
                                            {nftDetails && nftDetails.signerAddress}
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <></>
                            )}

                            {/* <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Owner Address :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.transactionHash }
                                </Grid>
                            </Grid> */}
                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography
                                        fontSize={18}
                                        variant="h5"
                                        onClick={() => {
                                            console.log('nftDetails.mintType', nftDetails.mintType);
                                        }}
                                    >
                                        Mint Type :
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails &&
                                    nftDetails?.mintType &&
                                    nftDetails?.mintType !== null &&
                                    nftDetails?.mintType == 'directMint'
                                        ? 'Direct Mint'
                                        : nftDetails?.mintType == 'lazyMint'
                                        ? 'Lazy Mint'
                                        : 'Ready To Mint'}
                                </Grid>
                            </Grid>
                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Price :
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.price} {nftDetails && nftDetails.currencyType}
                                </Grid>
                            </Grid>

                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Quantity :
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} mt={0.3}>
                                    {nftDetails && nftDetails.NftTokens?.length}
                                </Grid>
                            </Grid>
                            <Grid container mt={2}>
                                <Grid item lg={4} textAlign="center">
                                    <Typography fontSize={18} variant="h5">
                                        Status :{' '}
                                    </Typography>
                                </Grid>
                                <Grid item lg={8}>
                                    {nftDetails &&
                                        (nftDetails.isActive && nftDetails.mintType !== null ? 'Visible on market place' : 'InActive')}
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
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
