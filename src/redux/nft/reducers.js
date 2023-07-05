import produce from 'immer';
import {
    GET_ALL_NFT_SUCCESS,
    GET_ALL_NFT_FOR_BUNCH_MINT_SUCCESS,
    GET_ALL_NFT_FOR_BUNCH_TRANSFER_SUCCESS,
    GET_ALL_NFT_FOR_BUNCH_LISTING_SUCCESS
} from './constants';

const INITIAL_STATE = {
    nftList: [],
    nftListForBunchMint: [],
    nftListForBunchTransfer: [],
    nftListForBunchListing: []
};

const nftReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_NFT_SUCCESS:
            draft.nftList = action.payload;
            break;
        case GET_ALL_NFT_FOR_BUNCH_MINT_SUCCESS:
            draft.nftListForBunchMint = action.payload;
            break;
        case GET_ALL_NFT_FOR_BUNCH_TRANSFER_SUCCESS:
            draft.nftListForBunchTransfer = action.payload;
            break;
        case GET_ALL_NFT_FOR_BUNCH_LISTING_SUCCESS:
            draft.nftListForBunchListing = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default nftReducer;
