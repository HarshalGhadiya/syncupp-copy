import { PostForgetPassword } from "@/api/admin/signin/signin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast, { Toast } from "react-hot-toast";

type userEmail = {
  email :string,
}

const initialState = {
  data: {},
  loading: false,
  userEmail :{}
};

export const postForgetPassword : any = createAsyncThunk(
  "forgetpassword/postForgetPassword",
  async (data:userEmail) => {
    try {
      const response:any = await PostForgetPassword(data);
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message };
    }
  }
);

export const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(postForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        if(action.payload.success == true){
          toast.success(action.payload.message)
        }
        else {
          toast.error(action.payload.message)
        }
      })
      .addCase(postForgetPassword.rejected, (state) => {
        state.loading = false;
      })
  },
});
// export const getData = (state: { forgetPassword: any; }) => state.forgetPassword;
export default forgetPasswordSlice.reducer;
