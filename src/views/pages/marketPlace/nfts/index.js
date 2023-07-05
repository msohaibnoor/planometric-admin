import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
    Grid,
    Button,
    Pagination,
    Menu,
    MenuItem,
    Typography,
    Card,
    Box,
    TextField,
    ButtonBase,
    Drawer,
    useMediaQuery,
    Link,
    IconButton,
    Tooltip
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MainCard from 'ui-component/cards/MainCard';
import { getAllBrandList, getAllCategoriesByBrand, getAllSubCategoriesByBrandAndCategory } from '../../../../redux/marketPlace/actions';
import {
    getAllNft,
    getAllNftForBunchMint,
    getAllNftForBunchTransfer,
    getAllNftForBunchListing,
    listNftOnMarketPlace
} from '../../../../redux/nft/actions';
import NftCard from './component/nftCard';
import BunchMintNftDialog from './component/bunchMintNftDialog';
import TransferNftsDialog from './component/transferNftsDialog';
import TransferAllNftsDialog from './component/transferAllNftsDialog';
import ListOnMarketPlaceDialog from './component/listOnMarketPlaceDialog';
import BunchListOnMarketPlaceDialog from './component/bunchListOnMarketPlaceDialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { appDrawerWidth, gridSpacing } from 'store/constant';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NftFilter from './nftFilter';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -appDrawerWidth,
    [theme.breakpoints.down('xl')]: {
        paddingRight: 0,
        marginRight: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    })
}));

const MarketPlace = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const [open, setOpen] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false);
    const [openBunchMint, setBunchMintOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [type, setType] = useState('all');
    const nftList = useSelector((state) => state.nft.nftList);
    const nftListForBunchMint = useSelector((state) => state.nft.nftListForBunchMint);
    const nftListForBunchTransfer = useSelector((state) => state.nft.nftListForBunchTransfer);
    const nftListForBunchListing = useSelector((state) => state.nft.nftListForBunchListing);
    const brandArray = useSelector((state) => state.marketPlace.brandArray);
    const categoryArray = useSelector((state) => state.marketPlace.categoryArray);
    const subCategoryArray = useSelector((state) => state.marketPlace.subCategoryArray);
    const [brand, setBrand] = useState(0);
    const [category, setCategory] = useState(0);
    const [subCategory, setSubCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [mintingStatus, setMintingStatus] = useState('completed');
    const [transferOpen, setTransferOpen] = useState(false);
    const [openListOnMarketPlace, setListOnMarketPlaceOpen] = useState(false);
    const [listingPrice, setListingPrice] = useState(null);
    const [listNftsOnMarketplace, setListNftsOnMarketplace] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleType = (event) => {
        console.log({ event });
        setType(event);
        setBrand(0);
        setCategory(0);
        setSubCategory(0);
        setPage(1);
        setShowCheckBox(false);
        setCheckedArray([]);
    };

    const handleBrandChange = (event) => {
        setBrand(event);
        setCategory(0);
        setSubCategory(0);
        setPage(1);
        setCheckedArray([]);
        setShowCheckBox(false);
    };
    const handleCategoryChange = (event) => {
        setCategory(event);
        setPage(1);
        setSubCategory(0);
        setCheckedArray([]);
        setShowCheckBox(false);
    };
    const handleSubCategoryChange = (event) => {
        setSubCategory(event);
        setPage(1);
        setCheckedArray([]);
        setShowCheckBox(false);
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
        dispatch(
            getAllNft({
                brandId: brand,
                categoryId: category,
                subCategoryId: subCategory,
                type: type,
                page: page,
                limit: limit
            })
        );
    }, [brand, category, subCategory, type, page, limit]);

    const handleDrawerOpen = () => {
        setOpen((prevState) => !prevState);
    };

    const [checkedArray, setCheckedArray] = useState([]);
    const handleCheckBox = (data) => {
        let selectedIndex = -1;
        checkedArray.map((item, index) => {
            if (item.nftId == data.nftId) {
                selectedIndex = index;
            }
        });

        let newSelected = [...checkedArray];
        if (selectedIndex === -1) {
            newSelected.push(data);
        } else {
            newSelected.splice(selectedIndex, 1);
        }
        console.log('new selected Array', newSelected);
        setCheckedArray(newSelected);
    };

    useEffect(() => {
        console.log('Type', type);
        console.log('subCategory', subCategory);
        if ((type == 'marketPlace' || type == 'directMint') && subCategory !== 0) {
            console.log('yaaaaaaaaaaaaaaaaaaaaayyy');
            setShowCheckBox(true);
        }
    }, [type, subCategory]);

    const [transferAllOpen, setTransferAllOpen] = useState(false);
    const [listingAllOpen, setListingAllOpen] = useState(false);
    console.log('nftListForBunchListing', nftListForBunchListing);
    return (
        <>
            <BunchListOnMarketPlaceDialog
                nftList={nftListForBunchListing}
                open={listingAllOpen}
                setOpen={setListingAllOpen}
                brandId={brand}
                categoryId={category}
                subCategoryId={subCategory}
                type={type}
                page={page}
                limit={limit}
                loader={loader}
                setLoader={setLoader}
            />
            <ListOnMarketPlaceDialog
                nftList={nftList && nftList.nfts && nftList.nfts.length > 0 && nftList.nfts}
                open={openListOnMarketPlace}
                setOpen={setListOnMarketPlaceOpen}
                brandId={brand}
                categoryId={category}
                subCategoryId={subCategory}
                type={type}
                page={page}
                limit={limit}
                checkedArray={checkedArray}
                listingPrice={listingPrice}
                loader={loader}
                setLoader={setLoader}
                setCheckedArray={setCheckedArray}
                setShowCheckBox={setShowCheckBox}
            />
            <TransferAllNftsDialog
                nftList={nftListForBunchTransfer}
                open={transferAllOpen}
                setOpen={setTransferAllOpen}
                brand={brand}
                category={category}
                subCategory={subCategory}
                type={type}
                page={page}
                limit={limit}
                loader={loader}
                setLoader={setLoader}
            />
            <TransferNftsDialog
                checkedArray={checkedArray}
                nftList={nftList && nftList.nfts && nftList.nfts.length > 0 && nftList.nfts}
                open={transferOpen}
                setOpen={setTransferOpen}
                brand={brand}
                category={category}
                subCategory={subCategory}
                type={type}
                page={page}
                limit={limit}
                loader={loader}
                setLoader={setLoader}
            />
            <BunchMintNftDialog
                open={openBunchMint}
                setOpen={setBunchMintOpen}
                nftData={nftListForBunchMint && nftListForBunchMint.nfts && nftListForBunchMint.nfts}
                brandId={brand}
                categoryId={category}
                subCategoryId={subCategory}
                type={type}
                loader={loader}
                setLoader={setLoader}
                mintingStatus={mintingStatus}
                setMintingStatus={setMintingStatus}
                page={page}
                limit={limit}
            />

            <MainCard
                className="yellow"
                style={{ marginBottom: '15px' }}
                title={
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="h3" sx={{ fontWeight: 500, color: 'cadetblue', paddingTop: '5px' }}>
                                NFT Management
                            </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'end' }}>
                            {type == 'readyToMint' && subCategory !== 0 && (
                                <Button
                                    size="small"
                                    sx={{
                                        marginRight: '10px',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        ':hover': {
                                            boxShadow: 'none'
                                        }
                                    }}
                                    variant="outlined"
                                    onClick={() => {
                                        dispatch(
                                            getAllNftForBunchMint({
                                                subCategoryId: subCategory
                                            })
                                        );
                                        setBunchMintOpen(true);
                                        setLoader(false);
                                    }}
                                >
                                    Bulk Mint NFT's
                                </Button>
                            )}

                            {type == 'directMint' && subCategory !== 0 && (
                                <>
                                    <Button
                                        size="small"
                                        sx={{
                                            marginRight: '10px',
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                            ':hover': {
                                                boxShadow: 'none'
                                            }
                                        }}
                                        variant="outlined"
                                        onClick={() => {
                                            if (checkedArray.length < 1) {
                                                toast.error("Kindly select the NFT's you want to list on market place firstly");
                                            } else {
                                                setListingPrice(nftList.nfts[0].price);
                                                setListOnMarketPlaceOpen(true);
                                            }

                                            setLoader(false);
                                        }}
                                    >
                                        List on MarketPlace
                                    </Button>
                                    <Button
                                        size="small"
                                        sx={{
                                            marginRight: '10px',
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                            ':hover': {
                                                boxShadow: 'none'
                                            }
                                        }}
                                        variant="outlined"
                                        onClick={() => {
                                            dispatch(
                                                getAllNftForBunchListing({
                                                    subCategoryId: subCategory
                                                })
                                            );
                                            setListingAllOpen(true);
                                            setLoader(false);
                                        }}
                                    >
                                        List All on MarketPlace
                                    </Button>
                                </>
                            )}
                            {type == 'marketPlace' && brand !== 0 && (
                                <>
                                    <Button
                                        size="small"
                                        sx={{
                                            marginRight: '10px',
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                            ':hover': {
                                                boxShadow: 'none'
                                            }
                                        }}
                                        variant="outlined"
                                        onClick={() => {
                                            if (checkedArray.length < 1) {
                                                toast.error("Kindly select the NFT's you want to transfer firstly");
                                            } else {
                                                setTransferOpen(true);
                                            }
                                        }}
                                    >
                                        Transfer NFT's
                                    </Button>
                                    <Button
                                        size="small"
                                        sx={{
                                            marginRight: '10px',
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                            ':hover': {
                                                boxShadow: 'none'
                                            }
                                        }}
                                        variant="outlined"
                                        onClick={() => {
                                            dispatch(
                                                getAllNftForBunchTransfer({
                                                    subCategoryId: subCategory
                                                })
                                            );
                                            setTransferAllOpen(true);
                                            setLoader(false);
                                        }}
                                    >
                                        Transfer All NFT's
                                    </Button>
                                </>
                            )}
                            {!open && subCategory === 0 && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                        setListNftsOnMarketplace(true);
                                        setOpen(true);
                                    }}
                                    sx={{ marginRight: '10px' }}
                                >
                                    List NFTS on marketplace
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    navigate('/marketPlace/addNft');
                                }}
                                sx={{ marginRight: '10px' }}
                            >
                                Add NFTS
                            </Button>
                            <ButtonBase disableRipple onClick={handleDrawerOpen}>
                                <FilterAltIcon sx={{ fontWeight: 500, color: 'secondary.200' }} />
                                <Typography variant="h5" sx={{ mt: 0.5, display: { xs: 'none', sm: 'block' } }}>
                                    Filter
                                </Typography>
                            </ButtonBase>
                            {open && (
                                <Tooltip placement="top" title="Clear all">
                                    <IconButton
                                        sx={{ marginLeft: '3px', marginBottom: '-5px' }}
                                        onClick={() => {
                                            setType('all');
                                            setBrand(0);
                                            setCategory(0);
                                            setSubCategory(0);
                                            setShowCheckBox(false);
                                            setCheckedArray([]);
                                            setListNftsOnMarketplace(false);
                                            setOpen(false);
                                        }}
                                    >
                                        <HighlightOffIcon sx={{ marginTop: '3px' }} color="error" />
                                    </IconButton>
                                </Tooltip>
                                // <Button
                                //             size="small"
                                //             sx={{
                                //                 marginLeft: '10px',
                                //                 marginTop: '5px',
                                //                 marginBottom: '5px',
                                //                 ':hover': {
                                //                     boxShadow: 'none'
                                //                 }
                                //             }}
                                //             variant="outlined"
                                //             onClick={() => {
                                //                 setType('all');
                                //                 setBrand(0);
                                //                 setCategory(0);
                                //                 setSubCategory(0);
                                //                 setShowCheckBox(false);
                                //                 setCheckedArray([]);
                                //                 setListNftsOnMarketplace(false)
                                //                 setOpen(false)
                                //             }}
                                //         >
                                //             Clear all
                                //         </Button>
                                // <div>
                                // </div>
                            )}
                        </Grid>
                    </Grid>
                }
                content={false}
            ></MainCard>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <Main open={open}>
                        {nftList && nftList.nfts && nftList.nfts.length > 0 ? (
                            <>
                                {' '}
                                <Grid container spacing={gridSpacing} mb={4} pl={2}>
                                    {nftList.nfts &&
                                        nftList.nfts.map((nft, index) => {
                                            let checked = false;
                                            let selectedIndex = -1;
                                            checkedArray.map((item, index) => {
                                                if (item.nftId == nft.id) {
                                                    selectedIndex = index;
                                                }
                                            });
                                            if (selectedIndex === -1) {
                                                checked = false;
                                            } else {
                                                checked = true;
                                            }

                                            return (
                                                <Grid key={index} item xs={12} sm={6} md={4} lg={open ? 4 : 3}>
                                                    <NftCard
                                                        nftData={nft}
                                                        showCheckBox={showCheckBox}
                                                        isChecked={checked}
                                                        handleCheckBox={handleCheckBox}
                                                        brandId={brand}
                                                        categoryId={category}
                                                        subCategoryId={subCategory}
                                                        type={type}
                                                        page={page}
                                                        limit={limit}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                </Grid>
                                <Grid item xs={12} sx={{ p: 3 }}>
                                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                        <Grid item>
                                            <Pagination
                                                page={page}
                                                color="primary"
                                                showFirstButton
                                                showLastButton
                                                count={nftList && nftList.pages}
                                                onChange={(event, newPage) => {
                                                    setPage(newPage);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                size="large"
                                                sx={{ color: theme.palette.grey[900] }}
                                                color="secondary"
                                                endIcon={<ExpandMoreRoundedIcon />}
                                                onClick={handleClick}
                                            >
                                                {limit} Rows
                                            </Button>
                                            <Menu
                                                id="menu-user-list-style1"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                                variant="selectedMenu"
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                                transformOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                            >
                                                <MenuItem
                                                    value={12}
                                                    onClick={(e) => {
                                                        setLimit(e.target.value);
                                                        setPage(1);
                                                        handleClose();
                                                    }}
                                                >
                                                    {' '}
                                                    12 Rows
                                                </MenuItem>
                                                <MenuItem
                                                    value={24}
                                                    onClick={(e) => {
                                                        setLimit(e.target.value);
                                                        setPage(1);
                                                        handleClose();
                                                    }}
                                                >
                                                    {' '}
                                                    24 Rows
                                                </MenuItem>
                                                <MenuItem
                                                    value={36}
                                                    onClick={(e) => {
                                                        setLimit(e.target.value);
                                                        setPage(1);
                                                        handleClose();
                                                    }}
                                                >
                                                    {' '}
                                                    36 Rows{' '}
                                                </MenuItem>
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item>
                                    <Typography style={{ padding: '20px' }}> No Data Available</Typography>
                                </Grid>
                            </>
                        )}
                    </Main>
                    <Drawer
                        sx={{
                            ml: open ? 3 : 0,
                            height: matchDownLG ? '100vh' : 'auto',
                            // height: matchDownLG ? '100vh' : '100vh',
                            flexShrink: 0,
                            zIndex: { xs: 1200, lg: open ? 0 : -1 },
                            overflowX: 'hidden',
                            width: appDrawerWidth,
                            '& .MuiDrawer-paper': {
                                height: 'auto',
                                width: appDrawerWidth,
                                position: matchDownLG ? 'fixed' : 'relative',
                                // position: 'fixed',
                                border: 'none',
                                borderRadius: matchDownLG ? 0 : `8px`,
                                mt: matchDownLG ? '80px' : '0px'
                            }
                        }}
                        variant={matchDownLG ? 'temporary' : 'persistent'}
                        // variant={'persistent'}
                        anchor="right"
                        open={open}
                        ModalProps={{ keepMounted: true }}
                        onClose={handleDrawerOpen}
                    >
                        <PerfectScrollbar component="div">
                            <NftFilter
                                type={type}
                                setType={setType}
                                brand={brand}
                                setBrand={setBrand}
                                brandArray={brandArray}
                                category={category}
                                setCategory={setCategory}
                                categoryArray={categoryArray}
                                subCategory={subCategory}
                                setSubCategory={setSubCategory}
                                subCategoryArray={subCategoryArray}
                                handleType={handleType}
                                listNftsOnMarketplace={listNftsOnMarketplace}
                                handleBrandChange={handleBrandChange}
                                handleCategoryChange={handleCategoryChange}
                                handleSubCategoryChange={handleSubCategoryChange}
                                setShowCheckBox={setShowCheckBox}
                                setCheckedArray={setCheckedArray}
                            />
                        </PerfectScrollbar>
                    </Drawer>
                </Box>
            </Grid>
        </>
    );
};

export default MarketPlace;
