import produce from 'immer';
import { GET_ALL_MINTED_NFT_SUCCESS, GET_ALL_SOLD_NFT_SUCCESS } from './constants';

const INITIAL_STATE = {
    mintedNftList: [],
    soldNftList: []
};

const mintedNftReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_MINTED_NFT_SUCCESS:
            draft.mintedNftList = action.payload;
            break;
        case GET_ALL_SOLD_NFT_SUCCESS:
            draft.soldNftList = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default mintedNftReducer;
