import { GetInvoiceApi } from "@/api/user/invoice/invoiceApis";
import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

type GetCalenderApiData = {
  _id: string;
  company_name: string;
  name: string;
  first_name?: string;
  last_name?: string;
  }
interface PostAPIResponse {
    status : boolean;
    message : string
  }

interface invoiceInitialState {
    loading: boolean;
    data: any;
    invoice: any;
    countries: any;
    states: any;
    cities: any;
    getInvoiceStatus: string;   
  }
  
const initialState:invoiceInitialState = {
    loading: false,
    data: '',
    invoice: '',
    countries: '',
    states: '',
    cities: '',
    getInvoiceStatus: '',
  };

  export const getInvoiceApi: any = createAsyncThunk(
    "calender/getInvoiceApi",
    async (data:GetCalenderApiData) => {
      try {
        const response: any = await GetInvoiceApi(data);
        return response;
      } catch (error: any) {
        return { status: false, message: error.response.data.message } as PostAPIResponse;
      }
    }
  );

  export const calenderSlice = createSlice({
    name: "calender",
  initialState,
  reducers: {
    RemoveRegionalData(state) {
      return {
        ...state,
      }
    },
    RemoveinvoiceData(state) {
      return {
        ...state,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoiceApi.pending, (state) => {
          return{
            ...state,
            loading: true,
            getInvoiceStatus: 'pending'
          }
      })
      .addCase(getInvoiceApi.fulfilled, (state,action) => {
        if(action.payload.status == false){
            toast.error(action.payload.message)
        } else {
            toast.success(action.payload.message)
        }
        return{
          ...state,
          data: action.payload,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(getInvoiceApi.rejected, (state) => {
        return{
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    },
   });
   export default calenderSlice.reducer;
