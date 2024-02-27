import { ClientAgreementstatusChange, GetAllclientAgreementApi, GetClientAgreementByIdApi } from "@/commonAPIs/userAPIs/client-apis/agreement/clientAgreementAPIs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}


/* client Agreement List */

// client Agreement list API types
type GetAllclientAgreementlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
    agency_id?:string
}

// client Agreement list api Call
export const getAllclientagreement: any = createAsyncThunk(
    "clienAgreement/getAllclientagreement",
    async (data: GetAllclientAgreementlistApiData) => {
        try {
            const response: any = await GetAllclientAgreementApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



// Get Single Client Agreement
type GetClientAgreementByIdApiData = {
    id: string;
}

export const getSingleClientAgreement: any = createAsyncThunk(
    "clienAgreement/getSingleClientAgreement",
    async (data: GetClientAgreementByIdApiData) => {
        try {
            const response: any = await GetClientAgreementByIdApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


//  Agreement status change
type clientAgreementstatusChange = {
    id: string;
}

export const clientAgreementchangeStatus: any = createAsyncThunk(
    "clienAgreement/clientAgreementchangeStatus",
    async (data: clientAgreementstatusChange) => {
        try {
            const response: any = await ClientAgreementstatusChange(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);




// Slice initial States types
interface AgencyAgreementInitialState {
    loading: boolean;
    agreementDetails: any;
    singleAgreementdetails: any;
    paginationParams?: any
}

// Slice initial States
const initialState: AgencyAgreementInitialState = {
    loading: false,
    agreementDetails: {},
    singleAgreementdetails: {},
    paginationParams: {}
};


export const clientAgreementSlice = createSlice({
    name: "clienAgreement",
    initialState,
    reducers: {
        setPagginationParams(state, action) {
            return {
                ...state,
                paginationParams: action.payload
            }
        },
    },

    extraReducers: (builder) => {
        // client Agreement list cases
        builder
            .addCase(getAllclientagreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllclientagreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agreementDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getAllclientagreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Get Single Agreement
        builder
            .addCase(getSingleClientAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getSingleClientAgreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    singleAgreementdetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getSingleClientAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Agreement status Change
        builder
            .addCase(clientAgreementchangeStatus.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(clientAgreementchangeStatus.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(clientAgreementchangeStatus.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    }
});

export const { setPagginationParams } = clientAgreementSlice.actions;
export default clientAgreementSlice.reducer;