import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostResetPassword } from "../../../../api/user/auth/authApis";
import { toast } from 'react-hot-toast';

type ResetPasswordData = {
    email: string;
    password: string;
    confirmPassword?: string;
    token: string;
};

interface PostResetPasswordResponse {
  status : boolean;
  message : string
}

interface ResetPasswordState {
  loading: boolean;
  user: any;
  resetPasswordUserStatus: string,
  resetPasswordUserError: string;
}

const initialState: ResetPasswordState = {
  loading: false,
  user: {},
  resetPasswordUserStatus: '',
  resetPasswordUserError: '', 
};

export const resetPasswordUser : any = createAsyncThunk(
    "resetPassword/resetPasswordUser",
    async (data: ResetPasswordData) => {
        try {
            const ApiData = {
              email: data.email,
              password: data.password,
              token: data.token,
            }
            const response = await PostResetPassword(ApiData);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as PostResetPasswordResponse;
        }
    }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordUser.pending, (state) => {
        return{
        ...state,
        loading: true,
        resetPasswordUserStatus: 'pending'
        }
      })
      .addCase(resetPasswordUser.fulfilled, (state,action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          loading: false,
          // user: action.payload,
          resetPasswordUserStatus: 'success'
        }
      })
      .addCase(resetPasswordUser.rejected, (state) => {
        return{
          ...state,
          loading: false,
          resetPasswordUserStatus: 'error'
        }
      });
  },
});

export default resetPasswordSlice.reducer;
