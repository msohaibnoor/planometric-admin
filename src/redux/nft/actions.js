import {
    GET_ALL_NFT_FOR_BUNCH_MINT,
    GET_ALL_NFT_FOR_BUNCH_MINT_SUCCESS,
    GET_ALL_NFT_FOR_BUNCH_TRANSFER,
    GET_ALL_NFT_FOR_BUNCH_TRANSFER_SUCCESS,
    GET_ALL_NFT_FOR_BUNCH_LISTING,
    GET_ALL_NFT_FOR_BUNCH_LISTING_SUCCESS,
    GET_ALL_NFT,
    GET_ALL_NFT_SUCCESS,
    ADD_NFT,
    UPDATE_NFT,
    DELETE_NFT,
    MINT_NFT,
    LAZY_MINT_NFT,
    CHANGE_STATUS,
    TRANSFER_NFT,
    LIST_NFT_ON_MARKETPLACE,
    CHANGE_STATUS_IN_MARKETPLACE
} from './constants';

export const changeStatusInMarketplace = (data) => {
    return {
        type: CHANGE_STATUS_IN_MARKETPLACE,
        payload: data
    };
};


export const getAllNftForBunchListing = (data) => {
    return {
        type: GET_ALL_NFT_FOR_BUNCH_LISTING,
        payload: data
    };
};

export const getAllNftForBunchListingSuccess = (data) => {
    return {
        type: GET_ALL_NFT_FOR_BUNCH_LISTING_SUCCESS,
        payload: data
    };
};


export const getAllNftForBunchTransfer = (data) => {
    return {
        type: GET_ALL_NFT_FOR_BUNCH_TRANSFER,
        payload: data
    };
};

export const getAllNftForBunchTransferSuccess = (data) => {
    return {
        type: GET_ALL_NFT_FOR_BUNCH_TRANSFER_SUCCESS,
        payload: data
    };
};



export const listNftOnMarketPlace = (data) => {
    return {
        type: LIST_NFT_ON_MARKETPLACE,
        payload: data
    };
};

export const transferNft = (data) => {
    return {
        type: TRANSFER_NFT,
        payload: data
    };
};

export const getAllNftForBunchMint = (data) => {
    return {
        type: GET_ALL_NFT_FOR_BUNCH_MINT,
        payload: data
    };
};

export const getAllNftForBunchMintSuccess = (data) => {
    return {
        type: GET_ALL_NFT_FOR_BUNCH_MINT_SUCCESS,
        payload: data
    };
};

export const changeStatus = (data) => {
    return {
        type: CHANGE_STATUS,
        payload: data
    };
};

export const lazyMintNft = (data) => {
    return {
        type: LAZY_MINT_NFT,
        payload: data
    };
};

export const mintNft = (data) => {
    return {
        type: MINT_NFT,
        payload: data
    };
};

export const getAllNft = (data) => {
    return {
        type: GET_ALL_NFT,
        payload: data
    };
};

export const getAllNftSuccess = (data) => {
    return {
        type: GET_ALL_NFT_SUCCESS,
        payload: data
    };
};

export const addNft = (data) => {
    return {
        type: ADD_NFT,
        payload: data
    };
};

export const updateNft = (data) => {
    return {
        type: UPDATE_NFT,
        payload: data
    };
};

export const deleteNft = (data) => {
    return {
        type: DELETE_NFT,
        payload: data
    };
};
