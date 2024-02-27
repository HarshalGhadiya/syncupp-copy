import { DeleteInquirysApi, GetAllinquiryApi } from "@/commonAPIs/adminAPIs/Inquiry/agencyAPIs";
import { DeleteAgencysApi, GetAllAgencyApi } from "@/commonAPIs/adminAPIs/agency/agencyAPIs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}


/* Agency List */

// Inquiry list API types
type GetAllinquiryApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

// Inquiry list api Call
export const getAllinquiry: any = createAsyncThunk(
    "inquiry/getAllinquiry",
    async (data: GetAllinquiryApiData) => {
        try {
            const response: any = await GetAllinquiryApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


/* Inquiry Delete */
type DeleteInquiry = {
    inquiryIdsToDelete: string[];
}


export const deleteInquiry: any = createAsyncThunk(
    "inquiry/inquiry",
    async (data: DeleteInquiry) => {
        try {
            const response: any = await DeleteInquirysApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Slice initial States types
interface AgencyInitialState {
    loading: boolean;
    inquirylistDetails: any;
}

// Slice initial States
const initialState: AgencyInitialState = {
    loading: false,
    inquirylistDetails: {}
};


export const inquirySlice = createSlice({
    name: "inquiry",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        // Agency list cases
        builder
            .addCase(deleteInquiry.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteInquiry.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                    return {
                        ...state,
                        loading: false,
                    }
                } else {
                    // toast.success(action.payload.message)
                    return {
                        ...state,
                        loading: false
                    }
                }
            })
            .addCase(deleteInquiry.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // Agency list delete
        builder
            .addCase(getAllinquiry.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllinquiry.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    inquirylistDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getAllinquiry.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    }
});

export default inquirySlice.reducer;