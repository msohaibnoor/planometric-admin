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
import { ethers, providers } from 'ethers';
import MarketplaceAbi from '../../../../../contractAbi/KwikTrustMarketplace.json';
import MarketplaceAddress from '../../../../../contractAbi/KwikTrustMarketplace-address.json';
import NFTAbi from '../../../../../contractAbi/KwikTrustNFT.json';
import NFTAddress from '../../../../../contractAbi/NFT-address.json';
import { mintNft, lazyMintNft } from 'redux/nft/actions';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
const projectId = '2DTzPWLbFhEcwsNVZSEnG7WOFfA';
const projectSecret = 'ab50ee28a53e37298f049068d200875c';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
});

export default function BunchMintNftDialog({
    open,
    setOpen,
    nftData,
    brandId,
    categoryId,
    subCategoryId,
    type,
    loader,
    setLoader,
    page,
    limit
}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.auth.walletAddress);
    const [valueLabel, setValueLabel] = useState('lazyMint');
    const handleClose = () => {
        setLoader(false);
        setOpen(false);
    };

    const signerAddr = '0xBF09EE4E0F90EE3081Abe249f39a24b46298EFcf';

    const handleLazyBunchMint = async (nftData) => {
        setLoader(true);
        if (walletAddress == undefined) {
            setOpen(false);
            toast.error('Connect Metamask');
        } else {
            let contractAddress = nftData && nftData[0] && nftData[0].contractAddress;
            let priceNft = nftData && nftData[0] && nftData[0].price;
            let token = '0x60E6895184448f3e8EF509D083e3cC3AC31F82Fd';

            let nftDataArray = [];
            let tokenIdArray = [];
            for (let i = 0; i < nftData.length; i++) {
                let data = nftData[i];
                let projectName = ' KwikTrust';
                let mintedDate = new Date().valueOf();
                const attributes = [
                    {
                        trait_type: 'Project Name',
                        value: projectName
                    },
                    {
                        trait_type: 'Brand',
                        value: data.Brand.name
                    },
                    {
                        trait_type: 'Category',
                        value: data.Category.name
                    },
                    {
                        trait_type: 'Subcategory',
                        value: data.SubCategory.name
                    },
                    {
                        trait_type: 'Contract Address',
                        value: data.contractAddress
                    },
                    {
                        trait_type: "Signer's Address",
                        value: signerAddr
                    },
                    {
                        trait_type: 'Price',
                        value: data.price
                    }
                ];
                const result = await client.add(
                    JSON.stringify({
                        image: data.ipfsUrl,
                        name: data.name,
                        description: data.description,
                        attributes,
                        mintedDate
                    })
                );

                const uri = `https://kwiktrust.infura-ipfs.io/ipfs/${result.path}`;
                //
                const signingDomain = async () => {
                    const domain = {
                        name: 'KwikTrust-Voucher',
                        version: '1',
                        verifyingContract: contractAddress,
                        chainId: 137
                    };
                    return domain;
                };

                const domain = await signingDomain();

                const types = {
                    NFTVoucher: [
                        { name: 'uri', type: 'string' },
                        { name: 'price', type: 'uint256' },
                        { name: 'token', type: 'address' }
                    ]
                };
                const prices = ethers.utils.parseEther(priceNft.toString());

                const voucher = {
                    uri,
                    price: prices,
                    token
                };
                //

                const privateKey = '11aa78f2b32af7dc6c5933157e1144eca14306f9d18a7371eb4c24fef14d57d6';
                const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.infura.io');
                const signer = new ethers.Wallet(privateKey, provider);
                const signature = await signer._signTypedData(domain, types, voucher);
                nftDataArray.push({
                    nftId: data.id,
                    tokenUri: uri,
                    tokenPrice: prices.toString(),
                    signerAddress: signerAddr.toLowerCase() // save wallet address
                });
                // console.log('tokenUri', uri);
                // console.log('tokenPrice', price.toString());
                // console.log('signerAddress', walletAddress);
                // console.log('signature', signature);

                for (let j = 0; j < data.NftTokens.length; j++) {
                    let tokenData = data.NftTokens[j];
                    // console.log('token', token);
                    tokenIdArray.push({
                        id: tokenData.id,
                        signature: signature,
                        erc20Address: token
                    });
                }
            }

            console.log('nftDataArray', nftDataArray);
            console.log('tokenIdArray', tokenIdArray);

            dispatch(
                lazyMintNft({
                    nftDataArray: nftDataArray,
                    tokenIdArray: tokenIdArray,
                    brandId: brandId,
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    type: type,
                    page: page,
                    limit: limit,
                    handleClose: handleClose
                })
            );
        }
    };

    const handleDirectBunchMint = async (nftData) => {
        setLoader(true);

        if (walletAddress == undefined) {
            setOpen(false);
            setLoader(false);
            toast.error('Connect Metamask');
        } else {
            let uriArray = [];
            let nftDataArray = [];
            console.log('nftData', nftData);
            let contractAddress = nftData && nftData[0] && nftData[0].contractAddress;
            console.log('contractAddress', contractAddress);

            for (let i = 0; i < nftData.length; i++) {
                let data = nftData[i];
                let projectName = ' KwikTrust';
                let mintedDate = new Date().valueOf();
                const attributes = [
                    {
                        trait_type: 'Project Name',
                        value: projectName
                    },
                    {
                        trait_type: 'Brand',
                        value: data.Brand.name
                    },
                    {
                        trait_type: 'Category',
                        value: data.Category.name
                    },
                    {
                        trait_type: 'Subcategory',
                        value: data.SubCategory.name
                    },
                    {
                        trait_type: 'Contract Address',
                        value: data.contractAddress
                    },
                    {
                        trait_type: "Signer's Address",
                        value: signerAddr
                    },
                    {
                        trait_type: 'Price',
                        value: data.price
                    }
                ];
                const result = await client.add(
                    JSON.stringify({
                        image: data.ipfsUrl,
                        name: data.name,
                        description: data.description,
                        attributes,
                        mintedDate
                    })
                );
                let tokenUri = `https://kwiktrust.infura-ipfs.io/ipfs/${result.path}`;
                nftDataArray.push({
                    nftId: data.id,
                    tokenUri: tokenUri
                });
                for (let j = 0; j < data.NftTokens.length; j++) {
                    const uri = `https://kwiktrust.infura-ipfs.io/ipfs/${result.path}`;
                    uriArray.push(uri);
                }
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const nft = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
            let tokenIdArray = [];
            try {
                let mintedNFT = await (
                    await nft.bulkMint(uriArray, MarketplaceAddress.address).catch((error) => {
                        toast.error('NFT minting  unsuccessfull');
                        setLoader(false);
                    })
                ).wait();
                if (mintedNFT.events) {
                    console.log('mintedNft of clone', mintedNFT.events);
                    let transactionHash = `https://polygonscan.com/tx/${mintedNFT.transactionHash}`;
                    console.log('transactionHash?>>>>>>>>>>>>>>>>', transactionHash);
                    let counter = 0;
                    let myNftTokenIdArray = [];
                    for (let i = 0; i < uriArray.length; i++) {
                        myNftTokenIdArray.push(mintedNFT.events[counter].args[2].toString());
                        console.log('mintedNft of clone', mintedNFT.events[counter].args[2].toString());
                        counter = counter + 2;
                    }
                    console.log('myNftTokenIdArray', myNftTokenIdArray);

                    let indexCounter = 0;
                    nftData.map((data) => {
                        data.NftTokens.map((nftToken) => {
                            tokenIdArray.push({
                                id: nftToken.id,
                                tokenId: myNftTokenIdArray[indexCounter]
                            });
                            indexCounter = indexCounter + 1;
                        });
                    });
                    console.log('nftDataArray to be sent to backend', nftDataArray);
                    console.log('tokenArray to be sent to backend', tokenIdArray);

                    dispatch(
                        mintNft({
                            nftDataArray: nftDataArray,
                            tokenIdArray: tokenIdArray,
                            transactionHash: transactionHash,
                            signerAddress: address,
                            brandId: brandId,
                            categoryId: categoryId,
                            subCategoryId: subCategoryId,
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
                handleClose();
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
                <DialogTitle id="alert-dialog-slide-title1">Bulk Mint NFT</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    value={valueLabel}
                                    onChange={(e) => setValueLabel(e.target.value)}
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="lazyMint" control={<Radio />} label="Lazy Mint" />
                                    <FormControlLabel value="directMint" control={<Radio />} label="Mint" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
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
                                onClick={handleClose}
                                color="secondary"
                            >
                                No
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    if (nftData.length > 0) {
                                        if (!loader) {
                                            if (valueLabel == 'lazyMint') {
                                                handleLazyBunchMint(nftData);
                                            } else {
                                                handleDirectBunchMint(nftData);
                                            }
                                        }
                                    } else {
                                        toast.error("There are no NFT's that can be minted");
                                    }
                                }}
                            >
                                Yes
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
