import { GetAgencyData, PostAgencyUpdateDataAPI } from "@/api/user/agency/agencyApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

interface PostAPIResponse {
  status : boolean;
  message : string
}
type PostAgencyUpdateData ={
  first_name: string,
  last_name: string,
  contact_number: string,
  address: string,
  city: string,
  company_name: string,
  company_website: string,
  country: string,
  industry: string,
  no_of_people: string,
  pin_code: Number,
  state: string
}
type AgencyData = {
  _id: string,
  first_name:string,
  last_name: string,
  email:string,
  role:string,
  // "reference_id": {
  //   "_id": "659ec7ca29785551a36c8f79",
  //   "createdAt": "2024-01-10T16:37:30.764Z",
  //   "updatedAt": "2024-01-10T16:37:30.764Z",
  //   "__v": 0
  // },
  status?: string,
  createdAt?: Date,
  updatedAt?:Date,
}

interface AgencyInitialState {
  loading: boolean;
  getProfileStatus:string;
  editProfileStatus:string;
  data: any;
}

const initialState:AgencyInitialState = {
  loading: false,
  getProfileStatus:'',
  editProfileStatus:'',
  data: '',
};

export const getAgencyData: any = createAsyncThunk(
  "agency/getAgencyData",
  async () => {
    try {
      const response: any = await GetAgencyData();
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);
export const postAgencyUpdateData: any = createAsyncThunk(
  "agency/postAgencyUpdateData",
  async (data:PostAgencyUpdateData) => {
    try {
      const response: any = await PostAgencyUpdateDataAPI(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgencyData.pending, (state) => {
          return{
            ...state,
            getProfileStatus: 'pending'
          }
      })
      .addCase(getAgencyData.fulfilled, (state,action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return{
          ...state,
          data: action.payload.data,
          getProfileStatus: 'success'
        }
      })
      .addCase(getAgencyData.rejected, (state) => {
        return{
          ...state,
          getProfileStatus: 'error'
        }
      }); 
    builder
      .addCase(postAgencyUpdateData.pending, (state) => {
          return{
            ...state,
            loading: true,
            editProfileStatus: 'pending'
          } 
      })
      .addCase(postAgencyUpdateData.fulfilled, (state,action) => {
        if(action.payload.status == false){
            toast.error(action.payload.message)
        } else {
            toast.success(action.payload.message)
        }
        return{
          ...state,
        //   data: action.payload,
          loading: false,
          editProfileStatus: 'success'
        }
      })
      .addCase(postAgencyUpdateData.rejected, (state) => {
        return{
          ...state,
          loading: false,
          editProfileStatus: 'error'
        }
      }); 
  },
});

// export const { RemoveRegionalData, RemoveClientData } = clientSlice.actions;
export default agencySlice.reducer;
