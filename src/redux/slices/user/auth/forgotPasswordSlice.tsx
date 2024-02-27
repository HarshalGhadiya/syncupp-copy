import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {PostForgotPassword} from "../../../../api/user/auth/authApis";
import toast, { Toast } from "react-hot-toast";

type userEmail = {
  email :string,
}
interface PostForgotPasswordResponse {
  status : boolean;
  message : string
}
interface ForgotPasswordState {
  loading: boolean;
  user: any;
  forgotPasswordUserStatus: string,
  forgotPasswordUserError: string;
}

const initialState: ForgotPasswordState = {
  loading: false,
  user: {},
  forgotPasswordUserStatus: '',
  forgotPasswordUserError: '', 
};

export const forgotPasswordUser : any = createAsyncThunk(
  "forgotPassword/forgotPasswordUser",
  async (data: userEmail) => {
    try {
      const response:any = await PostForgotPassword(data);
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message } as PostForgotPasswordResponse;
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordUser.pending, (state) => {
        return{
        ...state,
        loading: true,
        forgotPasswordUserStatus: 'pending'
        }
      })
      .addCase(forgotPasswordUser.fulfilled, (state,action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          // user: action.payload,
          forgotPasswordUserStatus: 'success',
          loading: false,
        }
      })
      .addCase(forgotPasswordUser.rejected, (state) => {
        return{
          ...state,
          loading: false,
          forgotPasswordUserStatus: 'error'
        }
      });
  },
});

export default forgotPasswordSlice.reducer;
