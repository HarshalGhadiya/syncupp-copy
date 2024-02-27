import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { PostCreateInvoiceApi, UpdateInvoiceDataByIDApi } from "@/api/user/invoice/invoiceApis";

// API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}

interface InitialState {
    loading: boolean;
}

const initialState: InitialState = {
    loading: false,
};

type PostCreateInvoice = {
    invoice_number: string,
    client_id: string,
    due_date: string,
    invoice_date: string,
    invoice_content: [
        {
            item: string,
            description: string,
            qty: Number,
            rate: Number,
            tax: Number,
            amount: Number
        }
    ],
    sent?: boolean,
}


// Create Invoice 

export const createinvoiceapicall: any = createAsyncThunk(
    "invoiceform/createinvoiceapicall",
    async (data: PostCreateInvoice) => {
        try {
            const response: any = await PostCreateInvoiceApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



type UpdateInvoiceDataByID = {
    _id: string,
    client_id: string,
    invoice_id: string,
    due_date: Date,
    invoice_date: Date,
    invoice_content: [
        {
            item: string,
            qty: Number,
            rate: Number,
            tax: Number,
            amount: Number,
            description: string
        }
    ]
}

// Update Invoice

export const updateInvoice: any = createAsyncThunk(
    "invoiceform/updateInvoice",
    async (data: UpdateInvoiceDataByID) => {
        try {
            const response: any = await UpdateInvoiceDataByIDApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


export const invoicesformSlice = createSlice({
    name: 'invoiceform',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // create invoice
        builder
            .addCase(createinvoiceapicall.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createinvoiceapicall.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    toast.success(action.payload.message);
                } else {
                    toast.error(action.payload.message);
                }

                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(createinvoiceapicall.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // Update invoice
        builder
            .addCase(updateInvoice.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateInvoice.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    toast.success(action.payload.message);
                } else {
                    toast.error(action.payload.message);
                }

                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(updateInvoice.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    },
});


export default invoicesformSlice.reducer;