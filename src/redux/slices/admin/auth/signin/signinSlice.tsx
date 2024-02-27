import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostSignin } from "../../../../../api/admin/signin/signin";
import { toast } from 'react-hot-toast';

type UserData = {
  email: string;
  password: string;
  rememberMe?: string;
}
interface SigninState {
  loading: boolean;
  userData: {},
}
interface PostSigninResponse {
  status: boolean;
  message: string
}

const initialState: SigninState = {
  loading: false,
  userData: {},
};

export const postSignin: any = createAsyncThunk(
  "signin/postSignin",
  async (data: UserData) => {
    try {
      const response: any = await PostSignin(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSigninResponse;
    }
  }
);

export const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    logoutUserAdmin(state, action) {
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        loading: false,
        userData: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSignin.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        } else {
          localStorage.setItem('token', action.payload.data.token);
        }
      })
      .addCase(postSignin.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const getUserData = (state: { signin: { userData: any; }; }) => state.signin.userData;

export const {  logoutUserAdmin } = signinSlice.actions;
export default signinSlice.reducer;