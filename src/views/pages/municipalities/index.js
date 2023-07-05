import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput, InputAdornment, Button, Grid, Typography, Pagination, Menu, MenuItem, TextField } from '@mui/material';
import UserTable from './component/userTable';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';
import { gridSpacing } from 'store/constant';
import { IconSearch } from '@tabler/icons';
import AddGuestUserDialog from './component/AddGuestUserDialog';
import AddRestrictedUserDialog from './component/AddRestrictedUserDialog';
import { getAllMunicipalities } from '../../../redux/municipalities/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
const typeArray = [
    {
        value: 'all',
        label: 'All Users'
    },
    {
        value: 'regularUser',
        label: 'Regular User List'
    },
    {
        value: 'whiteListUser',
        label: 'White List'
    },
    {
        value: 'blackListUser',
        label: 'Black List'
    }
];

const Users = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.municipalities.municipalities);
    // console.log('municipalities',)
    // console.log(usersList)
    const [open, setOpen] = useState(false);
    const [openRestricted, setRestrictedOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [type, setType] = useState('all');

    const handleType = (event) => {
        setType(event.target.value);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        dispatch(
            getAllMunicipalities()
        );
    }, [search, page, limit, type]);

    return (
        <>
            <AddGuestUserDialog setOpen={setOpen} open={open} search={search} page={page} limit={limit} type={type} />
            <AddRestrictedUserDialog
                setOpen={setRestrictedOpen}
                open={openRestricted}
                search={search}
                page={page}
                limit={limit}
                type={type}
            />
            <HeadingCard title="Municipalities" />

            <MainCard
                title={
                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item xs={3}>
                            {' '}
                            {/* <OutlinedInput
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
                            /> */}
                        </Grid>
                        <Grid item xs={3}>
                            {/* <TextField
                                className="selectField"
                                id="outlined-select-budget"
                                select
                                fullWidth
                                label="Select Type"
                                value={type}
                                onChange={handleType}
                                sx={{ height: '40px' }}
                            >
                                {typeArray.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                        </Grid>
                        <Grid item xs={6} textAlign="end">
                            {/* <Button
                                sx={{
                                    ':hover': {
                                        boxShadow: 'none'
                                    },
                                    marginRight: '10px'
                                }}
                                variant="contained"
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                Add Guest User
                            </Button> */}
                            <Button
                                sx={{
                                    ':hover': {
                                        boxShadow: 'none'
                                    }
                                }}
                                variant="contained"
                                onClick={() => {
                                    setRestrictedOpen(true);
                                }}
                            >
                                Add Municipality
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                {usersList && usersList.municipalities && usersList.municipalities.length > 0 ? (
                    <>
                        <UserTable usersList={usersList && usersList} page={page} limit={limit} search={search} type={type} />
                        <Grid item xs={12} sx={{ p: 3 }}>
                            <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                <Grid item>
                                    <Pagination
                                        color="primary"
                                        showFirstButton
                                        showLastButton
                                        page={page}
                                        count={usersList && usersList.pages}
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
                                            value={10}
                                            onClick={(e) => {
                                                setLimit(e.target.value);
                                                setPage(1);
                                                handleClose();
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
                                                handleClose();
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
                                                handleClose();
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

export default Users;
