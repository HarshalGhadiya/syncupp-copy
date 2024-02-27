import { DeleteClientReviewData, GetAllClientReview, GetClientReviewDataByID, PostClientReviewEnroll, UpdateClientReviewDataByID } from '@/api/admin/clientReview/clientReviewApis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export type AddClientReviewData = {
    _id?: string;
    image:string;
    client_review_image:string;
    customer_name: string;
    company_name?: string;
    review?: string;
    items_per_page?: Number;
    page?: Number;
    search?: string;
    sort_field?: string;
    sort_order?: string;
    id?: string;
  };
  
interface ClientReviewDataResponse {
  status: boolean;
  message: string;
}
interface ClientReviewInitialState {
  loading: boolean;
  _id: string;
  client_review_image:string;
  customer_name: string;
  company_name: string;
  review: string;
  data: any;
  clientReviewData: any;
  addClientReviewStatus: string;
  updateClientReviewStatus: string;
  deleteClientReviewStatus: string;
}

const initialState: ClientReviewInitialState = {
  loading: false,
  _id: '',
  client_review_image:'',
  customer_name: '',
  company_name: '',
  review: '',
  data: [],
  clientReviewData: [],
  addClientReviewStatus: '',
  updateClientReviewStatus: '',
  deleteClientReviewStatus: '',
};

export const postClientReviewEnroll: any = createAsyncThunk(
  'clientReview/postClientReviewEnroll',
  async (data: FormData) => {
    try {
      const response: any = await PostClientReviewEnroll(data);
      return response.data;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as ClientReviewDataResponse;
    }
  }
);
export const getAllClientReview: any = createAsyncThunk(
  'clientReview/getAllClientReview',
  async (data: AddClientReviewData) => {
    try {
      const response: any = await GetAllClientReview(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as ClientReviewDataResponse;
    }
  }
);
export const getClientReviewDataByID: any = createAsyncThunk(
  'clientReview/getClientReviewDataByID',
  async (data: AddClientReviewData) => {
    try {
      const response: any = await GetClientReviewDataByID(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as ClientReviewDataResponse;
    }
  }
);
export const deleteClientReviewData: any = createAsyncThunk(
  'clientReview/deleteClientReviewData',
  async (data: AddClientReviewData) => {
    try {
      const response: any = await DeleteClientReviewData(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as ClientReviewDataResponse;
    }
  }
);
export const updateClientReviewDataByID: any = createAsyncThunk(
  'clientReview/updateClientReviewDataByID',
  async (data: any) => {
    const {id, formData} = data;
    try {
      const response: any = await UpdateClientReviewDataByID(formData, id);
      return response.data;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as ClientReviewDataResponse;
    }
  }
);

export const clientReviewSlice = createSlice({
  name: 'clientReview',
  initialState,
  reducers: {
    RemoveclientReviewData(state) {
      return {
        ...state,
        clientReviewData: ''
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postClientReviewEnroll.pending, (state) => {
        return {
          ...state,
          loading: true,
          addClientReviewStatus: 'pending',
        };
      })
      .addCase(postClientReviewEnroll.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          data: action.payload,
          loading: false,
          addClientReviewStatus: 'success',
        };
      })
      .addCase(postClientReviewEnroll.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addClientReviewStatus: 'error',
        };
      });
    builder
      .addCase(getAllClientReview.pending, (state) => {
        return {
          ...state,
          loading: true,
          getClientReviewStatus: 'pending',
        };
      })
      .addCase(getAllClientReview.fulfilled, (state, action) => {
        if (action.payload.status === false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          data: action.payload.data,
          loading: false,
          getClientReviewStatus: 'success',
        };
      })
      .addCase(getAllClientReview.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getClientReviewStatus: 'error',
        };
      });
    builder
      .addCase(getClientReviewDataByID.pending, (state) => {
        return {
          ...state,
          loading: true,
          getClientReviewStatus: 'pending',
        };
      })
      .addCase(getClientReviewDataByID.fulfilled, (state, action) => {
        if (action.payload.status === false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          clientReviewData: action.payload.data,
          loading: false,
          getClientReviewStatus: 'success',
        };
      })
      .addCase(getClientReviewDataByID.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getClientReviewStatus: 'error',
        };
      });
    builder
      .addCase(deleteClientReviewData.pending, (state) => {
        return {
          ...state,
          loading: true,
          deleteClientReviewStatus: 'pending',
        };
      })
      .addCase(deleteClientReviewData.fulfilled, (state, action) => {
        if (action.payload.status === false) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
          deleteClientReviewStatus: 'success',
        };
      })
      .addCase(deleteClientReviewData.rejected, (state) => {
        return {
          ...state,
          loading: false,
          deleteClientReviewStatus: 'error',
        };
      });
    builder
      .addCase(updateClientReviewDataByID.pending, (state) => {
        return {
          ...state,
          loading: true,
          updateClientReviewStatus: 'pending',
        };
      })
      .addCase(updateClientReviewDataByID.fulfilled, (state, action) => {
        if (action.payload.status === false) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          data: action.payload,
          loading: false,
          updateClientReviewStatus: 'success',
        };
      })
      .addCase(updateClientReviewDataByID.rejected, (state) => {
        return {
          ...state,
          loading: false,
          updateClientReviewStatus: 'error',
        };
      });
  },
});

export const { RemoveclientReviewData } = clientReviewSlice.actions;
export default clientReviewSlice.reducer;
