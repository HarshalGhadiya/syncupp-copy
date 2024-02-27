import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostSignup, SignupSubscription } from "../../../../api/user/auth/authApis";
import { toast } from 'react-hot-toast';
import { getUserProfile, setRoleonSingup } from "./signinSlice";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword?: string;
  companyName?: string;
  companyWebsite?: string;
  peopleCount?: string;
  industry?: string;
}

interface PostSignUpResponse {
  status: boolean;
  message: string
}

interface SignUpState {
  loading: boolean;
  subscriptionloader: boolean;
  user: any;
  signUpUserStatus: string;
  signUpUserError: string;
  subscriptionData: any
}


const initialState: SignUpState = {
  loading: false,
  subscriptionloader: false,
  user: {},
  signUpUserStatus: '',
  signUpUserError: '',
  subscriptionData: ""
};

export const signUpUser: any = createAsyncThunk(
  "signup/signUpUser",
  async (data: UserData, { dispatch }) => {
    const apiData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      contact_number: data.contact,
      password: data.password,
      company_name: data.companyName,
      company_website: data.companyWebsite,
      no_of_people: data.peopleCount,
      industry: data.industry,
    }
    try {
      const response: any = await PostSignup(apiData);
      // console.log(response?.data?.user?.role?.name, 'response', response)
      localStorage.setItem("token", response.data?.token);
      await dispatch(setRoleonSingup(response?.data?.user?.role?.name))
      // await dispatch(getUserProfile())
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSignUpResponse;
    }
  }
);


export const signUpUserSubscription: any = createAsyncThunk(
  "signup/signUpUserSubscription",
  async (data: any, { dispatch }) => {
    try {
      const response: any = await SignupSubscription(data);
      // console.log(response, 'response')
      // localStorage.setItem("token", result?.payload?.data?.token);
      // await dispatch(setRoleonSingup())
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSignUpResponse;
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {

    logoutUserSignUp(state) {
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        loading: false,
        user: {},
        signUpUserStatus: '',
        signUpUserError: '',
      };
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          signUpUserStatus: 'pending'
        }
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        if (action.payload.success == true) {
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return {
          ...state,
          user: action.payload,
          loading: false,
          signUpUserStatus: 'success'
        }
      })
      .addCase(signUpUser.rejected, (state) => {
        return {
          ...state,
          loading: false,
          signUpUserStatus: 'error'
        }
      });


    builder
      .addCase(signUpUserSubscription.pending, (state) => {
        return {
          ...state,
          subscriptionloader: true,
        }
      })
      .addCase(signUpUserSubscription.fulfilled, (state, action) => {
        if (action.payload.success == false) {
          toast.error(action.payload.message)
        }
        return {
          ...state,
          subscriptionData: action.payload,
          subscriptionloader: false
        }
      })
      .addCase(signUpUserSubscription.rejected, (state) => {
        return {
          ...state,
          subscriptionloader: false,
        }
      });
  },
});

export const { logoutUserSignUp } = signupSlice.actions;
export default signupSlice.reducer;
