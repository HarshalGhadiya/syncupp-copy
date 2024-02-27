import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostChangePassword } from "../../../../api/user/auth/authApis";
import { toast } from 'react-hot-toast';

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmedPassword?: string;
};

interface PostChangePasswordResponse {
  status : boolean;
  message : string
}

interface ChangePasswordState {
  loading: boolean;
  user: any;
  changePasswordUserStatus: string,
  changePasswordUserError: string;
}

const initialState: ChangePasswordState = {
  loading: false,
  user: {},
  changePasswordUserStatus: '',
  changePasswordUserError: '', 
};

export const changePasswordUser : any = createAsyncThunk(
    "changePassword/changePasswordUser",
    async (data: ChangePasswordData) => {
        try {
            const ApiData = {
              old_password: data.currentPassword,
              new_password: data.newPassword
            }
            const response = await PostChangePassword(ApiData);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as PostChangePasswordResponse;
        }
    }
);

export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordUser.pending, (state) => {
        return{
            ...state,
            loading: true,
            changePasswordUserStatus: 'pending'
        }
      })
      .addCase(changePasswordUser.fulfilled, (state,action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          // user: action.payload,
          loading: false,
          changePasswordUserStatus: 'success'
        }
      })
      .addCase(changePasswordUser.rejected, (state) => {
        return{
          ...state,
          loading: false,
          changePasswordUserStatus: 'error'
        }
      });
  },
});

export default changePasswordSlice.reducer;
