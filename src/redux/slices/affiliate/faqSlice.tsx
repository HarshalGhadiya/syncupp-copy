import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { ContactusApi } from "@/commonAPIs/affiliateAPIs/contactusAPIs";
import { FaqlistApi } from "@/commonAPIs/affiliateAPIs/faqAPIs";

// API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}

interface InitialState {
    loading: boolean;
    faqlistdata: any
}

const initialState: InitialState = {
    loading: false,
    faqlistdata: {}
};


// Faq us 
type FaqState = {}

export const faqlistapicall: any = createAsyncThunk(
    "faq/faqlistapicall",
    async (data: FaqState) => {
        try {
            const response: any = await FaqlistApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


export const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // contact-us
        builder
            .addCase(faqlistapicall.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(faqlistapicall.fulfilled, (state, action) => {
                if (action.payload.success == false) {
                    toast.error(action.payload.message);
                }
                return {
                    ...state,
                    loading: false,
                    faqlistdata: action.payload
                }
            })
            .addCase(faqlistapicall.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    },
});


export default faqSlice.reducer;