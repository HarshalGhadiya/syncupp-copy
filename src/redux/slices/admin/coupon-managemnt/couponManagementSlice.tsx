import {
  AddCouponApi,
  DealteCoupon,
  GetAllCouponApi,
  GetcoupenDataByid,
  UpadatecoupenDataByid,
} from '@/commonAPIs/adminAPIs/coupon-management/couponManagementAPIs';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
  status: boolean;
  message: string;
}

/* Agency List */

// Agency list API types
type GetAllCouponApiData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
};

// Agency list api Call
export const getAllCoupone: any = createAsyncThunk(
  'couponMangemnt/getAllCoupone',
  async (data: GetAllCouponApiData) => {
    try {
      const response: any = await GetAllCouponApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);

export const clearCouponSingleData = createAction('couponMangemnt/clearState');

export const AddCoupon: any = createAsyncThunk(
  'couponMangemnt/addCoupone',
  async (data: any) => {
    try {
      const response: any = await AddCouponApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);
export const DeleteCoupon: any = createAsyncThunk(
  'couponMangemnt/deleteCoupone',
  async (data: any) => {
    try {
      const response: any = await DealteCoupon(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);

export const GetCoupenListbyId: any = createAsyncThunk(
  'couponMangemnt/CouponByid',
  async (id: any) => {
    try {
      const response: any = await GetcoupenDataByid(id);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as APIErrorResponse;
    }
  }
);

export const UpdateCoupenListbyId: any = createAsyncThunk(
  'couponMangemnt/updateByid',
  async ({ data, id }: any) => {
    try {
      const response: any = await UpadatecoupenDataByid(data, id);
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
  CouponlistDetails: any;
  CouponSingledata: any;
}

// Slice initial States
const initialState: CouponInitialState = {
  loading: false,
  CouponlistDetails: {},
  CouponSingledata: {},
};

export const CouponSlice = createSlice({
  name: 'admincoupone',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(clearCouponSingleData, (state) => {
      return {
        ...state,
        CouponSingledata: {},
      };
    });
    builder
      .addCase(AddCoupon.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(AddCoupon.fulfilled, (state, action) => {
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
      .addCase(AddCoupon.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });
    //delete data
    builder
      .addCase(DeleteCoupon.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(DeleteCoupon.fulfilled, (state, action) => {
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
      .addCase(DeleteCoupon.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });

    //update data
    builder
      .addCase(UpdateCoupenListbyId.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(UpdateCoupenListbyId.fulfilled, (state, action) => {
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
      .addCase(UpdateCoupenListbyId.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });

    //get coupon by id
    builder
      .addCase(GetCoupenListbyId.pending, (state) => {
        return {
          ...state,
        };
      })
      .addCase(GetCoupenListbyId.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          CouponSingledata: action.payload,
        };
      })
      .addCase(GetCoupenListbyId.rejected, (state) => {
        return {
          ...state,
        };
      });

    //list of coupon
    builder
      .addCase(getAllCoupone.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllCoupone.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          CouponlistDetails: action.payload,
          loading: false,
        };
      })
      .addCase(getAllCoupone.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });
  },
});

export default CouponSlice.reducer;
