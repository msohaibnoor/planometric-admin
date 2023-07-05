import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import CategoryTable from './component/categoryTable';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
    Grid,
    MenuItem,
    Menu,
    Pagination,
    OutlinedInput,
    TextField,
    InputAdornment
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { getAllBrands, getAllBrandList, getAllCategories } from '../../../../redux/marketPlace/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddUpdateCategoryDialog from './component/addUpdateCategory';

import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';

const Categories = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.marketPlace.categoryList);
    const brandArray = useSelector((state) => state.marketPlace.brandArray);
    const [brand, setBrand] = useState(0);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [categoryId, setCategoryId] = useState();
    const [categoryData, setCategoryData] = useState({
        name: '',
        brandId: 0
    });
    const [addUpdateOpen, setAddUpdateOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    useEffect(() => {
        dispatch(getAllBrandList());
    }, []);
    useEffect(() => {
        dispatch(
            getAllCategories({
                brandId: brand == 0 ? '' : brand,
                search: search,
                page: page,
                limit: limit
            })
        );
    }, [search, page, limit, brand]);
    return (
        <>
            <AddUpdateCategoryDialog
                mainBrandId={brand}
                brandArray={brandArray}
                categoryId={categoryId}
                categoryData={categoryData}
                setCategoryData={setCategoryData}
                page={page}
                limit={limit}
                search={search}
                addUpdateOpen={addUpdateOpen}
                setAddUpdateOpen={setAddUpdateOpen}
            />
            <HeadingCard title="Category Management" marginTop="20px" />
            <MainCard
                title={
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={3}>
                            <OutlinedInput
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
                                sx={{ height: '40px', width: '100%' }}
                                className="customOutlinedInput"
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
                        <Grid item xs={6} textAlign="end">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setAddUpdateOpen(true);
                                    setCategoryData({
                                        name: '',
                                        brandId: 0
                                    });
                                }}
                            >
                                Add Category
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                {categoryList && categoryList.categories && categoryList.categories.length > 0 ? (
                    <>
                        <CategoryTable
                            categoryList={categoryList && categoryList}
                            page={page}
                            limit={limit}
                            search={search}
                            categoryId={categoryId}
                            setCategoryId={setCategoryId}
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setAddUpdateOpen={setAddUpdateOpen}
                        />
                        <Grid item xs={12} sx={{ p: 3 }}>
                            <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                <Grid item>
                                    <Pagination
                                        color="primary"
                                        showFirstButton
                                        showLastButton
                                        page={page}
                                        count={categoryList && categoryList.pages}
                                        // count={2}
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

export default Categories;
