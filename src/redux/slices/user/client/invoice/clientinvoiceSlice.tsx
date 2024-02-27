import { ClientAgreementstatusChange, GetAllclientAgreementApi, GetClientAgreementByIdApi } from "@/commonAPIs/userAPIs/client-apis/agreement/clientAgreementAPIs";
import { GetAllclientInvoiceApi, GetClientInvoiceByIdApi } from "@/commonAPIs/userAPIs/client-apis/invoice/clientinvoiceAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}


/* client Invoice List */

// client Invoice list API types
type GetAllclientInvoicelistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
    agency_id?: string
}

// client Invoice list api Call
export const getAllclientinvoice: any = createAsyncThunk(
    "clieninvoice/getAllclientinvoice",
    async (data: GetAllclientInvoicelistApiData) => {
        try {
            const response: any = await GetAllclientInvoiceApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



// Get Single Client Invoice
type GetClientInvoiceByIdApiData = {
    id: string;
}

export const getSingleClientinvoice: any = createAsyncThunk(
    "clieninvoice/getSingleClientinvoice",
    async (data: GetClientInvoiceByIdApiData) => {
        try {
            const response: any = await GetClientInvoiceByIdApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



// Slice initial States types
interface AgencyInvoiceInitialState {
    loading: boolean;
    invoiceDetails: any;
    singleInvoicedetails: any;
    paginationParams?: any
}

// Slice initial States
const initialState: AgencyInvoiceInitialState = {
    loading: false,
    invoiceDetails: {},
    singleInvoicedetails: {},
    paginationParams: {}
};


export const clientInvoiceSlice = createSlice({
    name: "clieninvoice",
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

        // client Invoice list cases
        builder
            .addCase(getAllclientinvoice.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllclientinvoice.fulfilled, (state, action) => {
                console.log(action.payload, '99');

                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    invoiceDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getAllclientinvoice.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Get Single Invoice
        builder
            .addCase(getSingleClientinvoice.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getSingleClientinvoice.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    singleInvoicedetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getSingleClientinvoice.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

    }
});

export const { setPagginationParams } = clientInvoiceSlice.actions;
export default clientInvoiceSlice.reducer;