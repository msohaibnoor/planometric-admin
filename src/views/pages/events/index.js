import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput, InputAdornment, Button, Grid, Typography, Pagination, Menu, MenuItem, TextField } from '@mui/material';
import EventTable from './component/EventTable';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';
import { gridSpacing } from 'store/constant';
import { IconSearch } from '@tabler/icons';
import AddEditEventDialog from './component/AddEditEventDialog';
import { getAllEvents } from '../../../redux/events/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const Events = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const eventsList = useSelector((state) => state.events.eventsList);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
   
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isUpdate, setIsUpdate] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        dispatch(
            getAllEvents({
                search: search,
                page: page,
                limit: limit
            })
        );
    }, [search, page, limit]);

    const [eventDetail, setEventDetail] = useState({
        name: '',
        price: 0,
        description: '',
        collectionAddress: '',
        eventImage: null,
        startTime: new Date(new Date().getTime() + 5 * 60000),
        endTime: new Date(new Date().getTime() + 725 * 60000),
        brand: 0
    });
    const [type, setType] = useState('KTX');
    return (
        <>
            <AddEditEventDialog
                setOpen={setOpen}
                open={open}
                search={search}
                page={page}
                limit={limit}
                eventDetail={eventDetail}
                setEventDetail={setEventDetail}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                type={type}
                setType={setType}
                loader={loader}
                setLoader={setLoader}
            />
            <HeadingCard title="Event List" />

            <MainCard
                title={
                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item xs={3}>
                            {' '}
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
                            />
                        </Grid>

                        <Grid item xs={9} textAlign="end">
                            <Button
                                sx={{
                                    ':hover': {
                                        boxShadow: 'none'
                                    },
                                    marginRight: '10px'
                                }}
                                variant="contained"
                                onClick={() => {
                                    setOpen(true);
                                    setEventDetail({
                                        name: '',
                                        price: 0,
                                        description: '',
                                        collectionAddress: '',
                                        eventImage: null,
                                        startTime: new Date(new Date().getTime() + 5 * 60000),
                                        endTime: new Date(new Date().getTime() + 725 * 60000),
                                        brand: 0
                                    });
                                    setLoader(false);
                                }}
                            >
                                Add Event
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                {eventsList && eventsList.lobbies && eventsList.lobbies.length > 0 ? (
                    <>
                        <EventTable
                            eventsList={eventsList && eventsList}
                            page={page}
                            limit={limit}
                            search={search}
                            eventDetail={eventDetail}
                            setEventEditOpen={setOpen}
                            eventEditOpen={open}
                            setEventDetail={setEventDetail}
                            isUpdate={isUpdate}
                            setIsUpdate={setIsUpdate}
                            type={type}
                            setType={setType}
                            loader={loader}
                            setLoader={setLoader}
                           
                        />
                        <Grid item xs={12} sx={{ p: 3 }}>
                            <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                <Grid item>
                                    <Pagination
                                        color="primary"
                                        showFirstButton
                                        showLastButton
                                        page={page}
                                        count={eventsList && eventsList.pages}
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

export default Events;
