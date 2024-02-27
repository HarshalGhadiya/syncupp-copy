import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { ForgotPasswordApi, LoginApi, ResetPasswordApi, SignupApi } from "@/commonAPIs/affiliateAPIs/authAPIs";

// API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}

interface SigninState {
    loading: boolean;
    userData: {},
}

const initialState: SigninState = {
    loading: false,
    userData: {},
};


// login
type LoginState = {
    email: string,
    password: string
}

export const login: any = createAsyncThunk(
    "auth/login",
    async (data: LoginState) => {
        try {
            const response: any = await LoginApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Signup 

type SignupState = {
    email: string,
    password: string,
    company_name: string,
    name: string
}

export const signup: any = createAsyncThunk(
    "auth/signup",
    async (data: SignupState) => {
        try {
            const response: any = await SignupApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// forgotpassword
type forgotPasswordState = {
    email: string,
}

export const forgotPassword: any = createAsyncThunk(
    "auth/forgotPassword",
    async (data: forgotPasswordState) => {
        try {
            const response: any = await ForgotPasswordApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);

type resetPassowrdState = {
    email: string,
    token: string,
    new_password: string
}


export const resetPassword: any = createAsyncThunk(
    "auth/resetPassword",
    async (data: resetPassowrdState) => {
        try {
            const response: any = await ResetPasswordApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        // login
        builder
            .addCase(login.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action,'action')
                if (action.payload.success == true) {
                    toast.success(action.payload.message);
                    localStorage.setItem('token', action.payload.data.token);
                } else {
                    toast.error(action.payload.message);
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(login.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

       
        // signup

        builder
            .addCase(signup.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(signup.fulfilled, (state, action) => {
                console.log(action, 'action')
                if (action.payload.success == true) {
                    toast.success(action.payload.message);
                    // localStorage.setItem('token', action.payload.data.token);
                } else {
                    toast.error(action.payload.message);
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(signup.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

    

        // forgotPassword
        builder
            .addCase(forgotPassword.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {

                console.log(action, 'action')
                if (action.payload.success == true) {
                    toast.success(action.payload.message);
                    // localStorage.setItem('token', action.payload.data.token);
                } else {
                    toast.error(action.payload.message);
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(forgotPassword.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // resetPassword
        builder
            .addCase(resetPassword.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(resetPassword.fulfilled, (state, action) => {

                console.log(action, 'action')
                if (action.payload.success == true) {
                    toast.success(action.payload.message);
                    // localStorage.setItem('token', action.payload.data.token);
                } else {
                    toast.error(action.payload.message);
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(resetPassword.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    },
});


// export const { logoutUserAdmin } = authSlice.actions;
export default authSlice.reducer;