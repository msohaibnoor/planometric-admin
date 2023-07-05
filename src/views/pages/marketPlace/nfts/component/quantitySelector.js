import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Typography, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const QuantitySelector = ({ formik, fileArray, index }) => {
    const dispatch = useDispatch();

    const handleChange = (value) => {
        fileArray[index].quantity = value;
        formik.setFieldValue('images', fileArray);
    };

    return (
        <>
            <div style={{ display: 'flex', marginRight: '10px' }}>
                <Typography style={{ marginTop: '12px', marginRight: '5px' }}>Quantity : </Typography>

                <TextField
                
                    type="number"
                    className="quantityField"
                    id="outlined-select-currency-native"
                    value={fileArray[index].quantity}
                    onChange={(e) => {
                        handleChange(e.target.value);
                    }}
                />
            </div>
        </>
    );
};

export default QuantitySelector;
