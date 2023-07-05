import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import BrandTable from './component/brandTable';
import { Button, Typography, Grid, MenuItem, Menu, Pagination, OutlinedInput, InputAdornment } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { getAllBrands } from '../../../../redux/marketPlace/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddUpdateBrandDialog from './component/addUpdateBrand';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';
const Brands = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const brandsList = useSelector((state) => state.marketPlace.brandsList);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [brandId, setBrandId] = useState();
    const [brandName, setBrandName] = useState('');
    const [addUpdateOpen, setAddUpdateOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(
            getAllBrands({
                search: search,
                page: page,
                limit: limit
            })
        );
    }, [search, page, limit]);
    return (
        <>
            <AddUpdateBrandDialog
                brandId={brandId}
                setBrandId={setBrandId}
                brandName={brandName}
                setBrandName={setBrandName}
                page={page}
                limit={limit}
                search={search}
                addUpdateOpen={addUpdateOpen}
                setAddUpdateOpen={setAddUpdateOpen}
            />
            <HeadingCard title="Brand Management" />
            <MainCard
                title={
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
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
                                sx={{ width: '271px' }}
                                className="customOutlinedInput"
                            />
                        </Grid>
                        <Grid item xs={6} textAlign="end">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setAddUpdateOpen(true);

                                    setBrandName('');
                                }}
                            >
                                Add Brand
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                {brandsList && brandsList.brands && brandsList.brands.length > 0 ? (
                    <>
                        <BrandTable
                            brandsList={brandsList && brandsList}
                            page={page}
                            limit={limit}
                            search={search}
                            setOpen={setOpen}
                            brandId={brandId}
                            setBrandId={setBrandId}
                            setBrandName={setBrandName}
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
                                        count={brandsList && brandsList.pages}
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

export default Brands;
