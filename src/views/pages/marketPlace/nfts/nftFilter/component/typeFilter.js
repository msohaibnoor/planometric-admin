import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const TypeFilter = ({ type, handleType }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <>
            <FormControl className='nftTypeFilter' component="fieldset">
                <RadioGroup
                    row
                    aria-label="layout"
                    value={type}
                    onChange={(e) => handleType(e.target.value)}
                    name="row-radio-buttons-group"
                    
                >
                    <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="All NFT's"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                    <FormControlLabel
                        value="readyToMint"
                        control={<Radio />}
                        label="Ready To be Minted"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                    <FormControlLabel
                        value="directMint"
                        control={<Radio />}
                        label="Minted"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                    <FormControlLabel
                        value="marketPlace"
                        control={<Radio />}
                        label="Marketplace"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                    <FormControlLabel
                        value="lazyMint"
                        control={<Radio />}
                        label="Lazy Minted"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />

                    {/* <FormControlLabel
                        value="auction"
                        control={<Radio />}
                        label="Auction"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    /> */}
                </RadioGroup>
            </FormControl>
        </>
    );
};

export default TypeFilter;
