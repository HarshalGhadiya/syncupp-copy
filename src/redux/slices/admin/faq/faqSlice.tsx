import {DeleteFaqData, GetAllFaq,GetFaqDataByID,PostFaqEnroll, UpdateFaqDataByID} from '@/api/admin/faq/faqApis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

type AddFaqData = {
  _id: string;
  title: string;
  description?: string;
  items_per_page?:Number,
  page?:Number,
  search?:string,
  sort_field?:string,
  sort_order?:string,
};
interface FaqDataResponse {
  status: boolean;
  message: string;
}
interface FaqInitialState {
  loading: boolean;
  _id: string;
  title: string;
  description?: string;
  data: any;
  faqData: any;
  addFaqStatus: string;
}

const initialState: FaqInitialState = {
  loading: false,
  _id: '',
  title: '',
  description: '',
  data: [],
  faqData: [],
  addFaqStatus: '',
};

export const postAddFaq: any = createAsyncThunk(
  'faq/postAddFaq',
  async (data: AddFaqData) => {
    try {
      const response: any = await PostFaqEnroll(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const getAllFaq: any = createAsyncThunk(
  'faq/getAllFaq',
  async (data: AddFaqData) => {
    try {
      const response: any = await GetAllFaq(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const getFaqDataByID: any = createAsyncThunk(
  'faq/getFaqDataByID',
  async (data: AddFaqData) => {
    try {
      const response: any = await GetFaqDataByID(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const deleteFaqData: any = createAsyncThunk(
  'faq/deleteFaqData',
  async (data: AddFaqData) => {
    try {
      const response: any = await DeleteFaqData(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const updateFaqDataByID: any = createAsyncThunk(
  'faq/updateFaqDataByID',
  async (data: AddFaqData) => {
    const apiData = {
      _id: data._id,
      title: data.title,
      description: data.description,
    };
    try {
      const response: any = await UpdateFaqDataByID(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);

export const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    RemoveFaqData(state) {
      return {
        ...state,
        faqData: ''
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddFaq.pending, (state) => {
        return {
          ...state,
          loading: true,
          addFaqStatus: 'pending',
        };
      })
      .addCase(postAddFaq.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          data: action.payload,
          loading: false,
          addFaqStatus: 'success',
        };
      })
      .addCase(postAddFaq.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addFaqStatus: 'error',
        };
      });
    builder
      .addCase(getAllFaq.pending, (state) => {
        return {
          ...state,
          loading: true,
          getFaqStatus: 'pending',
        };
      })
      .addCase(getAllFaq.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          data: action.payload.data,
          loading: false,
          getFaqStatus: 'success',
        };
      })
      .addCase(getAllFaq.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getFaqStatus: 'error',
        };
      });
    builder
      .addCase(getFaqDataByID.pending, (state) => {
        return {
          ...state,
          loading: true,
          getFaqStatus: 'pending',
        };
      })
      .addCase(getFaqDataByID.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          faqData: action.payload.data,
          loading: false,
          getFaqStatus: 'success',
        };
      })
      .addCase(getFaqDataByID.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getFaqStatus: 'error',
        };
      });
    builder
      .addCase(deleteFaqData.pending, (state) => {
        return {
          ...state,
          loading: true,
          getFaqStatus: 'pending',
        };
      })
      .addCase(deleteFaqData.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          data: action.payload,
          loading: false,
          getFaqStatus: 'success',
        };
      })
      .addCase(deleteFaqData.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getFaqStatus: 'error',
        };
      });
    builder
      .addCase(updateFaqDataByID.pending, (state) => {
        return {
          ...state,
          loading: true,
          getFaqStatus: 'pending',
        };
      })
      .addCase(updateFaqDataByID.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          data: action.payload,
          loading: false,
          getFaqStatus: 'success',
        };
      })
      .addCase(updateFaqDataByID.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getFaqStatus: 'error',
        };
      });
  },
});

export const { RemoveFaqData } = faqSlice.actions;
export default faqSlice.reducer;
