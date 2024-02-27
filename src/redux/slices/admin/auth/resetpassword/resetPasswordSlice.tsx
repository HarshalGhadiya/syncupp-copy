'use client';

import { PostResetPassword } from "@/api/admin/signin/signin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast, { Toast } from "react-hot-toast";

type userEmail = {
  email:string;
  password: string;
  confirmPassword?: string;
  token: string;
}

const initialState = {
  data: {},
  loading: false,
  status: false,
  userEmail :{}
};

export const postResetPassword : any = createAsyncThunk(
  "resetpassword/postResetPassword",
  async (data:userEmail) => {

    try {
      const ApiData = {
        email: data.email,
        newPassword: data.password,
        token: data.token
      }
      const response:any = await PostResetPassword(ApiData);
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message };
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postResetPassword.pending, (state) => {
        return{
          ...state,
          loading: true
        }
      })
      .addCase(postResetPassword.fulfilled, (state, action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
          // state.loading = false;
          // state.data = action.payload
        }
        else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          loading: false,
          data: action.payload,
        }
      })
      .addCase(postResetPassword.rejected, (state) => {
        state.loading = false;
      })
  },
});
export const getData = (state: { resetPassword: any; }) => state.resetPassword;
export default resetPasswordSlice.reducer;
