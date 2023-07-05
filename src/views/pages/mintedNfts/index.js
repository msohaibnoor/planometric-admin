import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Typography, MenuItem, TextField, Pagination, Menu } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { getAllBrandList, getAllCategoriesByBrand, getAllSubCategoriesByBrandAndCategory } from '../../../redux/marketPlace/actions';
import { getAllMintedNft } from '../../../redux/mintedNft/actions';
import NftCard from './component/nftCard';
import { useLocation } from 'react-router-dom';

const typeArray = [
    {
        value: 'all',
        label: "All NFT'S"
    },
    {
        value: 'directMint',
        label: 'Minted NFTS'
    },
    {
        value: 'lazyMint',
        label: "Lazy Minted NFT'S"
    }
];

const MintedNfts = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [type, setType] = useState('all');
    const mintedNftList = useSelector((state) => state.mintedNft.mintedNftList);
    const brandArray = useSelector((state) => state.marketPlace.brandArray);
    const categoryArray = useSelector((state) => state.marketPlace.categoryArray);
    const subCategoryArray = useSelector((state) => state.marketPlace.subCategoryArray);
    const [brand, setBrand] = useState(0);
    const [category, setCategory] = useState(0);
    const [subCategory, setSubCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleType = (event) => {
        setType(event.target.value);
        setBrand(0);
        setCategory(0);
        setSubCategory(0);
        setPage(1);
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
        setCategory(0);
        setPage(1);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setSubCategory(0);
        setPage(1);
    };
    const handleSubCategoryChange = (event) => {
        setSubCategory(event.target.value);
        setPage(1);
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
            getAllMintedNft({
                brandId: brand,
                categoryId: category,
                subCategoryId: subCategory,
                type: type,
                page: page,
                limit: limit
            })
        );
    }, [brand, category, subCategory, type, page, limit]);
    return (
        <>
            <MainCard
                title={
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography variant="h3" sx={{ fontWeight: 500, color: 'cadetblue', paddingTop: '10px' }}>
                                Marketplace of KwikTrust Arena
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                className="selectField"
                                id="outlined-select-budget"
                                select
                                fullWidth
                                label="Select Type"
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
                        <Grid item xs={3}>
                            <TextField
                                className="selectField"
                                id="outlined-select-budget"
                                select
                                fullWidth
                                label="Select Brand"
                                value={brand}
                                onChange={handleBrandChange}
                            >
                                <MenuItem value={0}>All</MenuItem>
                                {brandArray &&
                                    brandArray.brandList &&
                                    brandArray.brandList.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={3}>
                            {brand !== 0 && (
                                <TextField
                                    className="selectField"
                                    id="outlined-select-budget"
                                    select
                                    fullWidth
                                    label="Select Category"
                                    value={category}
                                    onChange={handleCategoryChange}
                                >
                                    <MenuItem value={0}>All</MenuItem>
                                    {categoryArray &&
                                        categoryArray.categoryList &&
                                        categoryArray.categoryList.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            {category !== 0 && (
                                <TextField
                                    className="selectField"
                                    id="outlined-select-budget"
                                    select
                                    fullWidth
                                    label="Select Subcategory"
                                    value={subCategory}
                                    onChange={handleSubCategoryChange}
                                >
                                    <MenuItem value={0}>All</MenuItem>
                                    {subCategoryArray &&
                                        subCategoryArray.subCategoriesList &&
                                        subCategoryArray.subCategoriesList.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            )}
                        </Grid>
                        {type == 'readyToMint' && subCategory !== 0 && (
                            <Grid item xs={12} textAlign="end">
                                <Button
                                    sx={{
                                        marginRight: '10px',
                                        ':hover': {
                                            boxShadow: 'none'
                                        }
                                    }}
                                    variant="contained"
                                    onClick={() => {
                                        setBunchMintOpen(true);
                                    }}
                                >
                                    Bulk Mint NFT's
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                }
                content={false}
            ></MainCard>
            {mintedNftList && mintedNftList.nfts && mintedNftList.nfts.length > 0 ? (
                <>
                    {' '}
                    <Grid container spacing={gridSpacing} mt={4} mb={4} pl={2}>
                        {mintedNftList.nfts &&
                            mintedNftList.nfts.map((nft, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                        <NftCard
                                            nftData={nft}
                                            nftCount={nft.NftTokens.length}
                                            asset={nft.asset}
                                            name={nft.name}
                                            description={nft.description}
                                            price={nft.price}
                                            page={page}
                                            limit={limit}
                                            type={type}
                                            brandId={brand}
                                            categoryId={category}
                                            subCategoryId={subCategory}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <Grid item xs={12} sx={{ p: 3 }}>
                        <Grid container justifyContent="space-between" spacing={gridSpacing}>
                            <Grid item>
                                <Pagination
                                    color="primary"
                                    showFirstButton
                                    showLastButton
                                    count={mintedNftList && mintedNftList.pages}
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
        </>
    );
};

export default MintedNfts;
