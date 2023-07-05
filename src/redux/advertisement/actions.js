import { GET_ALL_SLOTS, GET_ALL_SLOTS_SUCCESS, DELETE_SLOT, UPDATE_SLOT ,CHANGE_SLOT_STATUS} from './constants';

export const getAllSlots = (data) => {
    return {
        type: GET_ALL_SLOTS,
        payload: data
    };
};

export const getAllSlotsSuccess = (data) => {
    return {
        type: GET_ALL_SLOTS_SUCCESS,
        payload: data
    };
};


export const deleteSlot = (data) => {
    return {
        type: DELETE_SLOT,
        payload: data
    };
};

export const updateSlot = (data) => {
    return {
        type: UPDATE_SLOT,
        payload: data
    };
};

export const changeSlotStatus = (data) => {
    return {
        type: CHANGE_SLOT_STATUS,
        payload: data
    };
};
