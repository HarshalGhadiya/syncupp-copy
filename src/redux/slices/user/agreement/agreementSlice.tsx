import { CreateAgencyAgreementsApi, DeleteAgencyAgreementsApi, DownloadAgreement, EditAgencyAgreementsApi, EditAgreementStatus, GetAllAgreementApi, GetDropdownClienlist, GetSingleAgreementByIdApi, SendAgreement } from "@/commonAPIs/userAPIs/agency-apis/agreement/agencyAgreementAPIs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}


/* Agency Agreement List */

// Agency Agreement list API types
type GetAllAgreementlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

// Agency Agreement list api Call
export const getAllAgencyagreement: any = createAsyncThunk(
    "agreement/getAllAgencyagreement",
    async (data: GetAllAgreementlistApiData) => {
        try {
            const response: any = await GetAllAgreementApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



/* Agency Agreement Delete */
type DeleteAgencyAgreement = {
    id: string[] | string;
    agency_id?: string
}

export const deleteAgencyAgreement: any = createAsyncThunk(
    "agreement/deleteAgencyAgreement",
    async (data: DeleteAgencyAgreement) => {
        try {
            const response: any = await DeleteAgencyAgreementsApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Send Agreement list API types
type SendAgreementApiData = {
    agreementId: string;
}

// Send Agreement list api Call
export const sendAgreement: any = createAsyncThunk(
    "agreement/sendAgreement",
    async (data: SendAgreementApiData) => {
        try {
            const response: any = await SendAgreement(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Download Agreement

// Download Agreement list API types
type DownloadAgreementApiData = {
    id: string;
}


export const downloadAgreement: any = createAsyncThunk(
    "agreement/downloadAgreement",
    async (data: DownloadAgreementApiData) => {
        try {
            const response: any = await DownloadAgreement(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// get A Single Aggrement By Id

type GetAgreementByIdApiData = {
    id: string;
}

export const getSingleagreement: any = createAsyncThunk(
    "agreement/getSingleagreement",
    async (data: GetAgreementByIdApiData) => {
        try {
            const response: any = await GetSingleAgreementByIdApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);

// Create Agreement

type CreateAgencyAgreement = {
    client_id: string,
    title: string,
    receiver: string,
    due_date: string,
    agreement_content: string,
    send?: boolean
}

export const createagreement: any = createAsyncThunk(
    "agreement/createagreement",
    async (data: CreateAgencyAgreement) => {
        try {
            const response: any = await CreateAgencyAgreementsApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



// Edit Agreement
type EditAgencyAgreement = {
    client_id: string,
    title: string,
    receiver: string,
    due_date: string,
    agreement_content: string,
    send?: boolean
}

export const updateagreement: any = createAsyncThunk(
    "agreement/updateagreement",
    async ({ data, id }: { data: EditAgencyAgreement, id: string; }) => {
        try {
            const response: any = await EditAgencyAgreementsApi(data, id);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);

// Edit Status of Agreement

type EditStatusAgreement = {
    status: string
}

export const updateagreementStatus: any = createAsyncThunk(
    "agreement/updateagreementStatus",
    async ({ data, id }: { data: EditStatusAgreement, id: string; }) => {
        try {
            const response: any = await EditAgreementStatus(data, id);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);

// Client list
export const getDropdownclientlist: any = createAsyncThunk(
    "agreement/getDropdownclientlist",
    async (data: any) => {
        try {
            const response: any = await GetDropdownClienlist({ pagination: false });
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
    singleAgreementdetails: any,
    clientlistDetails: any,
    dropdownloader: boolean,
    singleagreementloader: boolean
}

// Slice initial States
const initialState: AgencyAgreementInitialState = {
    loading: false,
    dropdownloader: false,
    singleagreementloader: false,
    agreementDetails: {},
    singleAgreementdetails: {},
    clientlistDetails: {},
};


export const agreementSlice = createSlice({
    name: "agreement",
    initialState,
    reducers: {
        removeAgreementdetails(state, action) {
            return {
                ...state,
                singleAgreementdetails: {}
            }
        }
    },

    extraReducers: (builder) => {
        // Agency Agreement list cases
        builder
            .addCase(getAllAgencyagreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllAgencyagreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agreementDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getAllAgencyagreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Agency Agreement delete
        builder
            .addCase(deleteAgencyAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteAgencyAgreement.fulfilled, (state, action) => {
                // console.log(action.payload,'action.payload')
                if (action.payload.success === true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agreementDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(deleteAgencyAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Send Agreement

        builder
            .addCase(sendAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(sendAgreement.fulfilled, (state, action) => {
                if (action.payload.success == true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(sendAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Download Agreement
        builder
            .addCase(downloadAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(downloadAgreement.fulfilled, (state, action) => {
                if (action.payload.success == true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(downloadAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // Get Single Agreement Details

        builder
            .addCase(getSingleagreement.pending, (state) => {
                return {
                    ...state,
                    singleagreementloader: true,
                }
            })
            .addCase(getSingleagreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    singleAgreementdetails: action.payload,
                    singleagreementloader: false,
                }
            })
            .addCase(getSingleagreement.rejected, (state) => {
                return {
                    ...state,
                    singleagreementloader: false,
                }
            });

        // Create Agreement
        builder
            .addCase(createagreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createagreement.fulfilled, (state, action) => {
                if (action.payload.success == true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(createagreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // Update Agreement
        builder
            .addCase(updateagreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateagreement.fulfilled, (state, action) => {
                if (action.payload.success == true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(updateagreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // Update Status Agreement

        builder
            .addCase(updateagreementStatus.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateagreementStatus.fulfilled, (state, action) => {
                if (action.payload.success == true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                    // clientlistDetails: action.payload,
                }
            })
            .addCase(updateagreementStatus.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        builder
            .addCase(getDropdownclientlist.pending, (state) => {
                return {
                    ...state,
                    dropdownloader: true,
                }
            })
            .addCase(getDropdownclientlist.fulfilled, (state, action) => {
                if (action.payload.success == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    dropdownloader: false,
                    clientlistDetails: action.payload
                }
            })
            .addCase(getDropdownclientlist.rejected, (state) => {
                return {
                    ...state,
                    dropdownloader: false,
                }
            });

    }
});


export const { removeAgreementdetails } = agreementSlice.actions;
export default agreementSlice.reducer;