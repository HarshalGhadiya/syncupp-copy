import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserProfileAPI, PostChangePassword, PostSignin, UpdateUserProfileAPI } from "../../../../api/user/auth/authApis";
import { toast } from 'react-hot-toast';

type UserData = {
  email: string;
  password: string;
  rememberMe?: boolean;
}
type GetUserProfileData = {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  is_google_signup: false,
  is_facebook_signup: false,
  remember_me: false,
  is_deleted: false,
  role: string,
  reference_id: {
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    company_name: string
  },
  status: string,
  createdAt: Date,
  updatedAt: Date,
};
type UpdateUserProfileData = {
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

interface PostSigninResponse {
  status: boolean;
  message: string
}

interface SigninState {
  loading: boolean;
  user: any;
  userProfile: any;
  role: string;
  teamMemberRole: string;
  loginUserStatus: string;
  getUserProfileStatus: string;
  updateUserProfileStatus: string;
  loginUserError: string;
  logoutUserStatus: string;
}


const initialState: SigninState = {
  loading: false,
  user: {},
  userProfile: {},
  role: '',
  teamMemberRole: '',
  loginUserStatus: '',
  loginUserError: '',
  logoutUserStatus: '',
  getUserProfileStatus: '',
  updateUserProfileStatus: ''
};

export const signInUser: any = createAsyncThunk(
  "signin/signInUser",
  async (data: UserData, { dispatch }) => {
    try {
      const response: any = await PostSignin(data);
      // await dispatch(getUserProfile())
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSigninResponse;
    }
  }
);
export const getUserProfile: any = createAsyncThunk(
  "signin/getUserProfile",
  async (data: GetUserProfileData) => {
    try {
      const response: any = await GetUserProfileAPI(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSigninResponse;
    }
  }
);
export const updateUserProfile: any = createAsyncThunk(
  "signin/updateUserProfile",
  async (data: UpdateUserProfileData) => {
    try {
      const response: any = await UpdateUserProfileAPI(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSigninResponse;
    }
  }
);

export const signOutUser: any = createAsyncThunk(
  "signin/signOutUser",
  () => {
    localStorage.removeItem("token");
    return true;
  }
);

export const signinSlice: any = createSlice({
  name: "signin",
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        loading: false,
        user: {},
        role: '',
        loginUserStatus: '',
        loginUserError: '',
      };
    },
    setRoleonSingup(state, action) {
      return {
        ...state,
        role: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          loginUserStatus: 'pending'
        }
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          localStorage.setItem("token", action.payload.data.token);
        }
        return {
          ...state,
          user: action?.payload,
          role: action?.payload?.data?.user?.role?.name,
          teamMemberRole: action?.payload?.data?.user?.team_agency_detail?.role?.name,
          loading: false,
          loginUserStatus: 'success'
        }
      })
      .addCase(signInUser.rejected, (state) => {
        return {
          ...state,
          loading: false,
          loginUserStatus: 'error'
        }
      });
    builder.addCase(signOutUser.fulfilled, (state) => {
      return {
        ...state,
        logoutUserStatus: 'success'
      }
    });
    builder
      .addCase(getUserProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
          getUserProfileStatus: 'pending'
        }
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        // if(action.payload.success == true){
        //   toast.success(action.payload.message)
        // } else {
        //   toast.error(action.payload.message)
        // }
        return {
          ...state,
          userProfile: action?.payload?.data,
          loading: false,
          getUserProfileStatus: 'success'
        }
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        if (action?.payload?.success == true) {
          toast.success(action?.payload?.message)
        } else {
          toast.error(action?.payload?.message)
        }
        return {
          ...state,
          loading: false,
          getUserProfileStatus: 'error'
        }
      });
    builder
      .addCase(updateUserProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
          updateUserProfileStatus: 'pending'
        }
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (action.payload.success == true) {
          toast.success(action?.payload?.message)
        } else {
          toast.error(action?.payload?.message)
        }
        return {
          ...state,
          userProfile: action?.payload?.data,
          loading: false,
          updateUserProfileStatus: 'success'
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        if (action.payload.success == true) {
          toast.success(action?.payload?.message)
        } else {
          toast.error(action?.payload?.message)
        }
        return {
          ...state,
          loading: false,
          updateUserProfileStatus: 'error'
        }
      });
  },
});

export const { logoutUser, setRoleonSingup } = signinSlice.actions;
export default signinSlice.reducer;
