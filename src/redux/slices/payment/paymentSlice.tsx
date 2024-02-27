import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';


interface InitialState {
    loading: boolean;
}

const initialState: InitialState = {
    loading: false,
};

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        Paymentloader(state, action) {
            return {
                ...state,
                loading: action.payload
            };
        },
    },
    extraReducers: (builder) => {

    },
});
export const getUserData = (state: { signin: { userData: any; }; }) => state.signin.userData;

export const { Paymentloader } = paymentSlice.actions;
export default paymentSlice.reducer;