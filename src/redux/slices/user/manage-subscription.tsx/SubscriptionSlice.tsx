import {
  CancleSub,
  CancleSubcr,
  GetAllBilling,
  GetAllSeats,
  GetCardData,
  RemoveUSer,
} from '@/commonAPIs/manage-subcription/Mnagesubscription';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
  status: boolean;
  message: string;
}

// Agency list API types
type GetAllSubApiData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
};

// Agency list api Call
export const getAllBilling: any = createAsyncThunk(
  'SubcriptionManagement/getAllBilling',
  async (data: GetAllSubApiData) => {
    try {
      const response: any = await GetAllBilling(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);
export const getAllSeats: any = createAsyncThunk(
  'SubcriptionManagement/getAllSeats',
  async (data: GetAllSubApiData) => {
    try {
      const response: any = await GetAllSeats(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);
export const getAllcarddata: any = createAsyncThunk(
  'SubcriptionManagement/getcard',
  async (data: GetAllSubApiData) => {
    try {
      const response: any = await GetCardData(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);
export const RemoveUsersub: any = createAsyncThunk(
  'SubcriptionManagement/removeUser',
  async (data: any) => {
    try {
      const response: any = await RemoveUSer(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);
export const CancleSubscription: any = createAsyncThunk(
  'SubcriptionManagement/cancle',
  async (data: any) => {
    try {
      const response: any = await CancleSubcr();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);

// Slice initial States types
interface CouponInitialState {
  loading: boolean;
  BillinglistDetails: any;
  SeatsData: any;
  CardData: any;
}

// Slice initial States
const initialState: CouponInitialState = {
  loading: false,
  BillinglistDetails: {},
  SeatsData: {},
  CardData: {},
};

export const CouponSlice = createSlice({
  name: 'managesubcription',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //cancle sub
    builder
      .addCase(CancleSubscription.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(CancleSubscription.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(CancleSubscription.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });

    builder
      .addCase(RemoveUsersub.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(RemoveUsersub.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        } else {
          if (action.payload.message) {
            toast.success(action?.payload?.message);
          }
        }
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(RemoveUsersub.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });

    //list of coupon
    builder
      .addCase(getAllBilling.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllBilling.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          BillinglistDetails: action.payload,
          loading: false,
        };
      })
      .addCase(getAllBilling.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });

    //seats data
    builder
      .addCase(getAllSeats.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllSeats.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          SeatsData: action.payload,
          loading: false,
        };
      })
      .addCase(getAllSeats.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });
    //card data
    builder
      .addCase(getAllcarddata.pending, (state) => {
        return {
          ...state,
        };
      })
      .addCase(getAllcarddata.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          CardData: action.payload,
        };
      })
      .addCase(getAllcarddata.rejected, (state) => {
        return {
          ...state,
        };
      });
  },
});

export default CouponSlice.reducer;
