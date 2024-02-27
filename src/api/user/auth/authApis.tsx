import AxiosDefault from "../../../services/AxiosDefault";

type SignUpData = {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  password: string;
  confirmPassword?: string;
  company_name?: string;
  company_website?: string;
  no_of_people?: string;
  industry?: string;
};

type SocialSignUpDataGoogle = {
  signupId: string;
};

type SocialSignUpDataFacebook = {
  access_token: string;
};

type SignInData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type ForgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  email: string;
  password: string;
  token: string;
};

type ChangePasswordData = {
  old_password: string;
  new_password: string;
};
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

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
// };

export const PostSignup = async (data: SignUpData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/signup",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

export const PostSocialSignupGoogle = async (data: SocialSignUpDataGoogle) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/google-signup",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

export const PostSocialSignupFacebook = async (data: SocialSignUpDataFacebook) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/facebook-signup",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

export const PostSignin = async (data: SignInData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/login",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

export const PostForgotPassword = async (data: ForgotPasswordData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/forgot-password",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

export const PostResetPassword = async (data: ResetPasswordData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/reset-password",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

export const PostChangePassword = async (data: ChangePasswordData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/change-password",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
export const GetUserProfileAPI = async (data: GetUserProfileData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/profile",
    method: "GET",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
export const UpdateUserProfileAPI = async (data: UpdateUserProfileData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/update-profile",
    method: "PATCH",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};


export const SignupSubscription = async (data: any) => {
  const response = await AxiosDefault({
    url: "/api/v1/payment/create-subscription",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
