import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput, InputAdornment, Button, Grid, Typography, Pagination, Menu, MenuItem, TextField } from '@mui/material';
import TestimonialTable from './component/testimonialsTable';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';
import { gridSpacing } from 'store/constant';
import { IconSearch } from '@tabler/icons';
import AddUpdateTestimonialDialog from './component/AddUpdateTestimonial';
import { getAllData, updateData } from '../../../redux/clientdata/actions';

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const Testimonials = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const testimonials = useSelector((state) => state.testimonials.testimonials);
    const instructions = useSelector((state) => state.clientData.clientData.instructions);

    const [open, setOpen] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);

    const [testimonialId, setTestimonialId] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
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
            getAllData({
                search: search,
                page: page,
                limit: limit,
                type: type
            })
        );
    }, [search, page, limit, type]);

    return (
        <>
            <AddUpdateTestimonialDialog
                testimonialId={testimonialId}
                setTestimonialId={setTestimonialId}
                feedbackText={feedbackText}
                page={page}
                limit={limit}
                search={search}
                openFeedback={openFeedback}
                setOpenFeedback={setOpenFeedback}
            />
            <HeadingCard title="Plan Instructions" />

            <MainCard
                title={
                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6} textAlign="end">
                            <Button
                                sx={{
                                    ':hover': {
                                        boxShadow: 'none'
                                    }
                                }}
                                variant="contained"
                                onClick={() => {
                                    setOpenFeedback(true);
                                }}
                            >
                                Add Instruction
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                {instructions   && instructions.length > 0 ? (
                    <>
                        <TestimonialTable
                            instructionsList={instructions && instructions}
                            page={page}
                            limit={limit}
                            search={search}
                            type={type}
                            open={open}
                            setOpen={setOpen}
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
