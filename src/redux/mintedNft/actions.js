import { GET_ALL_MINTED_NFT, GET_ALL_MINTED_NFT_SUCCESS,GET_ALL_SOLD_NFT,GET_ALL_SOLD_NFT_SUCCESS } from './constants';

export const getAllSoldNft = (data) => {
    return {
        type: GET_ALL_SOLD_NFT,
        payload: data
    };
};

export const getAllSoldNftSuccess = (data) => {
    return {
        type: GET_ALL_SOLD_NFT_SUCCESS,
        payload: data
    };
};



export const getAllMintedNft = (data) => {
    return {
        type: GET_ALL_MINTED_NFT,
        payload: data
    };
};

export const getAllMintedNftSuccess = (data) => {
    return {
        type: GET_ALL_MINTED_NFT_SUCCESS,
        payload: data
    };
};
