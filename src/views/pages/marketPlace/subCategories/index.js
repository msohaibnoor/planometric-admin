import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import SubCategoryTable from './component/subCategoryTable';
import { Button, Typography, Grid, MenuItem, Menu, Pagination, OutlinedInput, TextField, InputAdornment } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { getAllBrandList, getAllCategoriesByBrand, getAllSubCategories } from '../../../../redux/marketPlace/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddUpdateSubCategoryDialog from './component/addUpdateSubcategory';

import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';

const SubCategories = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const subCategoryList = useSelector((state) => state.marketPlace.subCategoryList);
    const brandArray = useSelector((state) => state.marketPlace.brandArray);
    const categoryArray = useSelector((state) => state.marketPlace.categoryArray);
    const [brand, setBrand] = useState(0);
    const [category, setCategory] = useState(0);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [type, setType] = useState('KTX');
    const [subCategoryData, setSubCategoryData] = useState({
        name: '',
        nftName: '',
        nftDescription: '',
        nftPrice: 0,
        subCategoryId: 0
    });
    const [addUpdateOpen, setAddUpdateOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
        setCategory(0);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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
            getAllSubCategories({
                brandId: brand == 0 ? '' : brand,
                categoryId: category == 0 ? '' : category,
                search: search,
                page: page,
                limit: limit
            })
        );
    }, [search, page, limit, brand, category]);
    return (
        <>
            <AddUpdateSubCategoryDialog
                mainBrandId={brand}
                mainCategoryId={category}
                categoryArray={categoryArray}
                brandArray={brandArray}
                page={page}
                limit={limit}
                search={search}
                addUpdateOpen={addUpdateOpen}
                setAddUpdateOpen={setAddUpdateOpen}
                subCategoryData={subCategoryData}
                setSubCategoryData={setSubCategoryData}
                type={type}
                setType={setType}
            />
            <HeadingCard title="Subcategory Management" marginTop="20px" />
            <MainCard
                title={
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={3}>
                            <OutlinedInput
                                fullWidth
                                id="input-search-list-style1"
                                placeholder="Search"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconSearch stroke={1.5} size="1rem" />
                                    </InputAdornment>
                                }
                                size="small"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                sx={{ height: '40px' }}
                            />
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
                                sx={{ height: '40px' }}
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

                        <Grid item xs={3} textAlign="end">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setAddUpdateOpen(true);
                                }}
                            >
                                Add Subcategory
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                {subCategoryList && subCategoryList.subCategories && subCategoryList.subCategories.length > 0 ? (
                    <>
                        <SubCategoryTable
                            subCategoryList={subCategoryList && subCategoryList}
                            page={page}
                            limit={limit}
                            search={search}
                            mainBrandId={brand}
                            mainCategoryId={category}
                            setAddUpdateOpen={setAddUpdateOpen}
                            setSubCategoryData={setSubCategoryData}
                            setType={setType}
                        />
                        <Grid item xs={12} sx={{ p: 3 }}>
                            <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                <Grid item>
                                    <Pagination
                                        color="primary"
                                        showFirstButton
                                        showLastButton
                                        page={page}
                                        count={subCategoryList && subCategoryList.pages}
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
                                        onClose={handleCloseMenu}
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
                                            value={10}
                                            onClick={(e) => {
                                                setLimit(e.target.value);
                                                setPage(1);
                                                handleCloseMenu();
                                            }}
                                        >
                                            {' '}
                                            10 Rows
                                        </MenuItem>
                                        <MenuItem
                                            value={25}
                                            onClick={(e) => {
                                                setLimit(e.target.value);
                                                setPage(1);
                                                handleCloseMenu();
                                            }}
                                        >
                                            {' '}
                                            25 Rows
                                        </MenuItem>
                                        <MenuItem
                                            value={50}
                                            onClick={(e) => {
                                                setLimit(e.target.value);
                                                setPage(1);
                                                handleCloseMenu();
                                            }}
                                        >
                                            {' '}
                                            50 Rows{' '}
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
            </MainCard>
        </>
    );
};

export default SubCategories;
