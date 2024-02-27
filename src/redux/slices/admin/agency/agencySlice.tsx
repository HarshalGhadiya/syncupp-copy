import { DeleteAgencysApi, GetAgencyDetailsApi, GetAllAgencyApi } from "@/commonAPIs/adminAPIs/agency/agencyAPIs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}


/* Agency List */

// Agency list API types
type GetAllAgencylistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

// Agency list api Call
export const getAllAgency: any = createAsyncThunk(
    "adminAgency/getAllAgency",
    async (data: GetAllAgencylistApiData) => {
        try {
            const response: any = await GetAllAgencyApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


/* Agency Delete */
type DeleteAgency = {
    agencies: string[];
    status?: string | boolean
    delete?: boolean
}

export const deleteAgency: any = createAsyncThunk(
    "adminAgency/deleteAgency",
    async (data: DeleteAgency) => {
        try {
            const response: any = await DeleteAgencysApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


//  Get Agency Data

type GetAgencyDetails = {
    _id: string;
    reference_id: string;
  };

  export const getAgencyDetails: any = createAsyncThunk(
    "adminAgency/getAgencyDetails",
    async (data: GetAgencyDetails) => {
        try {
            const response: any = await GetAgencyDetailsApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Slice initial States types
interface AgencyInitialState {
    loading: boolean;
    agencylistDetails: any;
}

// Slice initial States
const initialState: AgencyInitialState = {
    loading: false,
    agencylistDetails: {}
};


export const agencySlice = createSlice({
    name: "adminAgency",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        // Agency list cases
        builder
            .addCase(deleteAgency.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteAgency.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                    return {
                        ...state,
                        loading: false,
                    }
                } else {
                    toast.success(action.payload.message)
                    return {
                        ...state,
                        loading: false
                    }
                }
            })
            .addCase(deleteAgency.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // Agency list delete
        builder
            .addCase(getAllAgency.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllAgency.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agencylistDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getAllAgency.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
         // Agency Details
         builder
         .addCase(getAgencyDetails.pending, (state) => {
             return {
                 ...state,
                 loading: true,
             }
         })
         .addCase(getAgencyDetails.fulfilled, (state, action) => {
             if (action.payload.status == false) {
                 toast.error(action.payload.message)
             }
             return {
                 ...state,
                 agencylistDetails: action.payload,
                 loading: false,
             }
         })
         .addCase(getAgencyDetails.rejected, (state) => {
             return {
                 ...state,
                 loading: false,
             }
         });
    }
});

export default agencySlice.reducer;