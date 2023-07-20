import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput, InputAdornment, Button, Grid, Typography, Pagination, Menu, MenuItem, TextField } from '@mui/material';
import TestimonialTable from './component/testimonialsTable';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';
import { gridSpacing } from 'store/constant';
import { IconSearch } from '@tabler/icons';
import AddGuestUserDialog from './component/AddGuestUserDialog';
import AddRestrictedUserDialog from './component/AddRestrictedUserDialog';
import { getAllTestimonials } from '../../../redux/testimonials/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const Testimonials = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const testimonials = useSelector((state) => state.testimonials.testimonials);
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
            getAllTestimonials({
                search: search,
                page: page,
                limit: limit,
                type: type
            })
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
            <HeadingCard title="Testimonials" />

            <MainCard>
                {testimonials && testimonials.testimonials && testimonials.testimonials.length > 0 ? (
                    <>
                        <TestimonialTable
                            testimonialsList={testimonials && testimonials}
                            page={page}
                            limit={limit}
                            search={search}
                            type={type}
                        />
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

export default Testimonials;
