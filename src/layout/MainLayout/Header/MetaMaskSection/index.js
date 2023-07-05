import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ethers, utils } from 'ethers';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setWallet } from '../../../../redux/auth/actions';
const MetaMaskSection = () => {

    return (
        <>
            {/* <Button
                variant="contained"
                onClick={() => {
                    handleConnect();
                }}
            >
                {walletAddress ? walletAddress.slice(0, 5) + '...' + walletAddress.slice(38, 42) : 'Connect Metamask'}
            </Button> */}
        </>
    );
};

export default MetaMaskSection;
