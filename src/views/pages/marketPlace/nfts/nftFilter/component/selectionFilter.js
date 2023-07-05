import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography, Grid } from '@mui/material';

const SelectionFilter = ({ selection, selectionArray,handleChange, title }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    console.log({title})
    return (
        <>
            {selectionArray && selectionArray.length > 0 ? (
                <FormControl component="fieldset" className="customScroller">
                    <RadioGroup
                        style={{ justifyContent: 'start' }}
                        row
                        aria-label="layout"
                        value={selection}
                        onChange={(e) => handleChange(e.target.value)}
                        name="row-radio-buttons-group"
                    >
                        {selectionArray.length > 0 &&
                            selectionArray.map((item) => {
                                return (
                                    <FormControlLabel
                                        value={item.value}
                                        control={<Radio />}
                                        label={item.label}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                        }}
                                    />
                                );
                            })}
                    </RadioGroup>
                </FormControl>
            ) : 
                title === 'Categories' ? <>Select brand first</> : title === "Subcategories" ? "Select category first" :"No data available"
            }
        </>
    );
};

export default SelectionFilter;
