import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostChangePassword } from "../../../../../api/admin/signin/signin";
import { toast } from 'react-hot-toast';

type ChangePasswordData = {
  oldPassword: string;
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

export const changePasswordAdmin : any = createAsyncThunk(
    "changePassword/changePasswordAdmin",
    async (data: ChangePasswordData) => {
        try {
            const ApiData = {
              oldPassword: data.oldPassword,
              newPassword: data.newPassword
            }
            const response = await PostChangePassword(ApiData);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as PostChangePasswordResponse;
        }
    }
);

export const adminChangePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordAdmin.fulfilled, (state, action) => {
        if (action.payload.success == true) {
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(changePasswordAdmin.rejected, (state) => {
        return {
          ...state,
          loading: false,
          changePasswordUserStatus: 'error',
        };
      });
  },
});

export default adminChangePasswordSlice.reducer;
