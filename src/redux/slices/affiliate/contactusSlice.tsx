import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { ContactusApi } from "@/commonAPIs/affiliateAPIs/contactusAPIs";

// API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}

interface SigninState {
    loading: boolean;
}

const initialState: SigninState = {
    loading: false,
};


// Contact us 
type ContactusState = {
    first_name: string,
    last_name: string,
    email: string,
    contact_number: string,
    country: string,
    no_of_people: string,
    thoughts: string,
    isAgreedtosyncup: false,
}

export const contactusformapicall: any = createAsyncThunk(
    "contactus/contactusformapicall",
    async (data: ContactusState) => {
        try {
            const response: any = await ContactusApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


export const contactusSlice = createSlice({
    name: 'contactus',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // contact-us
        builder
            .addCase(contactusformapicall.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(contactusformapicall.fulfilled, (state, action) => {
                console.log(action, 'action')
                if (action.payload.success == true) {
                    toast.success(action.payload.message);
                    // localStorage.setItem('token', action.payload.data.token);
                } else {
                    toast.error(action.payload.message);
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(contactusformapicall.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    },
});


export default contactusSlice.reducer;